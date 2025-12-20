
from app.db.session import SessionLocal
from app.models.all_models import User
from app.core.security import verify_password, get_password_hash
import sys

def debug_login():
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == "admin@admin.com").first()
        if not user:
            print("User admin@admin.com NOT FOUND.")
            return

        print(f"User found: {user.email}")
        print(f"Stored hash: {user.password_hash}")

        password = "admin"
        is_valid = verify_password(password, user.password_hash)
        print(f"Password '{password}' valid? {is_valid}")

        if not is_valid:
            print("Password invalid. Resetting...")
            new_hash = get_password_hash(password)
            user.password_hash = new_hash
            db.commit()
            print("Password reset. New hash stored.")
            
            # Verify again
            is_valid_now = verify_password(password, new_hash)
            print(f"Password '{password}' valid now? {is_valid_now}")
        else:
            print("Password is valid. No changes needed.")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    debug_login()
