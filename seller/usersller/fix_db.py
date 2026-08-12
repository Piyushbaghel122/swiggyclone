import sys
import os

# Add the current directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import engine
from sqlalchemy import text

def add_country_code_column():
    try:
        with engine.connect() as conn:
            # Check if the column exists
            result = conn.execute(text("SHOW COLUMNS FROM users LIKE 'countryCode'"))
            if not result.fetchone():
                print("Adding countryCode column to users table...")
                conn.execute(text("ALTER TABLE users ADD COLUMN countryCode VARCHAR(255) NOT NULL DEFAULT 'IN'"))
                conn.commit()
                print("Successfully added countryCode column!")
            else:
                print("countryCode column already exists.")
    except Exception as e:
        print(f"Failed to alter table: {e}")

if __name__ == "__main__":
    add_country_code_column()
