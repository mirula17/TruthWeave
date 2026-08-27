from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core import security
from app.core.config import settings
from app.api import deps
from app.db.session import get_db
from app.models.user import User
from app.models.audit import AuditLog
from app.models.verification import Verification
from app.schemas.user import UserCreate, UserResponse
from app.schemas.token import Token

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

@router.post("/signup", response_model=UserResponse)
@router.post("/register", response_model=UserResponse)
def signup(
    *,
    db: Session = Depends(get_db),
    user_in: UserCreate,
    request: Request
) -> Any:
    # Check if user already exists
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    
    # Check if database is empty to bootstrap first user as ADMIN
    is_first_user = db.query(User).count() == 0
    role = "ADMIN" if is_first_user else "USER"
    
    hashed_password = security.get_password_hash(user_in.password)
    db_user = User(
        email=user_in.email,
        name=user_in.name or user_in.email.split("@")[0],
        hashed_password=hashed_password,
        role=role,
        is_active=True
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    client_ip = request.client.host if request.client else None
    log_audit_event(db, db_user.id, "USER_SIGNUP", ip=client_ip, details=f"User signed up with role: {role}")
    
    res = UserResponse.model_validate(db_user)
    res.verifications_count = 0
    return res

@router.post("/login", response_model=Token)
def login(
    request: Request,
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        user.id, expires_delta=access_token_expires
    )
    
    client_ip = request.client.host if request.client else None
    log_audit_event(db, user.id, "USER_LOGIN", ip=client_ip, details=f"User logged in from {client_ip}")
    return {
        "access_token": access_token,
        "token_type": "bearer",
    }

@router.get("/me", response_model=UserResponse)
def read_user_me(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    count = db.query(Verification).filter(Verification.user_id == current_user.id).count()
    res = UserResponse.model_validate(current_user)
    res.verifications_count = count
    return res
