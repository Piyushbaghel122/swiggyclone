import json
import urllib.parse
import urllib.request
from urllib.error import HTTPError
from os import getenv
from fastapi import HTTPException

def get_github_auth_url() -> str:
    client_id = getenv("GITHUB_CLIENT_API_KEY") or getenv("GITHUB_CLIENT_ID")
    redirect_uri = getenv("GITHUB_REDIRECT_URL", "http://localhost:8002/auth/github/callback")
    
    if not client_id:
        raise HTTPException(status_code=500, detail="GITHUB_CLIENT_API_KEY is not set in environment variables")

    params = {
        "client_id": client_id,
        "redirect_uri": redirect_uri,
        "scope": "user:email",
        "allow_signup": "true"
    }
    query_string = urllib.parse.urlencode(params)
    return f"https://github.com/login/oauth/authorize?{query_string}"


def exchange_code_for_github_user(code: str) -> dict:
    client_id = getenv("GITHUB_CLIENT_API_KEY") or getenv("GITHUB_CLIENT_ID")
    client_secret = getenv("GITHUB_SECRET_API_KEY") or getenv("GITHUB_CLIENT_SECRET")
    redirect_uri = getenv("GITHUB_REDIRECT_URL", "http://localhost:8002/auth/github/callback")

    if not client_id or not client_secret:
        raise HTTPException(status_code=500, detail="GitHub client credentials are not configured in environment variables")

    token_url = "https://github.com/login/oauth/access_token"
    data = urllib.parse.urlencode({
        "client_id": client_id,
        "client_secret": client_secret,
        "code": code,
        "redirect_uri": redirect_uri
    }).encode("utf-8")

    req = urllib.request.Request(token_url, data=data, method="POST")
    req.add_header("Accept", "application/json")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    req.add_header("User-Agent", "SwiggySellerApp")

    try:
        with urllib.request.urlopen(req) as response:
            token_res = json.loads(response.read().decode("utf-8"))
    except HTTPError as e:
        err_msg = e.read().decode("utf-8", errors="ignore")
        raise HTTPException(status_code=400, detail=f"Failed to exchange GitHub authorization code: {err_msg}")

    if "error" in token_res:
        raise HTTPException(status_code=400, detail=f"GitHub OAuth error: {token_res.get('error_description', token_res.get('error'))}")

    access_token = token_res.get("access_token")
    if not access_token:
        raise HTTPException(status_code=400, detail="No access token returned from GitHub")

    return get_github_user_info_from_token(access_token)


def get_github_user_info_from_token(token: str) -> dict:
    userinfo_url = "https://api.github.com/user"
    req = urllib.request.Request(userinfo_url, method="GET")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("User-Agent", "SwiggySellerApp")

    try:
        with urllib.request.urlopen(req) as response:
            user_data = json.loads(response.read().decode("utf-8"))
    except HTTPError as e:
        err_msg = e.read().decode("utf-8", errors="ignore")
        raise HTTPException(status_code=401, detail=f"Invalid GitHub token: {err_msg}")

    # If email is null or private, fetch from /user/emails
    if not user_data.get("email"):
        emails_url = "https://api.github.com/user/emails"
        req_emails = urllib.request.Request(emails_url, method="GET")
        req_emails.add_header("Authorization", f"Bearer {token}")
        req_emails.add_header("Accept", "application/vnd.github+json")
        req_emails.add_header("User-Agent", "SwiggySellerApp")
        try:
            with urllib.request.urlopen(req_emails) as response_emails:
                emails_list = json.loads(response_emails.read().decode("utf-8"))
                for email_obj in emails_list:
                    if email_obj.get("primary") and email_obj.get("verified"):
                        user_data["email"] = email_obj.get("email")
                        break
                if not user_data.get("email") and len(emails_list) > 0:
                    user_data["email"] = emails_list[0].get("email")
        except Exception:
            pass

    if not user_data.get("email"):
        raise HTTPException(status_code=400, detail="Could not retrieve email address from GitHub account")

    return {
        "email": user_data["email"],
        "name": user_data.get("name") or user_data.get("login") or user_data["email"].split("@")[0],
        "sub": str(user_data.get("id"))
    }
