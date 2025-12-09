"""
Seed script to add sample orders to the database.
"""
import sqlite3
import uuid
import random
from datetime import datetime, timedelta

# Connect to database
conn = sqlite3.connect('menux.db')
cursor = conn.cursor()

# Get Restaurant ID (use the same one as seed_products)
restaurant_id = '3fad514c-41fa-455e-a144-1884d5795de1'

# Fetch available items
cursor.execute("SELECT id, code, name, price FROM items WHERE restaurant_id = ?", (restaurant_id,))
items = cursor.fetchall()

if not items:
    print("Warning: No items found. Please run seed_products.py first.")
    # Exit or create dummy items? Assuming seed_products ran.
    # We will try to fetch ANY items if restaurant_id mismatch
    cursor.execute("SELECT id, code, name, price FROM items")
    items = cursor.fetchall()

if not items:
    print("Error: No items in database to create orders.")
    exit()

print(f"Found {len(items)} items to use for orders.")

# Define fake orders
orders_data = [
    {
        'customer_name': 'Carlos Silva',
        'table_number': '04',
        'status': 'finalized', # 'delivered' maps to 'finalized' usually or we use distinct
        'notes': None,
        'items_count': 2
    },
    {
        'customer_name': 'Ana Paula',
        'table_number': '02',
        'status': 'ready',
        'notes': 'Sem cebola no prato principal',
        'items_count': 1
    },
    {
        'customer_name': 'Roberto Almeida',
        'table_number': '08',
        'status': 'preparing',
        'notes': 'VIP',
        'items_count': 3
    },
    {
        'customer_name': 'Fernanda Costa',
        'table_number': '01',
        'status': 'initiated',
        'notes': None,
        'items_count': 2
    }
]

# Insert orders
for order_info in orders_data:
    order_id = str(uuid.uuid4())
    
    # Select random items
    selected_items = random.sample(items, min(len(items), order_info['items_count']))
    
    total_value = 0
    order_items_to_insert = []
    
    for item in selected_items:
        item_id, item_code, item_name, item_price = item
        quantity = random.randint(1, 2)
        price = float(item_price)
        total_value += price * quantity
        
        order_items_to_insert.append((
            str(uuid.uuid4()),
            order_id,
            item_id,
            item_code,
            item_name,
            quantity,
            price
        ))

    # Insert Order
    cursor.execute('''
        INSERT INTO orders (id, restaurant_id, total_value, table_number, customer_name, notes, status, created_at, decision_time_seconds, session_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        order_id,
        restaurant_id,
        total_value,
        order_info['table_number'],
        order_info['customer_name'],
        order_info['notes'],
        order_info['status'],
        datetime.now(),
        random.randint(60, 600), # random decision time
        str(uuid.uuid4()) # fake session id
    ))
    
    # Insert Order Items
    for oi in order_items_to_insert:
        cursor.execute('''
            INSERT INTO order_items (id, order_id, item_id, item_code, item_name, quantity, unit_price)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', oi)

conn.commit()
conn.close()

print("✅ Seed orders inserted successfully!")
