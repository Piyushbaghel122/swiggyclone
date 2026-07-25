from sqlalchemy import create_engine
from os import getenv
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv

load_dotenv()

engine = create_engine(getenv("DATABASE_URL"))

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

try:
    with engine.connect() as connection:
        print("Database connected successfully!")
except Exception as error:
    print("Error connecting to database:", error)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
