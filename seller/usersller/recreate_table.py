import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from app.core.database import engine, Base
import app.models.rasturant_models
try:
    import app.models.user
except ImportError:
    pass

def recreate_tables():
    try:
        Base.metadata.create_all(bind=engine)
        print("Successfully recreated missing tables.")
    except Exception as e:
        print(f"Error recreating tables: {e}")

if __name__ == "__main__":
    recreate_tables()
