import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from app.core.database import SessionLocal
import app.models.rasturant_models
try:
    import app.models.user
except ImportError:
    pass

from app.models.rasturant_models import menuCategoryDB

def insert_mock_record():
    db = SessionLocal()
    try:
        new_item = menuCategoryDB(
            user_id = 1,
            FoodImage = "https://example.com/image.jpg",
            FoodName = "Mock Food",
            FoodPirce = 900,
            FoodDiscription = "This is a test food",
            FoodType = "Test Type",
            FoodTime = "8:00"
        )
        db.add(new_item)
        db.commit()
        db.refresh(new_item)
        print(f"Successfully inserted mock record with ID: {new_item.id} and user_id: {new_item.user_id}")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    insert_mock_record()
