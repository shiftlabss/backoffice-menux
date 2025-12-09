from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "Menux Backoffice API"
    API_V1_STR: str = "/api"
    
    # Environment
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./menux.db")
    
    # Security - MUST be set via environment variable in production
    SECRET_KEY: str = os.getenv("SECRET_KEY", "dev-only-insecure-key-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    # CORS - Comma-separated origins, or "*" for dev
    CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000")

    @property
    def cors_origins_list(self) -> list:
        """Parse CORS_ORIGINS into a list."""
        if self.CORS_ORIGINS == "*":
            return ["*"]
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]

    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT.lower() == "production"

    def validate_production_settings(self):
        """Raise error if running in production with insecure settings."""
        if self.is_production:
            if "insecure" in self.SECRET_KEY or self.SECRET_KEY == "dev-only-insecure-key-change-in-production":
                raise ValueError("SECRET_KEY must be set to a secure value in production!")
            if self.CORS_ORIGINS == "*":
                raise ValueError("CORS_ORIGINS cannot be '*' in production!")

    class Config:
        env_file = ".env"

settings = Settings()

# Validate on import if in production
if settings.is_production:
    settings.validate_production_settings()
