from app.db.session import engine, SessionLocal, Base
from app.models.all_models import User, Restaurant, Category
from app.core.security import get_password_hash

def init_db():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Check if restaurant exists
        restaurant = db.query(Restaurant).first()
        if not restaurant:
            print("Creating default restaurant...")
            restaurant = Restaurant(name="Menux Default Restaurant")
            db.add(restaurant)
            db.commit()
            db.refresh(restaurant)
        else:
            print("Restaurant already exists.")

        # Create Admin
        existing_user = db.query(User).filter(User.email == "admin@admin.com").first()
        if not existing_user:
            print("Creating admin user...")
            user = User(
                email="admin@admin.com",
                password_hash=get_password_hash("admin"),
                role="admin",
                restaurant_id=restaurant.id
            )
            db.add(user)
            db.commit()
            print("Admin user created.")
        else:
            print("Admin user already exists.")
            
    except Exception as e:
        print(f"Error initializing DB: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
