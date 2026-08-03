from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base
import enum

class KycStatusEnum(str, enum.Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"

class KycDB(Base):
    __tablename__ = "kyc_details"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), unique=True, index=True, nullable=False)
    
    pan_number = Column(String(10), nullable=True, index=True)
    pan_verified = Column(Boolean, default=False)
    pan_holder_name = Column(String(255), nullable=True)
    
    aadhaar_number = Column(String(12), nullable=True, index=True)
    aadhaar_verified = Column(Boolean, default=False)
    
    ckyc_number = Column(String(20), nullable=True, index=True)
    ckyc_verified = Column(Boolean, default=False)
    
    bank_account_number = Column(String(20), nullable=True, index=True)
    ifsc_code = Column(String(15), nullable=True)
    bank_verified = Column(Boolean, default=False)
    bank_holder_name = Column(String(255), nullable=True)
    
    status = Column(Enum(KycStatusEnum), default=KycStatusEnum.PENDING)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Ideally, we would add the relationship back in user.py:
    # kyc_details = relationship("KycDB", back_populates="user", uselist=False)
    user = relationship("User", backref="kyc_details")
