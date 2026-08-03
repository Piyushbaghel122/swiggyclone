import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

# Get MongoDB URL from environment variables, default to local if not set
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "swiggy_clone")

# Initialize the MongoClient
client = MongoClient(MONGO_URL)

# Get the database instance
db = client[MONGO_DB_NAME]

def get_mongo_db():
    """
    Dependency function to get the MongoDB database instance in FastAPI routes
    """
    try:
        yield db
    finally:
        pass
