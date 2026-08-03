from sqlalchemy import create_engine, text
from os import getenv
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv

load_dotenv()

database = getenv("DATABASE_URL")
try:
    if "/" in database:
        base_url, db_name = database.rsplit("/", 1)
        db_name = db_name.split("?")[0]
        if base_url and db_name:
            temp_engine = create_engine(base_url)
            with temp_engine.connect() as conn:
                conn.execute(text(f"CREATE DATABASE IF NOT EXISTS `{db_name}`"))
                try:
                    conn.commit()
                except AttributeError:
                    pass
            temp_engine.dispose()
except Exception as error:
    print("Note: Auto-create database check failed:", error)

engine = create_engine(database)

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
