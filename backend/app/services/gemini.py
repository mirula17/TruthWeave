import io
import json
import re
from typing import Any, Dict, List, Optional
from PIL import Image
import google.generativeai as genai

try:
    from ddgs import DDGS
except ImportError:
    try:
        from duckduckgo_search import DDGS
    except ImportError:
        DDGS = None

from app.core.config import settings

# Configure Gemini
if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)

SYSTEM_INSTRUCTION_TEXT = """
You are TruthWeave's Neural Fact-Checking Core. Your task is to evaluate the truthfulness of the given claim.
You must output your evaluation strictly as a valid JSON object. Do not wrap the JSON object in markdown code block markers (like ```json ... ```).
You must output a JSON object matching this structure:
{
  "verdict": "TRUE" | "FALSE" | "MISLEADING" | "UNVERIFIED",
  "confidence": 0-100,
  "explanation": "Detailed explanation of why this verdict was reached. Clearly mention if this is based on retrieved search context or general knowledge, and explicitly state that AI-generated verification is an assessment that should be checked against source evidence.",
  "summary": "Short 1-2 sentence summary of the verification result.",
  "evidence": [
    {
      "title": "Short title of the corroborating/contradicting fact",
      "description": "Brief description of the evidence fact",
      "source": "Name of the source organization/publisher",
      "sourceUrl": "URL to the source reference if available, otherwise empty string",
      "sourceDomain": "Domain name of the source (e.g. reuters.com), otherwise empty string",
      "reliability": "HIGH" | "MEDIUM" | "LOW",
      "stance": "SUPPORTS" | "CONTRADICTS" | "NEUTRAL",
      "date": "Approximate date of the source (YYYY-MM-DD)"
    }
  ],
  "sources": [
    {
      "name": "Source publisher name",
      "domain": "Domain name (e.g. bbc.com)",
      "title": "Title of the article or publication",
      "url": "URL to the article",
      "publishedAt": "Publication date (YYYY-MM-DD or empty string)",
      "credibilityScore": 0-100,
      "factCheckRating": "e.g. True / False / Misleading / None"
    }
  ],
  "tags": ["Tag1", "Tag2"]
}
"""

SYSTEM_INSTRUCTION_IMAGE = """
You are TruthWeave's Forensic Vision Core. Your task is to inspect the uploaded image for AI generation artifacts, digital tampering, OCR text extraction, and metadata inconsistencies.
You must output your evaluation strictly as a valid JSON object matching this structure:
{
  "verdict": "TRUE" | "FALSE" | "MISLEADING" | "UNVERIFIED",
  "confidence": 0-100,
  "explanation": "Detailed forensic explanation. Address: 1) AI generation indicators, 2) Manipulation signatures, 3) OCR extracted text and context, 4) Authenticity verdict. Clearly state that AI image analysis is an assessment and not a definitive proof.",
  "summary": "Short 1-2 sentence summary of the forensic vision result.",
  "evidence": [],
  "sources": [],
  "tags": ["Forensic Check", "Image Analysis"]
}
"""

def search_web(query: str, max_results: int = 3) -> List[Dict[str, Any]]:
    """Query DuckDuckGo for live context."""
    if not DDGS:
        return []
    try:
        with DDGS() as ddgs:
            results = list(ddgs.text(query, max_results=max_results))
            return [{
                "title": r.get("title", ""),
                "snippet": r.get("body", ""),
                "url": r.get("href", "")
            } for r in results]
    except Exception as e:
        print(f"DuckDuckGo search error: {e}")
        return []

def clean_json_response(raw_text: str) -> str:
    """Strip markdown backticks or extra wrapper characters to expose pure JSON."""
    raw_text = raw_text.strip()
    match = re.search(r"({.*})", raw_text, re.DOTALL)
    if match:
        return match.group(1)
    return raw_text

def get_offline_text_fallback(claim: str, message: str) -> Dict[str, Any]:
    """Provide a graceful offline fallback for claim verification."""
    return {
        "verdict": "UNVERIFIED",
        "confidence": 0,
        "explanation": f"The verification pipeline is running in offline mode. {message}. Please verify the source evidence manually. Statement entered: '{claim}'",
        "summary": "Verification engine is offline/unavailable.",
        "evidence": [
            {
                "id": "ev-fallback",
                "title": "Offline Status Alert",
                "description": "TruthWeave neural fact-checking requires an active GEMINI_API_KEY in the backend configuration.",
                "source": "TruthWeave System",
                "sourceUrl": "",
                "sourceDomain": "",
                "reliability": "LOW",
                "stance": "NEUTRAL",
                "date": ""
            }
        ],
        "sources": [],
        "tags": ["Offline Mode", "Verification Pending"]
    }

