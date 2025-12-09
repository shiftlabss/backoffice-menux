from app.db.session import SessionLocal
from app.models.all_models import User, Restaurant
from app.core.security import get_password_hash
import sys

def create_admin():
    db = SessionLocal()
    try:
        # Get existing restaurant
        restaurant = db.query(Restaurant).first()
        if not restaurant:
            print("Error: No restaurant found. Please run setup first.")
            sys.exit(1)

        # Check if user exists
        existing_user = db.query(User).filter(User.email == "admin@admin.com").first()
        if existing_user:
            existing_user.password_hash = get_password_hash("admin")
            db.commit()
            print("User admin@admin.com password updated to 'admin'.")
            return

        # Create user
        user = User(
            email="admin@admin.com",
            password_hash=get_password_hash("admin"),
            role="admin",
            restaurant_id=restaurant.id
        )
        db.add(user)
        db.commit()
        print("User admin@admin.com created successfully.")
        
    except Exception as e:
        print(f"Error creating user: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()
