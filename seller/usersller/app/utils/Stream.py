import os
from stream_chat import StreamChat
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

STREAM_API_KEY = os.getenv("STREAM_API_KEY", "your_stream_api_key")
STREAM_API_SECRET = os.getenv("STREAM_API_SECRET", "your_stream_api_secret")

def get_stream_client() -> StreamChat:
    """
    Initializes and returns the StreamChat client.
    Ensure STREAM_API_KEY and STREAM_API_SECRET are set in your .env file.
    """
    return StreamChat(api_key=STREAM_API_KEY, api_secret=STREAM_API_SECRET)

chat_client = get_stream_client()

async def upsertStreamUser(userData):
    try:
        # StreamChat SDK methods in Python use snake_case and are synchronous
        chat_client.upsert_users(userData)
        return userData
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Error upserting Stream User: {str(error)}"
        )

async def generatebStreamToken(userId):
    try:
        user_id_str = str(userId)
        # create_token generates a user token synchronously
        return chat_client.create_token(user_id_str)
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating Stream token: {str(error)}"
        )
