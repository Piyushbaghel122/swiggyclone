from os import getenv 
from fastapi import HTTPException, status, Response, Request
import jwt 
from datetime import datetime
from app.core.database import db

from app.models.rasturant_models import restaurantNameDB
from app.schemas.rasturant_schemas import reasturant_name_create, restaurantMobile, WorkweekschudleDB
from app.core.redis import redis_client

async def createreastaurant(req: Request, res: Response):
    try:
        body = await req.json()
        username = body.get("username")
        if not username:
            raise HTTPException(status_code=400, detail="username is required")
    
        user = await restaurantNameDB.find_one({"username": username})
        if user: 
            raise HTTPException(status_code=400, detail="username already exists")

        new_restaurant = restaurantNameDB(
            username=username,
        )

        await new_restaurant.insert_one()
       
        token = jwt.encode({"user_id": str(new_restaurant.id)}, getenv("JWT_SECRET"), algorithm="HS256")
        redis_client.set("token", token, 3600)
        
        return {"message": "Restaurant created successfully", "token": token}
       
    except HTTPException as he:
        raise he
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

async def reasturantNumber(req: Request, res: Response):
    try:
        body = await req.json()
        mobile = body.get("mobile_number")
        if not mobile: 
            raise HTTPException(status_code=400, detail="mobile_number is required")

        user = await restaurantMobile.find_one({"mobile_number": mobile})
        if user:  
            raise HTTPException(status_code=400, detail="user mobile already exists")  
    
        restaurantmobile = restaurantMobile(
            mobile=mobile,
        )
        await restaurantmobile.insert_one()

        token = jwt.encode({"mobile_number": mobile}, getenv("JWT_SECRET"), algorithm="HS256")
        res.set_cookie('token', token, httponly=True, max_age=3600)
        
        return {"message": "Restaurant created successfully", "status_code": 201}
 
    except HTTPException as he:
        raise he
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

async def workweekreastaurant(req: Request, res: Response):
    try: 
        body = await req.json()
        workweek = body.get("workweek")
        if not workweek: 
            raise HTTPException(status_code=400, detail="workweek is required")

        new_workweek = WorkweekschudleDB(
            monday=workweek.get("monday"),
            tuesday=workweek.get("tuesday"),
            wednesday=workweek.get("wednesday"),
            thursday=workweek.get("thursday"),
            friday=workweek.get("friday"),
            saturday=workweek.get("saturday"),
            sunday=workweek.get("sunday"),
        )
        
        await new_workweek.insert_one()
        
        token = jwt.encode({"id": str(new_workweek.id)}, getenv("JWT_SECRET"), algorithm="HS256")
        res.set_cookie("token", token, httponly=True, max_age=3600)
        
        redis_client.set(str(new_workweek.id), token, 3600)
        
        return {"message": "Workweek schedule created successfully", "token": token, "status_code": 201}

    except HTTPException as he:
        raise he
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

async def 