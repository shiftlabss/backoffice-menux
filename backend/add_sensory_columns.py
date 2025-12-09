import sqlite3
import os

DB_PATH = "menux.db"

def add_columns():
    if not os.path.exists(DB_PATH):
        print(f"Database {DB_PATH} not found.")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    columns = [
        ("sensory_intensity", "INTEGER DEFAULT 50"),
        ("sensory_softness", "INTEGER DEFAULT 50"),
        ("sensory_smoothness", "INTEGER DEFAULT 50"),
        ("sensory_sweetness", "INTEGER DEFAULT 50"),
        ("aroma_notes", "TEXT") # SQLite generic type for JSON
    ]

    for col_name, col_type in columns:
        try:
            cursor.execute(f"ALTER TABLE items ADD COLUMN {col_name} {col_type}")
            print(f"Added column {col_name}")
        except sqlite3.OperationalError as e:
            if "duplicate column" in str(e):
                print(f"Column {col_name} already exists.")
            else:
                print(f"Error adding {col_name}: {e}")

    conn.commit()
    conn.close()
    print("Database update complete.")

if __name__ == "__main__":
    add_columns()
