from fastapi import FastAPI, Response, HTTPException 
from app.core.database import engine, Base 
from app.core.redis import redis_client
from app.router.authRouter import auth_router 
from app.router.ride_router import router  
# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Ride Backend API")

app.include_router(auth_router(), prefix="/auth")

from app.router.index import main_rider_router
app.include_router(main_rider_router)

@app.get("/")
def main():
    return Response(content="hello world")