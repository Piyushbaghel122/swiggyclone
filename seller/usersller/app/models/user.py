from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

user_friends = Table(
    "user_friends",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.user_id"), primary_key=True),
    Column("friend_id", Integer, ForeignKey("users.user_id"), primary_key=True)
)

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String(255), index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    countryCode = Column(String(255), nullable=False)
    mobilenumber = Column(String(255), unique=True, index=True, nullable=False)
    bio = Column(String, default="")
    profilePic = Column(String, default="")
    nativeLanguage = Column(String(255), default="")
    learningLanguage = Column(String(255), default="")
    location = Column(String(255), default="")
    isOnboarded = Column(Boolean, default=False)

    friends = relationship(
        "User",
        secondary=user_friends,
        primaryjoin=user_id==user_friends.c.user_id,
        secondaryjoin=user_id==user_friends.c.friend_id,
        backref="friended_by"
    )

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Blacklist(Base):
    __tablename__ = "blacklist"

    id = Column(Integer, primary_key=True, index=True)
    token = Column(String(255), unique=True, index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class DocumentJob(Base):
    __tablename__ = "DocmentJOB"

    user_id = Column(Integer, primary_key=True, index=True)
    AadhaarNumber = Column(Integer, unique=True , nullable=False)
    PanCardNumber = Column(String , nullable=False)
    DriveLicence = Column(String , nullable=False)
    Aadress = Column(String , nullable=False)
    city = Column(String , nullable=False)
    pincode = Column(Integer , nullable=False)
    Location = Column(String , nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class JObToDocument(Base):
    __tablename__ ="JObToDocument"

    id = Column(Integer , primary_key=True , index=True)
    JobType = Column(String , nullable=False)
    JobTitle = Column(String , nullable=False)
    Image = Column(String , nullable=False , default="null")
    JobExprince = Column(String , nullable=False)
    Skill = Column(String , nullable=False)
    MinSalary = Column(Integer , nullable=False)
    MaxSalary = Column(Integer , nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class friendRequestModel(Base):
    __tablename__ = "friendRequest"
    
    user_id = Column(Integer , primary_key=True , nullable=False)

    sender = Column(Integer , ForeignKey("users.user_id") , nullable=False)
    recipient = Column(Integer , ForeignKey("users.user_id") , nullable=False)
    status = Column(Enum("pending" , "accepted" , "declined", name="status_enum") , default="pending")   

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


