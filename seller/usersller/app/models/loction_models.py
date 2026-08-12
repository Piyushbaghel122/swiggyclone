from app.core.database import Base 
from sqlalchemy.sql import func 
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship
import uuid

class LocationDB(Base):
    __tablename__ = "locations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    
    label = Column(String(50), nullable=True) # e.g. Home, Work
    address = Column(String(500), nullable=False)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    country = Column(String(100), nullable=True)
    postal_code = Column(String(20), nullable=True)
    
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    place_id = Column(String(255), nullable=True)
    
    is_default = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # user = relationship("User", backref="locations")

class ReastaurantLocation(Base): 
    __tablename__ = "reastaurant_locations"

    id = Column(String , primary_key=True ,default = lambda: str(uuid.uuid4()))
    restaurant_id = Column(String , unique=True , nullable=False)

    address = Column(String , nullable=False)
    city = Column(String , nullable=False) 
    state = Column(String , nullable=False)
    country = Column(String , nullable= False)
    postal_code = Column(String , nullable = False)
    
    latitude = Column(Float , nullable=False)
    longitude = Column(Float , nullable=False)

    delivery_radius =   Column(Float , nullable = False)

    created_at = Column(DateTime(timezone= True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True) , server_default=func.now() , onupdate = func.now())

    

           # user = relationship("User", backref="locations")
