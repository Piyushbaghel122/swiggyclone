from pydantic import BaseModel 
from typing import Optional
from datetime import datetime, time

class reasturant_name_create(BaseModel):
    id: str
    user_id: str
    username : str

class menucategory_create(BaseModel):
    user_id: int
    FoodImage : str
    FoodName : str
    FoodPirce : int
    FoodDiscription : str
    FoodType : str
    FoodTime : str

class UpdateMenuItemRequest(BaseModel):
    id: int
    user_id: int
    FoodImage : str
    FoodName : str
    FoodPirce : int
    FoodDiscription : str
    FoodType : str
    FoodTime : str

class CreateRestaurantRequest(BaseModel):
    reastaurantNameOwner: str
    reastaurantName: str
    reastaurantDescription: str
    reastaurantImage: str
    reastaurantLocation: str
    reastaurantPincode: int
    reastaurantAddress: str
    reastaurantMobileNumber: int
    reastaurantType: str

class createReastaurantDB(BaseModel): 
    id: Optional[int] = None
    user_id: int
    reastaurantNameOwner: str
    reastaurantName: str
    reastaurantDescription: str
    reastaurantImage: str
    reastaurantLocation: str
    reastaurantPincode: int
    reastaurantAddress: str
    reastaurantMobileNumber: int
    reastaurantType: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class WorkweeklySchudleRequest(BaseModel):
    sunday: str
    monday: str
    tuesday: str
    wednesday: str
    thursday: str
    friday: str
    saturday: str

class WorkweeklySchudleSchema(BaseModel):
    id: Optional[int] = None
    sunday: str
    monday: str
    tuesday: str
    wednesday: str
    thrusday: str
    friday: str
    saturday: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class ShopOpenAndCloseRequest(BaseModel):
    open: str
    close: str

class ShopOpenAndCloseSchema(BaseModel):
    id: Optional[int] = None
    OpenShop: time
    CloseShop: time

class createJob(BaseModel):
    id: Optional[int] = None
    user_id: int
    job_title: str
    job_workyour: str
    job_type: str
    job_salary: str
    job_location: str 
    job_selectorType: str 
    job_experience: str
    job_lastCompany: str
    job_firstCompany: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
