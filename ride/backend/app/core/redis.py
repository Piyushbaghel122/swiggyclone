import redis 
from os import getenv


redis_client = redis.from_url(getenv("REDIS_URL"))
try: 
    if redis_client.ping():
        print("redis connceted successfully")
except Exception as error: 
    print("error" , error)