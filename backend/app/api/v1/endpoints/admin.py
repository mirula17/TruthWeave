from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

from app.api import deps
from app.db.session import get_db
from app.models.audit import AuditLog
from app.models.user import User

router = APIRouter()

class AuditLogResponse(BaseModel):
    id: UUID
    user_id: UUID | None = None
    action: str
    ip_address: str | None = None
    details: str | None = None
    timestamp: datetime

    class Config:
        from_attributes = True

@router.get("/audit-logs", response_model=List[AuditLogResponse])
def get_audit_logs(
    db: Session = Depends(get_db),
    current_admin: User = Depends(deps.get_current_admin),
    limit: int = 100,
    skip: int = 0
) -> Any:
    logs = db.query(AuditLog).order_by(AuditLog.timestamp.desc()).offset(skip).limit(limit).all()
    return logs
