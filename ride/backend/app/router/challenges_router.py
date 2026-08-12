from fastapi import APIRouter
from app.controller.challenges_controller import ChallengesController

router = APIRouter(prefix="/rider/challenges", tags=["Challenges"])

@router.get("")
def get_challenges():
    return ChallengesController.get_challenges()

@router.post("/claim")
def claim_challenge():
    return ChallengesController.claim_challenge()
