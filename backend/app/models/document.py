import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from app.db.session import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    size = Column(Integer, nullable=False)
    size_formatted = Column(String, nullable=False)
    mime_type = Column(String, nullable=False)
    category = Column(String, default="document", nullable=False) # 'document' | 'image' | 'video' | 'audio'
    status = Column(String, default="pending", nullable=False) # 'verified' | 'analyzing' | 'pending' | 'failed'
    verification_id = Column(UUID(as_uuid=True), nullable=True)
    preview_url = Column(String, nullable=True)
    uploaded_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=False)
