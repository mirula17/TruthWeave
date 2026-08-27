import uuid
from datetime import datetime, timezone
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Request
from sqlalchemy.orm import Session

from app.api import deps
from app.db.session import get_db
from app.models.user import User
from app.models.document import Document
from app.models.audit import AuditLog
from app.schemas.document import DocumentResponse

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

@router.get("", response_model=List[DocumentResponse])
@router.get("/", response_model=List[DocumentResponse])
def get_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    docs = db.query(Document).filter(Document.user_id == current_user.id).order_by(Document.uploaded_at.desc()).all()
    return [
        DocumentResponse(
            id=str(d.id),
            name=d.name,
            type=d.type,
            size=d.size,
            size_formatted=d.size_formatted,
            mime_type=d.mime_type,
            category=d.category,
            status=d.status,
            preview_url=d.preview_url,
            verification_id=str(d.verification_id) if d.verification_id else None,
            uploaded_at=d.uploaded_at
        )
        for d in docs
    ]

@router.get("/{document_id}", response_model=DocumentResponse)
def get_document_by_id(
    document_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    try:
        doc_uuid = uuid.UUID(document_id)
    except ValueError:
        raise HTTPException(status_code=404, detail="Invalid document ID format")
    
    query = db.query(Document).filter(Document.id == doc_uuid)
    if current_user.role != "ADMIN":
        query = query.filter(Document.user_id == current_user.id)
    
    d = query.first()
    if not d:
        raise HTTPException(status_code=404, detail="Document not found")
    
    return DocumentResponse(
        id=str(d.id),
        name=d.name,
        type=d.type,
        size=d.size,
        size_formatted=d.size_formatted,
        mime_type=d.mime_type,
        category=d.category,
        status=d.status,
        preview_url=d.preview_url,
        verification_id=str(d.verification_id) if d.verification_id else None,
        uploaded_at=d.uploaded_at
    )

@router.post("/upload", response_model=DocumentResponse)
async def upload_document(
    request: Request,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    file_bytes = await file.read()
    size = len(file_bytes)
    size_formatted = f"{(size / (1024 * 1024)):.2f} MB" if size >= 1024 * 1024 else f"{(size / 1024):.1f} KB"
    
    filename = file.filename or "uploaded_file"
    file_ext = filename.split(".")[-1].upper() if "." in filename else "FILE"
    mime = file.content_type or "application/octet-stream"
    
    if mime.startswith("image/"):
        category = "image"
    elif mime.startswith("video/"):
        category = "video"
    elif mime.startswith("audio/"):
        category = "audio"
    else:
        category = "document"
    
    doc = Document(
        user_id=current_user.id,
        name=filename,
        type=file_ext,
        size=size,
        size_formatted=size_formatted,
        mime_type=mime,
        category=category,
        status="verified"
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)
    
    client_ip = request.client.host if request.client else None
    log_audit_event(db, current_user.id, "DOCUMENT_UPLOAD", ip=client_ip, details=f"Uploaded document {doc.name} ({doc.size_formatted})")
    
    return DocumentResponse(
        id=str(doc.id),
        name=doc.name,
        type=doc.type,
        size=doc.size,
        size_formatted=doc.size_formatted,
        mime_type=doc.mime_type,
        category=doc.category,
        status=doc.status,
        preview_url=doc.preview_url,
        verification_id=None,
        uploaded_at=doc.uploaded_at
    )

@router.delete("/{document_id}")
def delete_document(
    document_id: str,
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    try:
        doc_uuid = uuid.UUID(document_id)
    except ValueError:
        raise HTTPException(status_code=404, detail="Invalid document ID")
    
    doc = db.query(Document).filter(Document.id == doc_uuid, Document.user_id == current_user.id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    db.delete(doc)
    db.commit()
    
    client_ip = request.client.host if request.client else None
    log_audit_event(db, current_user.id, "DOCUMENT_DELETED", ip=client_ip, details=f"Deleted document {document_id}")
    return {"status": "success", "message": "Document deleted"}
