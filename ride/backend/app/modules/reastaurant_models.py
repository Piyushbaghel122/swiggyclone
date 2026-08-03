from pydantic import BaseModel, Field
from typing import Literal, Optional
from datetime import datetime

class RestaurantOnboardingModel(BaseModel):
    """
    Pydantic Model for Restaurant Onboarding (MongoDB Document)
    This acts as our schema definition since PyMongo doesn't enforce schemas.
    """
    restaurant_name: str
    location: str 
    logo_url: Optional[str] = None
    
    status: Literal["Active", "Pending", "Suspended"] = "Pending"

    compliance_checklist: str

    date_added: datetime = Field(default_factory=datetime.utcnow)

    class Config:
    
        json_schema_extra = {
            "example": {
                "restaurant_name": "The Golden Whisk",
                "location": "Urban District, BLR",
                "status": "Pending", ""
                "compliance_checklist": "2/3 Done"
            }
        }

