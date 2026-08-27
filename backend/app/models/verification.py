import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from app.db.session import Base

class Verification(Base):
    __tablename__ = "verifications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    claim = Column(Text, nullable=False)
    content_type = Column(String, default="claim", nullable=False) # 'claim' | 'url' | 'image' | 'video' | 'document'
    status = Column(String, default="PENDING", nullable=False) # 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
    verdict = Column(String, default="UNVERIFIED", nullable=False) # 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED'
    confidence = Column(Integer, default=0, nullable=False) # 0-100
    explanation = Column(Text, nullable=True)
    summary = Column(Text, nullable=True)
    source_url = Column(String, nullable=True)
    context = Column(Text, nullable=True)
    language = Column(String, nullable=True)
    file_name = Column(String, nullable=True)
    file_size = Column(String, nullable=True)
    file_type = Column(String, nullable=True)
    media_preview_url = Column(String, nullable=True)
    evidence = Column(JSON, default=list, nullable=False)
    sources = Column(JSON, default=list, nullable=False)
    timeline = Column(JSON, default=list, nullable=False)
    tags = Column(JSON, default=list, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
