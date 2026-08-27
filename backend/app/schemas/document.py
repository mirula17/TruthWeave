from pydantic import BaseModel, Field
from datetime import datetime
from uuid import UUID
from typing import Optional

class DocumentResponse(BaseModel):
    id: str
    name: str
    type: str
    size: int
    sizeFormatted: str = Field(..., alias="size_formatted")
    mimeType: str = Field(..., alias="mime_type")
    category: str
    status: str
    previewUrl: Optional[str] = Field(None, alias="preview_url")
    verificationId: Optional[str] = Field(None, alias="verification_id")
    uploadedAt: datetime = Field(..., alias="uploaded_at")

    class Config:
        from_attributes = True
        populate_by_name = True
