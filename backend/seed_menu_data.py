
import sys
import os
import random

# Add parent directory to path so we can import 'app'
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import SessionLocal, engine
from app.models.all_models import Base, Restaurant, Category, SubCategory, Item

def seed_menu():
    # Ensure tables exist
    print("--- Creating Tables ---")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    
    try:
        print("--- Starting Menu Seed ---")
        
        # 1. Ensure Restaurant Exists
        restaurant = db.query(Restaurant).filter(Restaurant.name == "Restaurante Exemplo").first()
        if not restaurant:
            restaurant = Restaurant(
                name="Restaurante Exemplo",
                logo_url="https://placeholder.com/logo.png",
                open_hours="18:00 - 23:00"
            )
            db.add(restaurant)
            db.commit()
            db.refresh(restaurant)
            print(f"Created Restaurant: {restaurant.name}")
        else:
            print(f"Using existing Restaurant: {restaurant.name}")

        rest_id = restaurant.id

        # 2. Categories Structure
        # Structure: Category -> [Subcategories]
        menu_structure = {
            "Entradas": ["Petiscos", "Saladas", "Sopas"],
            "Pratos Principais": ["Carnes", "Peixes e Frutos do Mar", "Massas", "Risotos", "Vegetariano"],
            "Sobremesas": ["Doces", "Frutas", "Sorvetes"],
            "Bebidas": ["Sucos", "Refrigerantes", "Água", "Cervejas"],
            "Vinhos": ["Tintos", "Brancos", "Roses", "Espumantes"]
        }

        # Clear existing data if needed? No, let's append or check existence. 
        # For simplicity in this dev task, let's just add missing ones.

        created_cats = {}
        created_subs = {}

        for cat_name, sub_names in menu_structure.items():
            # Create Category
            cat = db.query(Category).filter(Category.name == cat_name, Category.restaurant_id == rest_id).first()
            if not cat:
                cat = Category(name=cat_name, restaurant_id=rest_id, sort_order=len(created_cats))
                db.add(cat)
                db.commit()
                db.refresh(cat)
                print(f"  + Category: {cat.name}")
            created_cats[cat_name] = cat

            # Create Subcategories
            for idx, sub_name in enumerate(sub_names):
                sub = db.query(SubCategory).filter(SubCategory.name == sub_name, SubCategory.category_id == cat.id).first()
                if not sub:
                    sub = SubCategory(name=sub_name, category_id=cat.id, sort_order=idx)
                    db.add(sub)
                    db.commit()
                    db.refresh(sub)
                    print(f"    - Subcategory: {sub.name}")
                created_subs[(cat_name, sub_name)] = sub

        # 3. Products (Samples)
        products_data = [
            # Entradas
            {"cat": "Entradas", "sub": "Petiscos", "name": "Bolinho de Bacalhau", "price": 45.00, "desc": "Porção com 6 unidades, acompanha molho tártaro."},
            {"cat": "Entradas", "sub": "Petiscos", "name": "Bruschetta Clássica", "price": 38.00, "desc": "Tomate, manjericão e azeite no pão italiano."},
            {"cat": "Entradas", "sub": "Saladas", "name": "Salada Caesar", "price": 42.00, "desc": "Alface romana, croutons, parmesão e molho especial."},
            
            # Pratos Principais
            {"cat": "Pratos Principais", "sub": "Carnes", "name": "Filé Mignon ao Poivre", "price": 89.00, "desc": "Acompanha risoto de parmesão."},
            {"cat": "Pratos Principais", "sub": "Carnes", "name": "Bife Ancho", "price": 95.00, "desc": "Grelhado na parrilha, acompanha batatas rústicas."},
            {"cat": "Pratos Principais", "sub": "Peixes e Frutos do Mar", "name": "Salmão Grelhado", "price": 78.00, "desc": "Com legumes salteados na manteiga de ervas."},
            {"cat": "Pratos Principais", "sub": "Massas", "name": "Spaghetti Carbonara", "price": 65.00, "desc": "Receita tradicional com guanciale e pecorino."},
            
            # Sobremesas
            {"cat": "Sobremesas", "sub": "Doces", "name": "Petit Gâteau", "price": 32.00, "desc": "Com sorvete de creme."},
            {"cat": "Sobremesas", "sub": "Doces", "name": "Tiramisu", "price": 35.00, "desc": "Clássico italiano com mascarpone e café."},
            
            # Bebidas
            {"cat": "Bebidas", "sub": "Sucos", "name": "Suco de Laranja", "price": 12.00, "desc": "Natural, 300ml."},
            {"cat": "Bebidas", "sub": "Refrigerantes", "name": "Coca-Cola", "price": 8.00, "desc": "Lata 350ml."},
        ]

        print("--- Seeding Products ---")
        for p in products_data:
            cat_obj = created_cats.get(p["cat"])
            sub_obj = created_subs.get((p["cat"], p["sub"]))
            
            if cat_obj and sub_obj:
                # Check if exists
                item = db.query(Item).filter(Item.name == p["name"], Item.subcategory_id == sub_obj.id).first()
                if not item:
                    item = Item(
                        restaurant_id=rest_id,
                        subcategory_id=sub_obj.id,
                        code=str(random.randint(1000, 9999)),
                        name=p["name"],
                        short_description=p["desc"],
                        price=p["price"],
                        is_active=True,
                        is_wine=False
                    )
                    db.add(item)
                    print(f"  + Product: {item.name}")
        
        db.commit()

        # 4. Wines
        wines_data = [
            {
                "sub": "Tintos", "name": "Cabernet Sauvignon Reserva", "price": 120.00,
                "grape": "Cabernet Sauvignon", "vintage": "2018", "origin": "Chile / Vale do Maipo",
                "notes": {"intensity": 80, "softness": 40, "smoothness": 60, "sweetness": 10},
                "desc": "Vinho encorpado com notas de frutas vermelhas maduras."
            },
            {
                "sub": "Tintos", "name": "Malbec Estate", "price": 145.00,
                "grape": "Malbec", "vintage": "2020", "origin": "Argentina / Mendoza",
                "notes": {"intensity": 85, "softness": 50, "smoothness": 70, "sweetness": 15},
                "desc": "Robusto, com taninos macios e final persistente."
            },
            {
                "sub": "Brancos", "name": "Chardonnay Gran Reserva", "price": 110.00,
                "grape": "Chardonnay", "vintage": "2021", "origin": "Brasil / Serra Gaúcha",
                "notes": {"intensity": 60, "softness": 70, "smoothness": 80, "sweetness": 20},
                "desc": "Fresco, com toque amanteigado e notas de abacaxi."
            },
            {
                "sub": "Espumantes", "name": "Brut Rosé", "price": 98.00,
                "grape": "Pinot Noir / Chardonnay", "vintage": "NV", "origin": "Brasil / Pinto Bandeira",
                "notes": {"intensity": 50, "softness": 80, "smoothness": 90, "sweetness": 30},
                "desc": "Perlage fina e persistente, aromas de frutas vermelhas frescas."
            }
        ]

        print("--- Seeding Wines ---")
        wine_cat = created_cats.get("Vinhos")
        if wine_cat:
            for w in wines_data:
                sub_obj = created_subs.get(("Vinhos", w["sub"]))
                if sub_obj:
                    item = db.query(Item).filter(Item.name == w["name"], Item.subcategory_id == sub_obj.id).first()
                    if not item:
                        item = Item(
                            restaurant_id=rest_id,
                            subcategory_id=sub_obj.id,
                            code=str(random.randint(5000, 9999)),
                            name=w["name"],
                            short_description=w["desc"],
                            price=w["price"],
                            is_active=True,
                            is_wine=True,
                            wine_type=w["sub"][:-1], # Remove plural roughly
                            grape=w["grape"],
                            vintage=w["vintage"],
                            origin=w["origin"],
                            sensory_intensity=w["notes"]["intensity"],
                            sensory_softness=w["notes"]["softness"],
                            sensory_smoothness=w["notes"]["smoothness"],
                            sensory_sweetness=w["notes"]["sweetness"],
                            volume="750ml"
                        )
                        db.add(item)
                        print(f"  + Wine: {item.name}")

            db.commit()

        print("--- Menu Seed Completed Successfully ---")

    except Exception as e:
        print(f"Error seeding menu: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_menu()
