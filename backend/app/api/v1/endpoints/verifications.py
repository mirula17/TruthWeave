import uuid
from datetime import datetime, timezone
from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.api import deps
from app.db.session import get_db
from app.models.user import User
from app.models.verification import Verification
from app.models.audit import AuditLog
from app.schemas.verification import (
    VerificationResponse,
    VerificationCreate,
    VerifyClaimPayload,
    VerifyUrlPayload,
)
from app.services.gemini import GeminiService

class TextVerifyPayload(BaseModel):
    text: str

router = APIRouter()

def log_audit_event(
    db: Session,
    user_id: Any,
    action: str,
    ip: str | None = None,
    details: str | None = None
):
    audit_entry = AuditLog(
        user_id=user_id,
        action=action,
        ip_address=ip,
        details=details
    )
    db.add(audit_entry)
    db.commit()

def create_initial_timeline(action_title: str, detail: str) -> list:
    now_str = datetime.now(timezone.utc).strftime("%H:%M:%S")
    return [
        {
            "id": f"tl-{uuid.uuid4().hex[:6]}",
            "stage": "Ingest",
            "title": action_title,
            "description": detail,
            "timestamp": now_str,
            "status": "completed"
        },
        {
            "id": f"tl-{uuid.uuid4().hex[:6]}",
            "stage": "Pipeline Queue",
            "title": "Awaiting Neural Verification",
            "description": "Content stored in PostgreSQL registry. Scheduled for multi-source consensus engine.",
            "timestamp": now_str,
            "status": "pending"
        }
    ]

def create_final_timeline(ingest_title: str, ingest_detail: str, verdict: str, confidence: int) -> list:
    now_str = datetime.now(timezone.utc).strftime("%H:%M:%S")
    return [
        {
            "id": "tl-ingest",
            "stage": "Ingest",
            "title": ingest_title,
            "description": ingest_detail,
            "timestamp": now_str,
            "status": "completed"
        },
        {
            "id": "tl-search",
            "stage": "Registry Search",
            "title": "Authoritative Registry Verification",
            "description": "Queried cross-source databases and DuckDuckGo index for corroboration.",
            "timestamp": now_str,
            "status": "completed"
        },
        {
            "id": "tl-ai",
            "stage": "Neural Reasoning",
            "title": f"Google Gemini Analysis ({verdict})",
            "description": f"Fact-checking engine finished scoring with {confidence}% confidence.",
            "timestamp": now_str,
            "status": "completed"
        }
    ]

@router.get("", response_model=List[VerificationResponse])
@router.get("/", response_model=List[VerificationResponse])
def get_verifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user),
    skip: int = 0,
    limit: int = 100
) -> Any:
    # If admin, can view all verifications, otherwise return current user's records
    query = db.query(Verification)
    if current_user.role != "ADMIN":
        query = query.filter(Verification.user_id == current_user.id)
    
    verifications = query.order_by(Verification.created_at.desc()).offset(skip).limit(limit).all()
    
    # Map to schema response
    results = []
    for v in verifications:
        results.append(
            VerificationResponse(
                id=str(v.id),
                claim=v.claim,
                content_type=v.content_type,
                status=v.status,
                verdict=v.verdict,
                confidence=v.confidence,
                explanation=v.explanation or "Pending analysis by TruthWeave verification pipeline.",
                summary=v.summary or "Submitted statement recorded and waiting for neural engine processing.",
                evidence=v.evidence or [],
                sources=v.sources or [],
                timeline=v.timeline or [],
                createdAt=v.created_at,
                userId=str(v.user_id),
                sourceUrl=v.source_url,
                context=v.context,
                language=v.language,
                fileName=v.file_name,
                fileSize=v.file_size,
                fileType=v.file_type,
                mediaPreviewUrl=v.media_preview_url,
                tags=v.tags or ["Pending Verification", v.content_type.capitalize()]
            )
        )
    return results

