from os import getenv

import jwt
from fastapi import Request, HTTPException, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User, Blacklist


JWT_SECRET = getenv("JWT_SECRET")

if not JWT_SECRET:
    raise RuntimeError("JWT_SECRET is not configured")


def auth_middleware(
    request: Request,
    db: Session = Depends(get_db),
) -> User:

    # 1. Get token from cookie
    token = request.cookies.get("token")

    # 2. If cookie token doesn't exist, check Authorization header
    if not token:
        authorization = request.headers.get("Authorization")

        if authorization:
            if not authorization.startswith("Bearer "):
                raise HTTPException(
                    status_code=401,
                    detail="Invalid Authorization header"
                )

            token = authorization.split(" ", 1)[1].strip()

    # 3. Token missing
    if not token:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized"
        )

    # 3.5 Check if token is blacklisted
    is_blacklisted = db.query(Blacklist).filter(Blacklist.token == token).first()
    if is_blacklisted:
        raise HTTPException(
            status_code=401,
            detail="Token has been logged out/blacklisted"
        )

    # 4. Decode JWT
    try:
        payload = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=["HS256"]
        )

    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=401,
            detail="Token expired"
        )

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    # 5. Get user ID
    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Invalid token payload"
        )

    # 6. Find user
    user = (
        db.query(User)
        .filter(User.user_id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # 7. Attach user to request
    request.state.user = user

    # 8. Return user
    return user