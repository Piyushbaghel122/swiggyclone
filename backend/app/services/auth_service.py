from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.schemas.user import UserCreate
from app.repositories import user_repository
from app.utils.password import get_password_hash

def register_user(db: Session, user: UserCreate):
    # Check if user already exists
    db_user = user_repository.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Hash password
    hashed_password = get_password_hash(user.password)
    
    # Create user
    return user_repository.create_user(db=db, user=user, hashed_password=hashed_password)
