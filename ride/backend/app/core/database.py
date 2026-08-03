from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from os import getenv
from dotenv import load_dotenv

load_dotenv()

engine = create_engine(getenv("DATABASE_URL"), echo=True)

Base = declarative_base()

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

try: 
    with engine.connect() as connection:
        print("connection to database")
except Exception as error: 
    print("erorr" , error)

def get_db(): 
    db = SessionLocal()
    try: 
        yield db
    finally: 
        db.close()
