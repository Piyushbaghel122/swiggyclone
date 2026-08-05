from sqlalchemy import Column, Integer, String , Float , DateTime
from app.core.database import Base
from sqlalchemy.sql import func , DateTime


class Rider(Base):
    __tablename__ = "riders"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    Status = Column(String(20))
