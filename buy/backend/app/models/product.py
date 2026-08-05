from sqlalchemy import Column , Integer , String , Float , DateTime
from app.core.database import get_db , Base
from sqlalchemy.sql import func 
from datetime import datetime 

class productList(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True , nullable=False)
    name = Column(String(100), nullable=False)    
    imageUrl = Column(String(255), nullable= False)
    price = Column(Float, nullable=False)
    restaurantName = Column(String(255), nullable=False)
    restaurantLocation = Column(String(255) , nullable=False)
    restaurantLatittude = Column(Float, nullable=False)
    restaurantLongitude = Column(Float , nullable=False)
    deliveryTime = Column(Integer , nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


    