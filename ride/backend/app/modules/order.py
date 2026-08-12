from sqlalchemy import Column , Integer , String 
from database import base 

class Order(Base):
    __tablename__ = "orders"

id = Column(Integer , primary_key=True , index=True)
customer_id = Column(Integer , nullable=False)
reastaurant_id = Cloumn(Integer , nullable=False)
rider_id = Cloumn(Integer ,Foregin_key("riders_id") , nullable)
status = cloumn(String(50), default="avaliable")


class PickedOrder(Base):
    __tablename__ = "picked_orders"

    id = Column(Integer , primary_key=True , index=True)
    user = Column(Integer , Foregin_key("users_id") , nullable=False)
    order_id = Column(Integer , nullable=False)
    latitude = Column(Float , nullable=False)
    longitude = Column(Float , nullable=False)
    picked_at = Column(DateTime , nullable=False)


