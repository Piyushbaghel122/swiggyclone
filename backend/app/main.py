from fastapi import FastAPI
from app.routers import auth_router, user_router
from app.core.database import engine, Base
from app.models import user
from app.core.redis import redis_client

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth_router.router)
app.include_router(user_router.AUTHRouter, prefix="/api/auth")

@app.get("/")
def root(): 
    return {"message": "API is running"}
