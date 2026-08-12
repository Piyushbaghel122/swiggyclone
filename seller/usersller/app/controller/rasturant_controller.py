from os import getenv 
from fastapi import HTTPException, status, Response, Request, Depends
import jwt 
from datetime import datetime
from sqlalchemy.orm import Session
from app.core.database import get_db

from app.models.rasturant_models import (
    menuCategoryDB, reastaurantNameDB, createReastaurantDB, WorkweeklySchudleDB, ShopOpenAndClose, createJobDb
)
from app.schemas.rasturant_schemas import (
    reasturant_name_create, menucategory_create, WorkweeklySchudleSchema, ShopOpenAndCloseSchema, createJob,
    CreateRestaurantRequest, WorkweeklySchudleRequest, ShopOpenAndCloseRequest, UpdateMenuItemRequest
)
from app.core.redis import redis_client

async def createReastaurant(data: CreateRestaurantRequest, request: Request, response: Response, db: Session = Depends(get_db)):   
    try:
        token = request.cookies.get("token") or request.headers.get("Authorization")
        if token and token.startswith("Bearer "):
            token = token.split(" ", 1)[1].strip()
            
        if not token:
            raise HTTPException(status_code=401, detail="Not authenticated")
        
        try:
            payload = jwt.decode(token, getenv("JWT_SECRET", "secret_key"), algorithms=["HS256"])
            user_id = payload.get("user_id")
            if not user_id:
                raise HTTPException(status_code=401, detail="Invalid token payload")
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token has expired")
        except jwt.PyJWTError:
            raise HTTPException(status_code=401, detail="Invalid token")

        required_fields = [
            ("reastaurantNameOwner", data.reastaurantNameOwner),
            ("reastaurantName", data.reastaurantName),
            ("reastaurantDescription", data.reastaurantDescription),
            ("reastaurantImage", data.reastaurantImage),
            ("reastaurantLocation", data.reastaurantLocation),
            ("reastaurantPincode", data.reastaurantPincode),
            ("reastaurantAddress", data.reastaurantAddress),
            ("reastaurantMobileNumber", data.reastaurantMobileNumber),
            ("reastaurantType", data.reastaurantType),
        ]
        
        missing_fields = [field for field, value in required_fields if not value]

        if missing_fields:
            response.status_code = 400
            return {
                "message": "All fields are required",
                "missingFields": missing_fields
            }

        user = db.query(createReastaurantDB).filter(createReastaurantDB.user_id == user_id).first()
        if user:
            raise HTTPException(status_code=400, detail="user already exists")
         
        new_reastautarant = createReastaurantDB(
            user_id = user_id,
            reastaurantNameOwner = data.reastaurantNameOwner,
            reastaurantName = data.reastaurantName,
            reastaurantDescription = data.reastaurantDescription,
            reastaurantImage = data.reastaurantImage,
            reastaurantLocation = data.reastaurantLocation,
            reastaurantPincode = data.reastaurantPincode,
            reastaurantAddress = data.reastaurantAddress,
            reastaurantMobileNumber = data.reastaurantMobileNumber,
            reastaurantType = data.reastaurantType
         )
         
        db.add(new_reastautarant)
        db.commit()
        db.refresh(new_reastautarant)
     
        token = jwt.encode({"id": str(new_reastautarant.id)}, getenv("JWT_SECRET", "my_secret_key"), algorithm="HS256")
        response.set_cookie("token", token, httponly=True, max_age=3600)
        await redis_client.set(str(new_reastautarant.id), token, ex=3600)

        return {
            "message": "Reastaurant created successfully",
            "data": {
                "id": new_reastautarant.id,
                "user_id": new_reastautarant.user_id,
                "reastaurantNameOwner": new_reastautarant.reastaurantNameOwner,
                "reastaurantName": new_reastautarant.reastaurantName,
                "reastaurantDescription": new_reastautarant.reastaurantDescription,
                "reastaurantImage": new_reastautarant.reastaurantImage,
                "reastaurantLocation": new_reastautarant.reastaurantLocation,
                "reastaurantPincode": new_reastautarant.reastaurantPincode,
                "reastaurantAddress": new_reastautarant.reastaurantAddress,
                "reastaurantMobileNumber": new_reastautarant.reastaurantMobileNumber,
                "reastaurantType": new_reastautarant.reastaurantType

            },
            "status_code": 201
        }
    except HTTPException as he:
        raise he
    except Exception as error:
        raise HTTPException(status_code=500 , detail=str(error))

