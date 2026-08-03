import redis.asyncio as redis
from os import getenv
from dotenv import load_dotenv

load_dotenv()

redis_client = redis.Redis(
    host=getenv("REDIS_HOST", "localhost"),
    port=int(getenv("REDIS_PORT", 6379)),
    db=0,
    decode_responses=True
)
