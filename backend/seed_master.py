#!/usr/bin/env python3
"""
Menux Master Seed Script
========================
Populates the database with comprehensive demo data for 3 months of restaurant operation.
Run: python seed_master.py
"""
import sqlite3
import uuid
import random
from datetime import datetime, timedelta
import os

DB_PATH = 'menux.db'

def gen_id():
    return str(uuid.uuid4())

def main():
    print("="*60)
    print("🚀 MENUX MASTER SEED - DEMO DATABASE")
    print("="*60)
    
    if not os.path.exists(DB_PATH):
        print(f"❌ Database not found: {DB_PATH}")
        print("   Please run the backend first to create tables.")
        return
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Get or create restaurant
    cursor.execute("SELECT id FROM restaurants LIMIT 1")
    result = cursor.fetchone()
    if not result:
        print("❌ No restaurant found. Run backend first.")
        return
    restaurant_id = result[0]
    print(f"✅ Using restaurant: {restaurant_id}")
    
    # Clear existing demo data
    print("\n🧹 Clearing existing data...")
    cursor.execute("DELETE FROM order_items")
    cursor.execute("DELETE FROM orders")
    cursor.execute("DELETE FROM items")
    cursor.execute("DELETE FROM subcategories")
    cursor.execute("DELETE FROM categories WHERE restaurant_id = ?", (restaurant_id,))
    conn.commit()
    print("   Done!")
    
    # ============================================================
    # CATEGORIES
    # ============================================================
    print("\n📁 Creating categories...")
    categories_data = [
        {"name": "Entradas", "sort_order": 0},
        {"name": "Pratos Principais", "sort_order": 1},
        {"name": "Massas", "sort_order": 2},
        {"name": "Sobremesas", "sort_order": 3},
        {"name": "Bebidas", "sort_order": 4},
        {"name": "Vinhos", "sort_order": 5},
    ]
    
    categories = {}
    for cat in categories_data:
        cat_id = gen_id()
        categories[cat["name"]] = cat_id
        cursor.execute('''
            INSERT INTO categories (id, restaurant_id, name, sort_order)
            VALUES (?, ?, ?, ?)
        ''', (cat_id, restaurant_id, cat["name"], cat["sort_order"]))
    conn.commit()
    print(f"   Created {len(categories)} categories")
    
    # ============================================================
    # SUBCATEGORIES
    # ============================================================
    print("📂 Creating subcategories...")
    subcategories_data = {
        "Entradas": [
            {"name": "Frias", "sort_order": 0},
            {"name": "Quentes", "sort_order": 1},
            {"name": "Para Compartilhar", "sort_order": 2},
        ],
        "Pratos Principais": [
            {"name": "Carnes", "sort_order": 0},
            {"name": "Frutos do Mar", "sort_order": 1},
            {"name": "Aves", "sort_order": 2},
        ],
        "Massas": [
            {"name": "Tradicionais", "sort_order": 0},
            {"name": "Especiais", "sort_order": 1},
        ],
        "Sobremesas": [
            {"name": "Clássicos", "sort_order": 0},
            {"name": "Gelados", "sort_order": 1},
            {"name": "Frutas", "sort_order": 2},
        ],
        "Bebidas": [
            {"name": "Refrigerantes", "sort_order": 0},
            {"name": "Sucos", "sort_order": 1},
            {"name": "Drinks", "sort_order": 2},
            {"name": "Cafés", "sort_order": 3},
        ],
        "Vinhos": [
            {"name": "Tintos", "sort_order": 0},
            {"name": "Brancos", "sort_order": 1},
            {"name": "Rosés", "sort_order": 2},
            {"name": "Espumantes", "sort_order": 3},
        ],
    }
    
    subcategories = {}
    sub_count = 0
    for cat_name, subs in subcategories_data.items():
        cat_id = categories[cat_name]
        for sub in subs:
            sub_id = gen_id()
            subcategories[f"{cat_name}_{sub['name']}"] = sub_id
            cursor.execute('''
                INSERT INTO subcategories (id, category_id, name, sort_order)
                VALUES (?, ?, ?, ?)
            ''', (sub_id, cat_id, sub["name"], sub["sort_order"]))
            sub_count += 1
    conn.commit()
    print(f"   Created {sub_count} subcategories")
    
    # Run product and wine seeder (imported from existing script)
    print("\n🍽️  Inserting products and wines...")
    exec(open('seed_demo_database.py').read().split('conn = sqlite3')[0])
    
    # Re-run the detailed product insert from seed_demo_database
    import subprocess
    result = subprocess.run(['python', 'seed_demo_database.py'], capture_output=True, text=True)
    print(result.stdout)
    
    # Run history seeder
    print("\n📊 Generating 3 months of order history...")
    result = subprocess.run(['python', 'seed_full_history.py'], capture_output=True, text=True)
    print(result.stdout)
    
    conn.close()
    
    print("\n" + "="*60)
    print("✅ MENUX DEMO DATABASE FULLY POPULATED!")
    print("="*60)

if __name__ == "__main__":
    main()