async def getReastaurantDashboard(request:Request , db: Session = Depends(get_db)):
    try:
        token = request.cookies.get("token")
        if not token:
            raise HTTPException(status_code=401, detail="Not authenticated")
        
        payload = jwt.decode(token, getenv("JWT_SECRET", "my_secret_key"), algorithms=["HS256"])
        user_id = payload.get("id")
        
        reastaurant = db.query(createReastaurantDB).filter(createReastaurant.user_id == user_id).first(); 
        if not reastaurant:
            raise HTTPException(status_code=404, detail="reast not found ")
      
        return {
            "message": "reastaurant retrived successfully",
            "data": {
                "id": reastaurant.id,
                "user_id": reastaurant.user_id,
                "reastaurantName": reastaurant.reastaurantName,
                "reastaurantImage": reastaurant.reastaurantImage,
                "reastaurantLocation": reastaurant.reastaurantLocation,
                "reastaurantPincode": reastaurant.reastaurantPincode,
            }, 
            "status_code": 200
        }
    except HTTPException as he:
        raise he
    except Exception as error:
        raise HTTPException(status_code=500 , detail=str(error))



async def getReastaurant(request: Request, db: Session = Depends(get_db)):
    try: 
        token = request.cookies.get("token")
        if not token:
            raise HTTPException(status_code=401, detail="Not authenticated")
        
        payload = jwt.decode(token, getenv("JWT_SECRET", "my_secret_key"), algorithms=["HS256"])
        user_id = payload.get("id")

        restaurant = db.query(createReastaurantDB).filter(createReastaurantDB.user_id == user_id).first()
        if not restaurant:
            raise HTTPException(status_code=404, detail="Restaurant not found")

        return {
            "message": "Restaurant retrieved successfully",
            "data": {
                "id": restaurant.id,
                "user_id": restaurant.user_id,
                "reastaurantNameOwner": restaurant.reastaurantNameOwner,
                "reastaurantName": restaurant.reastaurantName,
                "reastaurantDescription": restaurant.reastaurantDescription,
                "reastaurantImage": restaurant.reastaurantImage,
                "reastaurantLocation": restaurant.reastaurantLocation,
                "reastaurantPincode": restaurant.reastaurantPincode,
                "reastaurantAddress": restaurant.reastaurantAddress,
                "reastaurantMobileNumber": restaurant.reastaurantMobileNumber,
                "reastaurantType": restaurant.reastaurantType
            },
            "status_code": 200
        }
    except HTTPException as he:
        raise he
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))
async def WorkweeklySchudle(data: WorkweeklySchudleRequest, request: Request, db: Session = Depends(get_db)):
    try:
        token = request.cookies.get("token")
        if not token:
            raise HTTPException(status_code=401, detail="Not authenticated")
        
        payload = jwt.decode(token, getenv("JWT_SECRET", "my_secret_key"), algorithms=["HS256"])
        user_id = payload.get("id")

        existing_schedule = db.query(WorkweeklySchudleDB).filter(WorkweeklySchudleDB.user_id == user_id).first()
        if existing_schedule:
            existing_schedule.sunday = data.sunday
            existing_schedule.monday = data.monday
            existing_schedule.tuesday = data.tuesday
            existing_schedule.wednesday = data.wednesday
            existing_schedule.thrusday = data.thursday
            existing_schedule.friday = data.friday
            existing_schedule.saturday = data.saturday
        else:
            new_schedule = WorkweeklySchudleDB(
                user_id=user_id,
                sunday=data.sunday,
                monday=data.monday,
                tuesday=data.tuesday,
                wednesday=data.wednesday,
                thrusday=data.thursday,
                friday=data.friday,
                saturday=data.saturday
            )
            db.add(new_schedule)
        db.commit()

        return {"message": "Work week schedule updated successfully", "status_code": 200}
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

