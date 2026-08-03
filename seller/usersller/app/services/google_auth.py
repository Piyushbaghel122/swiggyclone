import json
import urllib.parse
import urllib.request
from urllib.error import HTTPError
from os import getenv
from fastapi import HTTPException

def get_google_auth_url() -> str:
    client_id = getenv("GOOGLE_CLIENT_ID")
    redirect_uri = getenv("GOOGLE_REDIRECT_URI", getenv("GOOGLE_Redirect_URI", "http://localhost:8000/callback"))
    
    if not client_id:
        raise HTTPException(status_code=500, detail="GOOGLE_CLIENT_ID is not set in environment variables")

    params = {
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "consent"
    }
    query_string = urllib.parse.urlencode(params)
    return f"https://accounts.google.com/o/oauth2/v2/auth?{query_string}"

def exchange_code_for_user_info(code: str) -> dict:
    client_id = getenv("GOOGLE_CLIENT_ID")
    client_secret = getenv("GOOGLE_CLIENT_SECRET")
    redirect_uri = getenv("GOOGLE_REDIRECT_URI", getenv("GOOGLE_Redirect_URI", "http://localhost:8000/callback"))

    if not client_id or not client_secret:
        raise HTTPException(status_code=500, detail="Google client credentials are not configured in environment variables")

    token_url = "https://oauth2.googleapis.com/token"
    data = urllib.parse.urlencode({
        "client_id": client_id,
        "client_secret": client_secret,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": redirect_uri
    }).encode("utf-8")

    req = urllib.request.Request(token_url, data=data, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")

    try:
        with urllib.request.urlopen(req) as response:
            token_res = json.loads(response.read().decode("utf-8"))
    except HTTPError as e:
        err_msg = e.read().decode("utf-8", errors="ignore")
        raise HTTPException(status_code=400, detail=f"Failed to exchange Google authorization code: {err_msg}")

    access_token = token_res.get("access_token")
    if not access_token:
        raise HTTPException(status_code=400, detail="No access token returned from Google")

    return get_user_info_from_token(access_token)

def get_user_info_from_token(token: str) -> dict:
    userinfo_url = f"https://www.googleapis.com/oauth2/v3/userinfo?access_token={token}"
    req = urllib.request.Request(userinfo_url, method="GET")
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode("utf-8"))
    except HTTPError:
        # Fallback: try ID token verification endpoint if an id_token was supplied
        id_token_url = f"https://oauth2.googleapis.com/tokeninfo?id_token={token}"
        req2 = urllib.request.Request(id_token_url, method="GET")
        try:
            with urllib.request.urlopen(req2) as response:
                return json.loads(response.read().decode("utf-8"))
        except HTTPError as e2:
            err_msg = e2.read().decode("utf-8", errors="ignore")
            raise HTTPException(status_code=401, detail=f"Invalid Google token: {err_msg}")
