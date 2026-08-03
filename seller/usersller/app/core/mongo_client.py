from pymongo import MongoClient
from os import getenv 


client = MongoClient(getenv("MONGODB_URL"))

try:
    client.admin.command('ping')
    print("Database connected successfully!")
except Exception as err:
    print(err, "error")