async def OpenAndClose(data: ShopOpenAndCloseRequest, request: Request, db: Session = Depends(get_db)):
    try:
        token = request.cookies.get("token")
        if not token:
            raise HTTPException(status_code=401, detail="Not authenticated")
        
        payload = jwt.decode(token, getenv("JWT_SECRET", "my_secret_key"), algorithms=["HS256"])
        user_id = payload.get("id")

        existing_shop_time = db.query(ShopOpenAndClose).filter(ShopOpenAndClose.user_id == user_id).first()
        if existing_shop_time:
            existing_shop_time.open = data.open
            existing_shop_time.close = data.close
        else:
            new_shop_time = ShopOpenAndClose(
                user_id=user_id,
                open=data.open,
                close=data.close
            )
            db.add(new_shop_time)
        db.commit()

        return {"message": "Shop opening and closing times updated successfully", "status_code": 200}
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

async def menu_category(data: menucategory_create, response: Response, db: Session = Depends(get_db)):
    try: 

        user = db.query(reastaurantNameDB).filter(reastaurantNameDB.user_id == data.user_id).first()
        
        if not user:
            raise HTTPException(status_code=404, detail="user not found")

        category = db.query(menuCategoryDB).filter(menuCategoryDB.user_id == data.user_id, menuCategoryDB.FoodName == data.FoodName).first()
        if category:
            raise HTTPException(status_code=400, detail="category already exists")

        new_category = menuCategoryDB(
          user_id = data.user_id,
          FoodImage = data.FoodImage,
          FoodName = data.FoodName,
          FoodPirce = data.FoodPirce,   
          FoodDiscription = data.FoodDiscription,
          FoodType = data.FoodType, 
          FoodTime = data.FoodTime
         )
        db.add(new_category)
        db.commit()
        db.refresh(new_category)

        token = jwt.encode({"id": str(new_category.id)}, getenv("JWT_SECRET", "my_secret_key"), algorithm="HS256")

        response.set_cookie("token", token, httponly=True, max_age=3600)

        await redis_client.set(str(new_category.id), token, ex=3600)

        return {
            "message": "Category created successfully",  
            "data": {
                "id": new_category.id,
                "user_id": new_category.user_id,
                "FoodImage": new_category.FoodImage,
                "FoodName": new_category.FoodName,
                "FoodPirce": new_category.FoodPirce,
                "FoodDiscription": new_category.FoodDiscription,
                "FoodType": new_category.FoodType,
                "FoodTime": new_category.FoodTime
            },
            "status_code": 201
        }
    except HTTPException as he:
        raise he
    except Exception as error:
        raise HTTPException(status_code=500 , detail=str(error))

async def updateMenuItem(data: UpdateMenuItemRequest, response: Response, db: Session = Depends(get_db)):
    try:
        user = db.query(menuCategoryDB).filter(menuCategoryDB.user_id == data.user_id, menuCategoryDB.id == data.id).first()
        if not user:
            raise HTTPException(status_code=404, detail="Menu item not found")
        user.FoodImage = data.FoodImage
        user.FoodName = data.FoodName
        user.FoodPirce = data.FoodPirce
        user.FoodDiscription = data.FoodDiscription
        user.FoodType = data.FoodType
        user.FoodTime = data.FoodTime
        db.commit()
        db.refresh(user)
        return {
            "message": "Menu item updated successfully",
            "data": {
                "id": user.id,
                "user_id": user.user_id,
                "FoodImage": user.FoodImage,
                "FoodName": user.FoodName,
                "FoodPirce": user.FoodPirce,
                "FoodDiscription": user.FoodDiscription,
                "FoodType": user.FoodType,
                "FoodTime": user.FoodTime
            },
            "status_code": 200
        }
    except HTTPException as he:
        raise he
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

def menu_item(user_id: str, req: Request, id: int = None, db: Session = Depends(get_db)):

    try:
        if id:
            items = db.query(menuCategoryDB).filter(menuCategoryDB.user_id == user_id, menuCategoryDB.id == id).all()
        else:
            items = db.query(menuCategoryDB).filter(menuCategoryDB.user_id == user_id).all()
            
        if not items:
            return {"message": "Menu item(s) not found", "data": [], "status_code": 404}
            
        serialized_items = [
            {
                "id": item.id,
                "user_id": item.user_id,
                "FoodImage": item.FoodImage,
                "FoodName": item.FoodName,
                "FoodPirce": item.FoodPirce,
                "FoodDiscription": item.FoodDiscription,
                "FoodType": item.FoodType,
                "FoodTime": item.FoodTime
            }
            for item in items
        ]
                    
        return {"message": "Menu item(s) fetched successfully", "data": serialized_items, "status_code": 200}
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

