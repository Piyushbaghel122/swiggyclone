from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func 
from app.core.database import Base


class restaurantCreate(Base): 
    __tablename__ = "restaurant_data"

    id = Column(Integer, primary_key=True, index=True) 
    reastaurant_name = Column(String, nullable=False)  
    reastaurant_description = Column(String, nullable=True)
    workweek = Column(String, nullable=True)
    is_active = Column(Boolean, nullable=True, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class reastaurantNameDB(Base):
    __tablename__ = "reastaurantName"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), unique=True, index=True, nullable=False)
    username = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())  

class reastaurantMobile(Base):
    __tablename__ = "reastaurantMobile"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("reastaurantName.user_id"), unique=True, index=True, nullable=False)
    mobile = Column(Integer, unique=True, index=True, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class WorkweekschudleDB(Base):
    __tablename__ = "workweekschudle"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), unique=True, index=True, nullable=False)
    monday = Column(Boolean, nullable=False)
    tuesday = Column(Boolean, nullable=False)
    wednesday = Column(Boolean, nullable=False)
    thursday = Column(Boolean, nullable=False)
    friday = Column(Boolean, nullable=False)
    saturday = Column(Boolean, nullable=False)
    sunday = Column(Boolean, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="workweek_schedule")
    