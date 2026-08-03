from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class Address(Base):
    __tablename__ = "addresses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=False)
    tag = Column(String(50), default="Home")  # e.g., Home, Work, Other
    flat_no = Column(String(100), nullable=True)
    street = Column(String(255), nullable=False)
    landmark = Column(String(255), nullable=True)
    city = Column(String(100), nullable=False)
    pincode = Column(String(20), nullable=False)
    is_selected = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
