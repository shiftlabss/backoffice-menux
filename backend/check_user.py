import sys
import logging

try:
    from app.db.session import SessionLocal
    from app.models.all_models import User
    from app.core.security import verify_password
    
    # Force print to flush
    print("Starting check...", flush=True)

    db = SessionLocal()
    user = db.query(User).filter(User.email == "admin@admin.com").first()

    if user:
        print(f"User found: {user.email}", flush=True)
        print(f"Role: {user.role}", flush=True)
        is_valid = verify_password('admin', user.password_hash)
        print(f"Password Verify 'admin': {is_valid}", flush=True)
    else:
        print("User NOT found", flush=True)
        
except Exception as e:
    print(f"Error: {e}", flush=True)
