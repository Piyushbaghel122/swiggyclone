from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
from app.core.database  import engine
from app.routers import auth_router, imagekit_router, kyc_router, location_router
from app.core.redis import redis_client
from app.routers.rasturaant_router import routerReastaurant
from app.services.socket import start_socket_server

app = FastAPI()

@app.on_event("startup")
async def start_services():
    try: 
        await redis_client.ping()
        print("Redis connected successfully")
        
        # Initialize Kafka Producer
        from app.core.kafka_client import get_kafka_producer
        await get_kafka_producer()
        print("Kafka connected successfully")
        
        # Initialize RabbitMQ Connection
        from app.core.rabbitmq_client import get_rabbitmq_connection
        await get_rabbitmq_connection()
        print("RabbitMQ connected successfully")
        
        print("Services started successfully")
    except Exception as err:
        print(err, "error")

@app.on_event("shutdown")
async def shutdown_services():
    try:
        from app.core.kafka_client import close_kafka_producer
        await close_kafka_producer()
        print("Kafka connection closed")
        
        from app.core.rabbitmq_client import close_rabbitmq_connection
        await close_rabbitmq_connection()
        print("RabbitMQ connection closed")
    except Exception as err:
        print(err, "error during shutdown")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:8081", "http://127.0.0.1:3000", "http://127.0.0.1:3001", "http://127.0.0.1:3002"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router, prefix="/api/v1")
app.include_router(imagekit_router.router)
app.include_router(kyc_router.router)
app.include_router(location_router.router)
app.include_router(routerReastaurant, prefix="/api/v1")

start_socket_server(app)

@app.get("/")
def index():
     return "hello world"