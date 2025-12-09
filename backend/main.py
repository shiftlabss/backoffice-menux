from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import auth, menu, orders, dashboard, intelligence
from app.db.session import engine, Base

# Create tables on startup (for MVP simplicity)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    docs_url="/api/docs" if not settings.is_production else None,  # Disable Swagger in prod
    redoc_url="/api/redoc" if not settings.is_production else None,
)

# CORS - Use configured origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])
app.include_router(menu.router, prefix="/api/menu", tags=["menu"])
app.include_router(intelligence.router, prefix="/api/intelligence", tags=["intelligence"])

@app.get("/")
def root():
    return {"message": "Menux Backoffice API is running", "environment": settings.ENVIRONMENT}

@app.get("/health")
def health_check():
    """Health check endpoint for monitoring and load balancers."""
    return {"status": "healthy", "environment": settings.ENVIRONMENT}
