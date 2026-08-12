from fastapi import APIRouter
from app.controller.reviews_controller import ReviewsController

router = APIRouter(prefix="/rider/reviews", tags=["Reviews"])

@router.get("")
def get_reviews():
    return ReviewsController.get_reviews()

@router.get("/{id}")
def get_review_by_id():
    return ReviewsController.get_review_by_id()

@router.post("/respond")
def respond_review():
    return ReviewsController.respond_review()
