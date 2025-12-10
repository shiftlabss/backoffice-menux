
import sqlite3
import uuid
import random
from datetime import datetime, timedelta

def seed_history():
    print("🚀 Starting full history seeding (3 months operation)...")
    
    conn = sqlite3.connect('menux.db')
    cursor = conn.cursor()

    # 1. Get Restaurant ID
    cursor.execute("SELECT id FROM restaurants LIMIT 1")
    res = cursor.fetchone()
    if not res:
        print("❌ No restaurant found. Please run setup first.")
        return
    restaurant_id = res[0]

    # 2. Get Items
    cursor.execute("SELECT id, code, name, price FROM items WHERE restaurant_id = ?", (restaurant_id,))
    items = cursor.fetchall()
    
    if len(items) < 10:
        # Fallback to try to get any items if none for specific restaurant
        cursor.execute("SELECT id, code, name, price FROM items")
        items = cursor.fetchall()
        
    if not items:
        print("❌ No items found. Please run seed_demo_database.py first!")
        return

    print(f"✅ Found {len(items)} menu items to use.")

    # 3. Generate 3 months of data
    end_date = datetime.now()
    start_date = end_date - timedelta(days=90)
    
    current_date = start_date
    total_orders = 0
    
    # Customer names cache to simulate repeat customers
    customer_names = [
        "Carlos Silva", "Ana Paula", "Roberto Almeida", "Fernanda Costa", "João Souza", 
        "Maria Oliveira", "Pedro Santos", "Lucas Ferreira", "Juliana Lima", "Bruno Rodrigues",
        "Camila Pereira", "Diego Alves", "Eduarda Gomes", "Felipe Martins", "Gabriela Rocha",
        "Hugo Ribeiro", "Isabela Barbosa", "Jorge Ramos", "Karina Dias", "Leonardo Castro",
        "Mariana Moraes", "Nicolas Teixeira", "Olivia Cardoso", "Paulo Mendes", "Quintino Neves",
        "Rafael Nunes", "Sofia Carvalho", "Thiago Azevedo", "Ursula Pinto", "Vinicius Correia"
    ]
    
    while current_date <= end_date:
        # Determine daily volume: Weekends behave differently
        # 0=Mon, 6=Sun
        weekday = current_date.weekday()
        is_weekend = weekday >= 4 # Fri, Sat, Sun
        
        if is_weekend:
            daily_orders_count = random.randint(30, 80)
        else:
            daily_orders_count = random.randint(10, 40)
            
        print(f"  📅 Generating {daily_orders_count} orders for {current_date.strftime('%Y-%m-%d')}...")

        for _ in range(daily_orders_count):
            order_id = str(uuid.uuid4())
            
            # Time distribution (lunch vs dinner)
            # 30% lunch (11-14h), 70% dinner (18-23h)
            if random.random() < 0.3:
                hour = random.randint(11, 14)
            else:
                hour = random.randint(18, 23)
            
            minute = random.randint(0, 59)
            order_time = current_date.replace(hour=hour, minute=minute, second=random.randint(0,59))
            
            # Do not generate future orders for today
            if order_time > datetime.now():
                continue

            # Randomize status
            # 90% finalized, 5% cancelled, 5% open (only if recent)
            rand_status = random.random()
            status = 'finalized'
            
            # If valid 'today' order, might be open
            is_today = current_date.date() == datetime.now().date()
            if is_today and rand_status > 0.95:
                 status = 'preparing'
            elif rand_status > 0.95:
                 status = 'cancelled'

            # Table & Customer
            table_num = str(random.randint(1, 20))
            customer = random.choice(customer_names)
            if random.random() < 0.2: customer = None # Anonymous
            
            # Items
            num_items = random.randint(1, 5)
            selected_items = random.choices(items, k=num_items)
            
            total_value = 0.0
            order_items_to_insert = []
            
            for item in selected_items:
                i_id, i_code, i_name, i_price = item
                qty = random.randint(1, 2)
                price = float(i_price)
                line_total = price * qty
                total_value += line_total
                
                order_items_to_insert.append((
                    str(uuid.uuid4()),
                    order_id,
                    i_id,
                    i_code,
                    i_name,
                    qty,
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
                table_num,
                customer,
                None,
                status,
                order_time,
                random.randint(45, 900),
                str(uuid.uuid4())
            ))
            
            # Insert Items
            for oi in order_items_to_insert:
                cursor.execute('''
                    INSERT INTO order_items (id, order_id, item_id, item_code, item_name, quantity, unit_price)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ''', oi)
                
            total_orders += 1

        current_date += timedelta(days=1)
        conn.commit() # Commit daily

    conn.close()
    print("\n" + "="*50)
    print(f"✅ DONE! Generated {total_orders} orders over 90 days.")
    print("="*50)

if __name__ == "__main__":
    seed_history()
