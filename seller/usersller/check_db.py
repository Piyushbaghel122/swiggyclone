import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from app.core.database import SessionLocal
from app.models.rasturant_models import menuCategoryDB

def check_records():
    db = SessionLocal()
    try:
        records = db.query(menuCategoryDB).all()
        print(f"Total records in menuCategory: {len(records)}")
        for r in records:
            print(f"ID: {r.id}, User ID: {r.user_id}, Name: {r.FoodName}")
    finally:
        db.close()

if __name__ == "__main__":
    check_records()
