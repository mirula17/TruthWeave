from pydantic import BaseModel, Field
from datetime import datetime
from uuid import UUID
from typing import List, Optional, Any, Dict

class EvidenceItem(BaseModel):
    id: str
    title: str
    description: str
    source: str
    sourceUrl: str
    sourceDomain: str
    reliability: str # 'HIGH' | 'MEDIUM' | 'LOW'
    stance: str # 'SUPPORTS' | 'CONTRADICTS' | 'NEUTRAL'
    date: str

class SourceItem(BaseModel):
    id: str
    name: str
    domain: str
    title: str
    url: str
    publishedAt: str
    credibilityScore: int # 0-100
    factCheckRating: Optional[str] = None

class TimelineStep(BaseModel):
    id: str
    stage: str
    title: str
    description: str
    timestamp: str
    status: str # 'completed' | 'processing' | 'pending'

class VerificationCreate(BaseModel):
    claim: str
    contentType: Optional[str] = Field(default="claim", alias="content_type")
    sourceUrl: Optional[str] = Field(default=None, alias="source_url")
    context: Optional[str] = None
    language: Optional[str] = "English (US)"

    class Config:
        populate_by_name = True

class VerifyClaimPayload(BaseModel):
    claim: str
    sourceUrl: Optional[str] = None
    context: Optional[str] = None
    language: Optional[str] = "English (US)"

class VerifyUrlPayload(BaseModel):
    url: str
    context: Optional[str] = None

class VerificationResponse(BaseModel):
    id: str
    claim: str
    contentType: str = Field(..., alias="content_type")
    status: str
    verdict: str
    confidence: int
    explanation: Optional[str] = ""
    summary: Optional[str] = ""
    evidence: List[Dict[str, Any]] = Field(default_factory=list)
    sources: List[Dict[str, Any]] = Field(default_factory=list)
    timeline: List[Dict[str, Any]] = Field(default_factory=list)
    createdAt: datetime = Field(..., alias="created_at")
    userId: Optional[str] = Field(None, alias="user_id")
    sourceUrl: Optional[str] = Field(None, alias="source_url")
    context: Optional[str] = None
    language: Optional[str] = None
    fileName: Optional[str] = Field(None, alias="file_name")
    fileSize: Optional[str] = Field(None, alias="file_size")
    fileType: Optional[str] = Field(None, alias="file_type")
    mediaPreviewUrl: Optional[str] = Field(None, alias="media_preview_url")
    tags: List[str] = Field(default_factory=list)

    class Config:
        from_attributes = True
        populate_by_name = True
