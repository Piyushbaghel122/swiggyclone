from fastapi import APIRouter
from app.controller.attendance_controller import AttendanceController

router = APIRouter(prefix="/rider/attendance", tags=["Attendance"])

@router.post("/check-in")
def check_in():
    return AttendanceController.check_in()

@router.post("/check-out")
def check_out():
    return AttendanceController.check_out()

@router.get("/today")
def attendance_today():
    return AttendanceController.attendance_today()

@router.get("/history")
def attendance_history():
    return AttendanceController.attendance_history()
