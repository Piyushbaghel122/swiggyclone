from fastapi import APIRouter
from app.controller.ratings_controller import RatingsController

router = APIRouter(prefix="/rider/ratings", tags=["Ratings"])

@router.get("")
def get_ratings():
    return RatingsController.get_ratings()
