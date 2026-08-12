from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime, ForeignKey, Text
from sqlalchemy.dialects.mysql import LONGTEXT
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
    user_id = Column(Integer, unique=True, index=True, nullable=False)
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


class menuCategoryDB(Base):
    __tablename__ = "menuCategory"

    id = Column(Integer, primary_key=True, index=True) 
    user_id = Column(Integer, index=True, nullable=False)
    
    FoodImage = Column(LONGTEXT, nullable=False)
    FoodName = Column(String(255) , nullable=False)
    FoodPirce = Column(Integer , nullable=False)
    FoodDiscription = Column(String(255), nullable=False)
    FoodType = Column(String(50), nullable=False)
    FoodTime = Column(String(50), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class createReastaurantDB(Base): 
    __tablename__ = "createReastaurant"

    id = Column(Integer , primary_key=True , index=False)
    user_id = Column(Integer, index=True , nullable=False)
    reastaurantNameOwner = Column(String(255) , nullable=False)
    reastaurantName = Column(String(255) , nullable=False)
    reastaurantDescription = Column(String(255), nullable=False)
    reastaurantImage = Column(LONGTEXT, nullable=False)
    reastaurantLocation = Column(String(255), nullable=False)
    reastaurantPincode = Column(Integer, nullable=False)
    reastaurantAddress = Column(String(255), nullable=False)
    reastaurantMobileNumber = Column(Integer, nullable=False)
    reastaurantType = Column(String(255), nullable=False)

class WorkweeklySchudleDB(Base):
    __tablename__ = "workweeklySchudle"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)

    sunday = Column(String(255), nullable=False)
    monday = Column(String(255), nullable=False)
    tuesday = Column(String(255), nullable=False)
    wednesday = Column(String(255), nullable=False)
    thrusday = Column(String(255), nullable=False)
    friday = Column(String(255), nullable=False)
    saturday = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class DayTimevibeTimeTable(Base):
    __tablename__ = "DayTimevibeTimeTable"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)

    Morning = Column(String(255), nullable=False)
    Afternoon = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class ShopOpenAndClose(Base):
    __tablename__ = "ShopOpenAndClose"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)

    open = Column(String(255), nullable=False)
    close = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class createJobDb(Base):
    __tablename__ = "createJob"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)

    job_title = Column(String(255), nullable=False)
    job_workyour = Column(String(255), nullable=False)
    job_type = Column(String(255), nullable=False)
    job_salary = Column(String(255), nullable=False)
    job_location = Column(String(255), nullable=False) 
    job_selectorType = Column(String(255), nullable=False) 
    job_experience = Column(String(255), nullable=False)
    job_lastCompany = Column(String(255), nullable=False)
    job_firstCompany = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    