from sqlalchemy import Column , Integer , String 
from database import base 

class Order(Base):
    __tablename__ = "orders"

id = Column(Integer , primary_key=True , index=True)
customer_id = Column(Integer)
reastaurant_id = Cloumn(Integer)

rider_id = Cloumn(Integer ,Foregin_key("riders_id") , nullable)

status = cloumn(
    String(50),
    default="avaliable"
)

