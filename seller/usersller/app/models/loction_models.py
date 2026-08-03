from app.core.database import Base 
from sqlalchemy.sql import func 
from sqlalchemy import Column, Integer, String, DateTime, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship
import uui

class LocationDB(Base):
    __tablename__ = "locations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), index=True, nullable=False)
    
    label = Column(String(50), nullable=True) # e.g. Home, Work
    address = Column(String(500), nullable=False)
    city = (100), nullable=True)
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

    id = Cloumn(String , primary_key=True ,default = lambda: str(uuid.uuid4()))
    restaurant_id = Cloumn(String , unqiune=True , nullble=False)

    address = Cloumn(String , nullable=False)
    city = Cloumn(String , nullable=False) 
    state = Column(String , nullable=False)
    country = Cloumn(String , nullable= False)
    postal_code = Column(String , nullable = False)
    
    latitude = Column(Float , nullable=False)
    langitude = Column(Float , nullble=False)

    delivery_radius =   Column(Floag , nullable = False)

    created_at = Column(DateTime(timezone= True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True) , server_default=func.now() , onupdate = func.now())

    

           # user = relationship("User", backref="locations")