async def deleteMenuItem(user_id: str, response:Response , id:int , db:Session=Depends(get_db)):
    try:
      user = db.query(menuCategoryDB).filter(menuCategoryDB.user_id == user_id, menuCategoryDB.id == id).first()
      if not user:
        raise HTTPException(status_code=404, detail="Menu item not found")
      db.delete(user)
      db.commit()
      return {
          "message": "Menu item deleted successfully",
          "data": {
              "id": user.id,
              "user_id": user.user_id,
              "FoodImage": user.FoodImage,
              "FoodName": user.FoodName,
              "FoodPirce": user.FoodPirce,
              "FoodDiscription": user.FoodDiscription,
              "FoodType": user.FoodType,
              "FoodTime": user.FoodTime
          },
          "status_code": 200
      }
    except HTTPException as he:
        raise he
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

async def createJob( data:createJob , response:Response , db:Session = Depends(get_db)):
    try:
        user = db.query(createJobDb).filter(createJobDb.user_id == data.user_id).first()
        if user:
            raise HTTPException(status_code=400, detail="user already has a job")

        new_job = createJobDb(
            user_id = data.user_id,
            job_title = data.job_title,
            job_workyour = data.job_workyour,
            job_type = data.job_type,
            job_salary = data.job_salary,
            job_location = data.job_location, 
            job_selectorType = data.job_selectorType, 
            job_experience = data.job_experience,
            job_lastCompany = data.job_lastCompany,
            job_firstCompany = data.job_firstCompany
        )

        db.add(new_job)
        db.commit()
        db.refresh(new_job)

        token = jwt.encode({"id": str(new_job.id)}, getenv("JWT_SECRET", "my_secret_key"), algorithm="HS256")

        response.set_cookie("token", token, httponly=True, max_age=3600)

        await redis_client.set(str(new_job.id), token, ex=3600)

        return {
            "message": "Job created successfully",  
            "data":{
                "id": new_job.id,
                "user_id": new_job.user_id,
                "job_title": new_job.job_title,
                "job_workyour": new_job.job_workyour,
                "job_type": new_job.job_type,
                "job_salary": new_job.job_salary,
                "job_location": new_job.job_location,
                "job_selectorType": new_job.job_selectorType, 
                "job_experience": new_job.job_experience,
                "job_lastCompany": new_job.job_lastCompany,
                "job_firstCompany": new_job.job_firstCompany
            },
            "status_code": 201
        }
    except HTTPException as he:
        raise he
    except Exception as error:
        raise HTTPException(status_code=500 , detail=str(error))


async def get_job(user_id:str , db:Session = Depends(get_db)):
    try:
        user = db.query(createJobDb).filter(createJobDb.user_id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="user not found")
        return {
            "message": "Job fetched successfully",
            "data": {
                "id": user.id,
                "user_id": user.user_id,
                "job_title": user.job_title,
                "job_workyour": user.job_workyour,
                "job_type": user.job_type,
                "job_salary": user.job_salary,
                "job_location": user.job_location, 
                "job_selectorType": user.job_selectorType, 
                "job_experience": user.job_experience,
                "job_lastCompany": user.job_lastCompany,
                "job_firstCompany": user.job_firstCompany
            },
            "status_code": 200
        }
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))


#  Docment in Food Cut 












# all job for the rasturant --> delivery , unmaried , maried , 
#1 . delivery  --> 
#2 . T-shirt in reastautarant in online 
#3 . study ke liya in used 12 , in college student --> college id proof , 12 passout proof 
#4 . 


async def getAllJob(db:Session = Depends(get_db)):
    try:
        user = db.query(createJobDb).all()
        if not user:
            raise HTTPException(status_code=404, detail="user not found")
        return {
            "message": "Job fetched successfully",
            "data": {
                "id": user.id,
                "user_id": user.user_id,
                "job_title": user.job_title,
                "job_workyour": user.job_workyour,
                "job_type": user.job_type,
                "job_salary": user.job_salary,
                "job_location": user.job_location, 
                "job_selectorType": user.job_selectorType, 
                "job_experience": user.job_experience,
                "job_lastCompany": user.job_lastCompany,
                "job_firstCompany": user.job_firstCompany
            },
            "status_code": 200
        }
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

async def applyJob(db:Session=Depends(get_db)):
    try:
        pass
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))