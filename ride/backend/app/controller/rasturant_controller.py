from fastapi import HTTPException, Request, Header, Response, Depends
from pymongo.database import Database
from app.core.mongo_db import get_mongo_db
from app.schemas.reastuarant_schemas import orderList

def orderlist(request: Request, db: Database = Depends(get_mongo_db)):
    user = request.headers.get("x-user-id")
    if not user:
        raise HTTPException(status_code=401, detail="User ID header missing")
        
    # Example: Fetching orders from MongoDB using pymongo
    # orders_collection = db["orders"]
    # user_orders = list(orders_collection.find({"user_id": user}))
    
    return {"message": "Success", "user": user}