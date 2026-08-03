from pydantic import BaseModel
from typing import Optional
from datetime import datetime 


class orderList(BaseModel):
    reastaurantName : str
    Status: str
    
    