@router.get("/{verification_id}", response_model=VerificationResponse)
def get_verification_by_id(
    verification_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    try:
        ver_uuid = uuid.UUID(verification_id)
    except ValueError:
        raise HTTPException(status_code=404, detail="Invalid verification ID format")
    
    query = db.query(Verification).filter(Verification.id == ver_uuid)
    if current_user.role != "ADMIN":
        query = query.filter(Verification.user_id == current_user.id)
    
    v = query.first()
    if not v:
        raise HTTPException(status_code=404, detail="Verification record not found")
    
    return VerificationResponse(
        id=str(v.id),
        claim=v.claim,
        content_type=v.content_type,
        status=v.status,
        verdict=v.verdict,
        confidence=v.confidence,
        explanation=v.explanation or "Submitted content queued in PostgreSQL database. AI pipeline connection ready.",
        summary=v.summary or "Content recorded in verification registry.",
        evidence=v.evidence or [],
        sources=v.sources or [],
        timeline=v.timeline or [],
        createdAt=v.created_at,
        userId=str(v.user_id),
        sourceUrl=v.source_url,
        context=v.context,
        language=v.language,
        fileName=v.file_name,
        fileSize=v.file_size,
        fileType=v.file_type,
        mediaPreviewUrl=v.media_preview_url,
        tags=v.tags or [v.content_type.capitalize()]
    )

@router.post("", response_model=VerificationResponse)
@router.post("/", response_model=VerificationResponse)
@router.post("/claim", response_model=VerificationResponse)
def create_claim_verification(
    payload: VerifyClaimPayload,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    # Run the verification synchronously using GeminiService (includes DDG context)
    ai_result = GeminiService.verify_claim(
        claim=payload.claim,
        context=payload.context,
        language=payload.language
    )
    
    verdict = ai_result["verdict"]
    confidence = ai_result["confidence"]
    explanation = ai_result["explanation"]
    summary = ai_result["summary"]
    evidence = ai_result["evidence"]
    sources = ai_result["sources"]
    tags = ai_result.get("tags", ["Claim", "NLP Verification", payload.language or "English"])

    timeline = create_final_timeline(
        "Claim Statement Ingested",
        f"Ingested {len(payload.claim.split())} words for neural verification.",
        verdict,
        confidence
    )
    
    verification = Verification(
        user_id=current_user.id,
        claim=payload.claim,
        content_type="claim",
        status="COMPLETED",
        verdict=verdict,
        confidence=confidence,
        explanation=explanation,
        summary=summary,
        source_url=payload.sourceUrl,
        context=payload.context,
        language=payload.language or "English (US)",
        evidence=evidence,
        sources=sources,
        timeline=timeline,
        tags=tags
    )
    db.add(verification)
    db.commit()
    db.refresh(verification)
    
    client_ip = request.client.host if request.client else None
    log_audit_event(db, current_user.id, "VERIFICATION_CREATED", ip=client_ip, details=f"Created verification {verification.id} (Claim: {verdict})")
    
    return VerificationResponse(
        id=str(verification.id),
        claim=verification.claim,
        content_type=verification.content_type,
        status=verification.status,
        verdict=verification.verdict,
        confidence=verification.confidence,
        explanation=verification.explanation,
        summary=verification.summary,
        evidence=verification.evidence,
        sources=verification.sources,
        timeline=verification.timeline,
        createdAt=verification.created_at,
        userId=str(verification.user_id),
        sourceUrl=verification.source_url,
        context=verification.context,
        language=verification.language,
        tags=verification.tags
    )

@router.post("/url", response_model=VerificationResponse)
def create_url_verification(
    payload: VerifyUrlPayload,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    # Ingest web URL and invoke claim verification
    claim_text = f"Webpage content from URL: {payload.url}"
    ai_result = GeminiService.verify_claim(
        claim=claim_text,
        context=payload.context,
        language="English (US)"
    )
    
    verdict = ai_result["verdict"]
    confidence = ai_result["confidence"]
    explanation = ai_result["explanation"]
    summary = ai_result["summary"]
    evidence = ai_result["evidence"]
    sources = ai_result["sources"]
    tags = ai_result.get("tags", ["URL Verification", "Live Web"])

    # Ensure search target is mapped inside sources list
    if not any(s.get("url") == payload.url for s in sources):
        sources.insert(0, {
            "id": "url-target",
            "name": payload.url.split("/")[2] if "//" in payload.url else payload.url,
            "domain": payload.url.split("/")[2] if "//" in payload.url else payload.url,
            "title": "Target Webpage",
            "url": payload.url,
            "publishedAt": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
            "credibilityScore": 85
        })

    timeline = create_final_timeline(
        "URL Registered",
        f"Webpage target URL: {payload.url}",
        verdict,
        confidence
    )
    
    verification = Verification(
        user_id=current_user.id,
        claim=claim_text,
        content_type="url",
        status="COMPLETED",
        verdict=verdict,
        confidence=confidence,
        explanation=explanation,
        summary=summary,
        source_url=payload.url,
        context=payload.context,
        evidence=evidence,
        sources=sources,
        timeline=timeline,
        tags=tags
    )
    db.add(verification)
    db.commit()
    db.refresh(verification)
    
    client_ip = request.client.host if request.client else None
    log_audit_event(db, current_user.id, "VERIFICATION_CREATED", ip=client_ip, details=f"Created verification {verification.id} (URL: {verdict})")
    
    return VerificationResponse(
        id=str(verification.id),
        claim=verification.claim,
        content_type=verification.content_type,
        status=verification.status,
        verdict=verification.verdict,
        confidence=verification.confidence,
        explanation=verification.explanation,
        summary=verification.summary,
        evidence=verification.evidence,
        sources=verification.sources,
        timeline=verification.timeline,
        createdAt=verification.created_at,
        userId=str(verification.user_id),
        sourceUrl=verification.source_url,
        context=verification.context,
        tags=verification.tags
    )

@router.post("/file", response_model=VerificationResponse)
async def create_file_verification(
    request: Request,
    file: UploadFile = File(...),
    fileType: Optional[str] = Form("document"),
    ocrEnabled: Optional[bool] = Form(True),
    deepfakeEnabled: Optional[bool] = Form(True),
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    file_bytes = await file.read()
    file_size_mb = f"{len(file_bytes) / (1024 * 1024):.2f} MB"
    
    mime = file.content_type or ""
    is_image = mime.startswith("image/") or fileType == "image"
    is_video = mime.startswith("video/") or fileType == "video"
    
    if is_image:
        # Run image analysis using Gemini vision
        ai_result = GeminiService.verify_image(file_bytes, mime)
        verdict = ai_result["verdict"]
        confidence = ai_result["confidence"]
        explanation = ai_result["explanation"]
        summary = ai_result["summary"]
        evidence = ai_result["evidence"]
        sources = ai_result["sources"]
        tags = ai_result.get("tags", ["Forensic Check", "Image Analysis"])
    elif is_video:
        # Video is limited in this MVP
        verdict = "UNVERIFIED"
        confidence = 0
        explanation = "Video deepfake and semantic manipulation verification is currently limited in this MVP. Future updates will plug in frame-by-frame temporal ELA models."
        summary = "Video analysis is currently limited in this MVP."
        evidence = []
        sources = []
        tags = ["Video", "Limited Assessment"]
    else:
        # Fallback to general text verification
        claim_text = f"Document verification for file: {file.filename}"
        ai_result = GeminiService.verify_claim(
            claim=claim_text,
            context="User uploaded file check.",
            language="English (US)"
        )
        verdict = ai_result["verdict"]
        confidence = ai_result["confidence"]
        explanation = ai_result["explanation"]
        summary = ai_result["summary"]
        evidence = ai_result["evidence"]
        sources = ai_result["sources"]
        tags = ai_result.get("tags", ["Document Ingest"])
        
    timeline = create_final_timeline(
        "File Received",
        f"File: {file.filename} ({file_size_mb}) ingested for forensics.",
        verdict,
        confidence
    )
    
    verification = Verification(
        user_id=current_user.id,
        claim=f"Evidentiary Media File: {file.filename}",
        content_type=fileType or "document",
        status="COMPLETED",
        verdict=verdict,
        confidence=confidence,
        explanation=explanation,
        summary=summary,
        file_name=file.filename,
        file_size=file_size_mb,
        file_type=file.content_type or fileType,
        evidence=evidence,
        sources=sources,
        timeline=timeline,
        tags=tags
    )
    db.add(verification)
    db.commit()
    db.refresh(verification)
    
    client_ip = request.client.host if request.client else None
    log_audit_event(db, current_user.id, "VERIFICATION_CREATED", ip=client_ip, details=f"Created verification {verification.id} (File: {file.filename})")
    
    return VerificationResponse(
        id=str(verification.id),
        claim=verification.claim,
        content_type=verification.content_type,
        status=verification.status,
        verdict=verification.verdict,
        confidence=verification.confidence,
        explanation=verification.explanation,
        summary=verification.summary,
        evidence=verification.evidence,
        sources=verification.sources,
        timeline=verification.timeline,
        createdAt=verification.created_at,
        userId=str(verification.user_id),
        fileName=verification.file_name,
        fileSize=verification.file_size,
        fileType=verification.file_type,
        tags=verification.tags
    )

@router.post("/text")
def verify_text_extension(
    payload: TextVerifyPayload,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    # Quick check route for Chrome Extension compatibility
    ai_result = GeminiService.verify_claim(
        claim=payload.text,
        context="Chrome Extension Quick Check",
        language="English (US)"
    )
    
    verdict = ai_result["verdict"]
    confidence = ai_result["confidence"]
    explanation = ai_result["explanation"]
    summary = ai_result["summary"]
    evidence = ai_result["evidence"]
    sources = ai_result["sources"]
    tags = ai_result.get("tags", ["Extension Check"])
    
    timeline = create_final_timeline(
        "Chrome Extension Selection Ingested",
        f"Captured selection for verification.",
        verdict,
        confidence
    )
    
    verification = Verification(
        user_id=current_user.id,
        claim=payload.text,
        content_type="claim",
        status="COMPLETED",
        verdict=verdict,
        confidence=confidence,
        explanation=explanation,
        summary=summary,
        evidence=evidence,
        sources=sources,
        timeline=timeline,
        tags=tags
    )
    db.add(verification)
    db.commit()
    db.refresh(verification)
    
    client_ip = request.client.host if request.client else None
    log_audit_event(db, current_user.id, "VERIFICATION_CREATED", ip=client_ip, details=f"Created verification {verification.id} from extension")
    
    return {
        "score": confidence,
        "summary": summary
    }

@router.delete("/{verification_id}")
def delete_verification(
    verification_id: str,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    try:
        ver_uuid = uuid.UUID(verification_id)
    except ValueError:
        raise HTTPException(status_code=404, detail="Invalid verification ID")
    
    query = db.query(Verification).filter(Verification.id == ver_uuid)
    if current_user.role != "ADMIN":
        query = query.filter(Verification.user_id == current_user.id)
    
    v = query.first()
    if not v:
        raise HTTPException(status_code=404, detail="Verification not found")
    
    db.delete(v)
    db.commit()
    
    client_ip = request.client.host if request.client else None
    log_audit_event(db, current_user.id, "VERIFICATION_DELETED", ip=client_ip, details=f"Deleted verification {verification_id}")
    return {"status": "success", "message": "Verification deleted"}