def get_offline_image_fallback(message: str) -> Dict[str, Any]:
    """Provide a graceful offline fallback for image verification."""
    return {
        "verdict": "UNVERIFIED",
        "confidence": 0,
        "explanation": f"The image forensic pipeline is running in offline mode. {message}. AI-based digital forensics is temporarily disabled.",
        "summary": "Forensic vision engine is offline/unavailable.",
        "evidence": [],
        "sources": [],
        "tags": ["Offline Image Mode"]
    }

class GeminiService:
    @staticmethod
    def verify_claim(claim: str, context: Optional[str] = None, language: str = "English (US)") -> Dict[str, Any]:
        if not settings.GEMINI_API_KEY:
            return get_offline_text_fallback(claim, "Gemini API Key missing")

        # 1. Fetch live web snippets using DuckDuckGo
        search_results = search_web(claim, max_results=3)
        search_context = ""
        if search_results:
            search_context = "\n\nRetrieved Web Search Context (DuckDuckGo):\n"
            for idx, r in enumerate(search_results):
                search_context += f"Source [{idx+1}]: {r['title']}\nSnippet: {r['snippet']}\nURL: {r['url']}\n\n"

        # 2. Formulate prompt
        prompt = f"Claim statement: {claim}\n"
        if context:
            prompt += f"Context of Claim: {context}\n"
        prompt += f"Language for Explanation: {language}\n"
        if search_context:
            prompt += search_context
        
        prompt += "\nEvaluate this claim and return the structured JSON result."

        try:
            # Generate content using configured model (default: gemini-2.5-flash / gemini-3.7-flash)
            candidate_models = [settings.GEMINI_MODEL, "gemini-2.5-flash", "gemini-3.7-flash", "gemini-2.5-flash-lite"]
            # Deduplicate while preserving order
            models_to_try = list(dict.fromkeys(candidate_models))
            
            response = None
            last_err = None
            for model_name in models_to_try:
                try:
                    model = genai.GenerativeModel(
                        model_name=model_name,
                        system_instruction=SYSTEM_INSTRUCTION_TEXT,
                        generation_config={"response_mime_type": "application/json"}
                    )
                    response = model.generate_content(prompt)
                    if response and response.text:
                        break
                except Exception as model_err:
                    last_err = model_err
                    continue
            
            if not response or not response.text:
                raise last_err or Exception("All candidate Gemini models failed to respond")

            cleaned = clean_json_response(response.text)
            parsed = json.loads(cleaned)
            
            # Map elements or normalize
            if "verdict" not in parsed:
                parsed["verdict"] = "UNVERIFIED"
            if "confidence" not in parsed:
                parsed["confidence"] = 50
            if "evidence" not in parsed:
                parsed["evidence"] = []
            if "sources" not in parsed:
                parsed["sources"] = []
            
            # If search results are present, ensure we add them to sources if they aren't already there
            if search_results and not parsed.get("sources"):
                for idx, r in enumerate(search_results):
                    parsed["sources"].append({
                        "id": f"src-{idx}",
                        "name": r["title"][:30],
                        "domain": r["url"].split("/")[2] if "//" in r["url"] else "",
                        "title": r["title"],
                        "url": r["url"],
                        "publishedAt": "",
                        "credibilityScore": 75,
                        "factCheckRating": None
                    })

            return parsed
        except Exception as e:
            print(f"Gemini API Exception during claim verification: {e}")
            return get_offline_text_fallback(claim, f"API Exception: {str(e)}")

    @staticmethod
    def verify_image(file_bytes: bytes, mime_type: str) -> Dict[str, Any]:
        if not settings.GEMINI_API_KEY:
            return get_offline_image_fallback("Gemini API Key missing")

        try:
            image = Image.open(io.BytesIO(file_bytes))
            prompt = "Perform complete digital forensics verification on this image. Return structured JSON."
            
            candidate_models = [settings.GEMINI_MODEL, "gemini-2.5-flash", "gemini-3.7-flash", "gemini-2.5-flash-lite"]
            models_to_try = list(dict.fromkeys(candidate_models))
            
            response = None
            last_err = None
            for model_name in models_to_try:
                try:
                    model = genai.GenerativeModel(
                        model_name=model_name,
                        system_instruction=SYSTEM_INSTRUCTION_IMAGE,
                        generation_config={"response_mime_type": "application/json"}
                    )
                    response = model.generate_content([prompt, image])
                    if response and response.text:
                        break
                except Exception as model_err:
                    last_err = model_err
                    continue
            
            if not response or not response.text:
                raise last_err or Exception("All candidate Gemini models failed to respond")

            cleaned = clean_json_response(response.text)
            parsed = json.loads(cleaned)
            
            if "verdict" not in parsed:
                parsed["verdict"] = "UNVERIFIED"
            if "confidence" not in parsed:
                parsed["confidence"] = 50
            
            return parsed
        except Exception as e:
            print(f"Gemini API Exception during image forensics: {e}")
            return get_offline_image_fallback(f"API Exception: {str(e)}")
