from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import user_router, user_profile, payment_router
from app.core.database import engine, Base
from app.models import user
from app.core.redis import redis_client

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ],
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router.AUTHRouter, prefix="/api/auth")
app.include_router(user_profile.UserProfileRouter, prefix="/user")
app.include_router(payment_router.PaymentRouter, prefix="/api/payment")

@app.get("/")
def root(): 
    return {"message": "API is running"}
