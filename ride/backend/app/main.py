from fastapi import FastAPI, Response, HTTPException
from app.core.database import engine, Base 
from app.core.redis import redis_client
from app.router.authRouter import auth_router


# Create database tables
Base.metadata.create_all(bind=engine)

# cookie_parser


app = FastAPI(title="Ride Backend API")

app.include_router(auth_router(), prefix="/auth")

@app.get("/")
def main():
    return Response(content="hello world")