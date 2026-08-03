from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from app.core.database  import engine
from app.routers import auth_router, imagekit_router, kyc_router, location_router
from app.core.redis import redis_client
app = FastAPI()

@app.on_event("startup")
async def start_services():
    try: 
        await redis_client.ping()
        print("Redis connected successfully")
        await engine.connect()
        print("Services started successfully")
    except Exception as err:
        print(err, "error")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(imagekit_router.router)
app.include_router(kyc_router.router)
app.include_router(location_router.router)
@app.get("/")
def index():
     return "hello world"

