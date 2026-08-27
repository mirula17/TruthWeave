from pydantic import BaseModel, Field
from datetime import datetime
from uuid import UUID
from typing import Optional, List

class AdminStatsResponse(BaseModel):
    totalUsers: int = Field(..., alias="totalUsers")
    activeUsers: int = Field(..., alias="activeUsers")
    totalVerifications: int = Field(..., alias="totalVerifications")
    todayVerifications: int = Field(..., alias="todayVerifications")
    flaggedContent: int = Field(..., alias="flaggedContent")
    systemErrors: int = Field(..., alias="systemErrors")

    class Config:
        populate_by_name = True

class AdminUserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    isActive: bool = Field(..., alias="isActive")
    createdAt: datetime = Field(..., alias="createdAt")
    verificationsCount: int = Field(0, alias="verificationsCount")
    lastActive: str = Field("Recently", alias="lastActive")

    class Config:
        from_attributes = True
        populate_by_name = True

class SystemServiceHealth(BaseModel):
    name: str
    type: str
    status: str # 'online' | 'degraded' | 'offline'
    latency: str
    requests24h: str
    errorRate: str
    uptime: str
    version: Optional[str] = None
    endpoint: Optional[str] = None

class AuditLogItemResponse(BaseModel):
    id: str
    userId: Optional[str] = Field(None, alias="userId")
    userEmail: Optional[str] = Field(None, alias="userEmail")
    action: str
    resource: Optional[str] = None
    ipAddress: Optional[str] = Field(None, alias="ipAddress")
    details: Optional[str] = None
    status: Optional[str] = "SUCCESS"
    timestamp: datetime

    class Config:
        from_attributes = True
        populate_by_name = True

class RoleUpdateRequest(BaseModel):
    role: str
