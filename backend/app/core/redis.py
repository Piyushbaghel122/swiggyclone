import redis
import os



redis_client = redis.from_url("redis://localhost:6379")

try:
    if redis_client.ping():
        print("Redis connected successfully!")
except Exception as error:
    print("Error connecting to Redis:", error)
