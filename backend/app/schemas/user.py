from pydantic import BaseModel, EmailStr
from datetime import datetime
from uuid import UUID

class UserBase(BaseModel):
    email: EmailStr
    name: str | None = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    password: str | None = None
    is_active: bool | None = None
    role: str | None = None

class UserResponse(UserBase):
    id: UUID
    role: str
    is_active: bool
    created_at: datetime
    verifications_count: int = 0
    avatar: str | None = None

    class Config:
        from_attributes = True
