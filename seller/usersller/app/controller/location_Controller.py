from sqlalchemy.orm import Session
from fastapi import HTTPException , Depends
from app.models.loction_models import LocationDB , ReastaurantLocation
from app.schemas.location_schemas import LocationCreate, LocationUpdate, LocationResponse ,  RestaurantLocationCreate 
from typing import List 

from app.core.database import get_db

def get_user_locations(db: Session, user_id: int) -> List[LocationDB]:
    return db.query(LocationDB).filter(LocationDB.user_id == user_id).all()

def save_location(db: Session, location: LocationCreate, user_id: int) -> LocationDB:
    # If is_default is true, unset other defaults
    if location.is_default:
        db.query(LocationDB).filter(LocationDB.user_id == user_id).update({"is_default": False})
    
    db_location = LocationDB(
        user_id=user_id,
        label=location.label,
        address=location.address,
        city=location.city,
        state=location.state,
        country=location.country,
        postal_code=location.postal_code,
        latitude=location.latitude,
        longitude=location.longitude,
        place_id=location.place_id,
        is_default=location.is_default
    )
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location

def set_default_location(db: Session, location_id: int, user_id: int) -> LocationDB:
    location = db.query(LocationDB).filter(LocationDB.id == location_id, LocationDB.user_id == user_id).first()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
        
    # Unset others
    db.query(LocationDB).filter(LocationDB.user_id == user_id).update({"is_default": False})
    
    # Set this one
    location.is_default = True
    db.commit()
    db.refresh(location)
    return location

def delete_location(db: Session, location_id: int, user_id: int):
    location = db.query(LocationDB).filter(LocationDB.id == location_id, LocationDB.user_id == user_id).first()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    db.delete(location)
    db.commit()
    return {"success": True, "message": "Location deleted"}

def create_restaurant_location(location:RestaurantLocationCreate, restaurant_id: str, db: Session = Depends(get_db)):
    existUser = db.query(ReastaurantLocation).filter(ReastaurantLocation.restaurant_id == restaurant_id).first()
    if existUser:
        raise HTTPException(status_code=400, detail="Location already exists")
    
    db_location = ReastaurantLocation(
        restaurant_id=restaurant_id,
        address=location.address,
        city=location.city,
        state=location.state,
        country=location.country,
        postal_code=location.postal_code,
        latitude=location.latitude,
        longitude=location.longitude,
        delivery_radius=location.delivery_radius
    )
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location
