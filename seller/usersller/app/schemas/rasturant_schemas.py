from pydantic import BaseModel 
from typing import Optional
from datetime import datetime 

class reasturant_name_create(BaseModel):
      id: str
      user_id: str
      username : str