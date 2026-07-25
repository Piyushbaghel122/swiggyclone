from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth_router, user_router
from app.core.database import engine, Base
from app.models import user
from app.core.redis import redis_client

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(user_router.AUTHRouter, prefix="/auth")

@app.get("/")
def root(): 
    return {"message": "API is running"}
