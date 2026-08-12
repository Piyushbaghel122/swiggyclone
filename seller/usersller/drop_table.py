import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from app.core.database import engine
from app.models.rasturant_models import menuCategoryDB

def drop_table():
    try:
        menuCategoryDB.__table__.drop(engine)
        print("Successfully dropped menuCategory table.")
    except Exception as e:
        print(f"Error dropping table: {e}")

if __name__ == "__main__":
    drop_table()
