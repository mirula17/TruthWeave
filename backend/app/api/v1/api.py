from fastapi import APIRouter
from app.api.v1.endpoints import auth, admin, verifications, documents

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
api_router.include_router(verifications.router, prefix="/verifications", tags=["verifications"])
api_router.include_router(verifications.router, prefix="/verify", tags=["verify"])
api_router.include_router(documents.router, prefix="/documents", tags=["documents"])
