from sqlalchemy import Column, Integer, String, Boolean 
from sqlalchemy.sql import func 
from app.core.database import Base

class User(Base): 
   __tablename__ = "users"
   id = Column(String(36), primary_key=True, index=True)
   mobile = Column(String(15), unique=True, index=True)
   email = Column(String(255) , unique=True , nullable=False)
   password = Column(String(255) , nullable=True )