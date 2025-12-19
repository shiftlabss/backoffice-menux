
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import SessionLocal
from app.models.all_models import User, Restaurant

def debug_user():
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == "admin@admin.com").first()
        restaurant = db.query(Restaurant).filter(Restaurant.name == "Restaurante Exemplo").first()
        
        print(f"--- Debug Info ---")
        if user:
            print(f"User found: {user.email} (ID: {user.id})")
            print(f"User Restaurant ID: {user.restaurant_id}")
        else:
            print("User admin@admin.com NOT found")

        if restaurant:
            print(f"Restaurant found: {restaurant.name} (ID: {restaurant.id})")
        else:
            print("Restaurant 'Restaurante Exemplo' NOT found")

        if user and restaurant:
            if user.restaurant_id == restaurant.id:
                print("MATCH: User is linked to this restaurant.")
            else:
                print("MISMATCH: User is linked to a DIFFERENT restaurant (or None).")
                # Fix it?
                print("Attempting to fix link...")
                user.restaurant_id = restaurant.id
                db.commit()
                print("FIXED: User linked to 'Restaurante Exemplo'.")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    debug_user()
