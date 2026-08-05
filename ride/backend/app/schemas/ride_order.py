from pydantic import BaseModel

class RejectOrder(BaseModel):
    reason: str
