from fastapi import APIRouter
from app.router.status_router import router as status_router
from app.router.orders_router import router as orders_router
from app.router.pickup_router import router as pickup_router
from app.router.delivery_router import router as delivery_router
from app.router.location_router import router as location_router
from app.router.navigation_router import router as navigation_router
from app.router.earnings_router import router as earnings_router
from app.router.wallet_router import router as wallet_router
from app.router.payout_router import router as payout_router
from app.router.attendance_router import router as attendance_router
from app.router.incentives_router import router as incentives_router
from app.router.bonuses_router import router as bonuses_router
from app.router.challenges_router import router as challenges_router
from app.router.ratings_router import router as ratings_router
from app.router.reviews_router import router as reviews_router
from app.router.notifications_router import router as notifications_router
from app.router.support_router import router as support_router
from app.router.kyc_router import router as kyc_router
from app.router.documents_router import router as documents_router
from app.router.analytics_router import router as analytics_router

main_rider_router = APIRouter()

main_rider_router.include_router(status_router)
main_rider_router.include_router(orders_router)
main_rider_router.include_router(pickup_router)
main_rider_router.include_router(delivery_router)
main_rider_router.include_router(location_router)
main_rider_router.include_router(navigation_router)
main_rider_router.include_router(earnings_router)
main_rider_router.include_router(wallet_router)
main_rider_router.include_router(payout_router)
main_rider_router.include_router(attendance_router)
main_rider_router.include_router(incentives_router)
main_rider_router.include_router(bonuses_router)
main_rider_router.include_router(challenges_router)
main_rider_router.include_router(ratings_router)
main_rider_router.include_router(reviews_router)
main_rider_router.include_router(notifications_router)
main_rider_router.include_router(support_router)
main_rider_router.include_router(kyc_router)
main_rider_router.include_router(documents_router)
main_rider_router.include_router(analytics_router)
