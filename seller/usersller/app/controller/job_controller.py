from fastapi import HTTPException , Response , Depends 
from jose import jwt
from dotenv import load_dotenv
from os import getenv

from app.models.User import JobToDocument , DocumentJob , friendRequestModel , user_friends

