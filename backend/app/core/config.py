import os
from pathlib import Path
from pydantic_settings import BaseSettings
from pydantic import ConfigDict

BACKEND_DIR = Path(__file__).resolve().parent.parent.parent
ROOT_DIR = BACKEND_DIR.parent

class Settings(BaseSettings):
    PROJECT_NAME: str = "TruthWeave"
    API_V1_STR: str = "/api/v1"
    
    # Security & JWT
    SECRET_KEY: str = "supersecretkeychangeinprod"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # Databases - Use 127.0.0.1 by default for PostgreSQL on Windows
    DATABASE_URL: str = "postgresql://admin:strong-password@127.0.0.1:5432/truthweave"
    
    # External APIs
    GEMINI_API_KEY: str = ""
    
    model_config = ConfigDict(
        env_file=(
            str(BACKEND_DIR / ".env"),
            str(ROOT_DIR / ".env"),
            ".env",
        ),
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()

