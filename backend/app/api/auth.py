from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.config import settings
from app.core.security import create_access_token
from app.models.all_models import User, Restaurant
from app.schemas.all_schemas import LoginRequest, Token, UserOut, UserCreate, PasswordResetRequest
from app.api import deps

router = APIRouter()

@router.post("/login", response_model=Token)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    """Authenticate user and return JWT token. MVP: Using plain text passwords."""
    user = db.query(User).filter(User.email == login_data.email).first()
    # MVP: Simple plain text password comparison
    if not user or user.password_hash != login_data.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(subject=user.id)
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/forgot-password", status_code=status.HTTP_202_ACCEPTED)
def forgot_password(request: PasswordResetRequest, db: Session = Depends(get_db)):
    """Request password reset. Always returns 202 to prevent email enumeration."""
    user = db.query(User).filter(User.email == request.email).first()
    if user:
        # MVP: Simulate email sending (in production, integrate with email service)
        print(f"--- PASSWORD RESET REQUEST ---")
        print(f"Email: {user.email}")
        print(f"Action: User requested password reset.")
        print(f"------------------------------")
    
    # Always return 202 to avoid email enumeration attacks
    return {"detail": "If the email exists, a reset link has been sent."}

@router.get("/me", response_model=UserOut)
def read_users_me(current_user: User = Depends(deps.get_current_user)):
    """Get current authenticated user."""
    return current_user

@router.post("/setup", response_model=UserOut)
def setup_initial_data(user_in: UserCreate, restaurant_name: str, db: Session = Depends(get_db)):
    """
    Initial setup endpoint to create the first restaurant and admin user.
    
    SECURITY: This endpoint is DISABLED in production to prevent abuse.
    In development, it checks if any restaurant exists to prevent duplicate setup.
    """
    # Block in production
    if settings.is_production:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Setup endpoint is disabled in production. Use database migrations or admin scripts."
        )
    
    # Check if setup already completed
    if db.query(Restaurant).count() > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Setup already completed. A restaurant already exists."
        )
    
    # Create restaurant
    restaurant = Restaurant(name=restaurant_name)
    db.add(restaurant)
    db.commit()
    db.refresh(restaurant)
    
    # Create admin user (MVP: plain text password)
    user = User(
        email=user_in.email,
        password_hash=user_in.password,  # MVP: Storing plain text
        role="admin",
        restaurant_id=restaurant.id
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    return user
