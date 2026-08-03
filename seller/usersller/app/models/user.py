from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String(255), index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    two_factor_secret = Column(String(255), nullable=True)
    is_two_factor_enabled = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    mobile = relationship("Mobile", back_populates="user", uselist=False)
    user_info = relationship("DBUserInfo", back_populates="user", uselist=False)
    workweek_schedule = relationship("WorkweekschudleDB", back_populates="user", uselist=False)
    restaurant_name = relationship("restaurantNameDB", back_populates="user", uselist=False)

class Mobile(Base):
      __tablename__ = "mobiles"
      user_id = Column(Integer, ForeignKey("users.user_id"), primary_key=True, index=True)
      mobile_number = Column(String(255), unique=True, index=True, nullable=False)
      send_otp = Column(String(255), nullable=False)
      user = relationship("User", back_populates="mobile")

class DBUserInfo(Base):
    __tablename__ = "user_info"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), unique=True, index=True, nullable=False)
    owername = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    pincode = Column(String(255), nullable=False)
    address = Column(String(255), nullable=False)
    mobile_number = Column(String(255), nullable=False)
    
    user = relationship("User", back_populates="user_info")

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

class restaurantNameDB(Base):
    __tablename__ = "restaurantName"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="restaurant_name")

    