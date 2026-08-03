import random
import string
import asyncio

class KycService:
    """
    Mock service to simulate third-party KYC API interactions (e.g., Setu, Razorpay, Cashfree).
    """

    async def verify_pan(self, pan_number: str) -> dict:
        """
        Simulate a PAN verification API call.
        Real world: POST to external API with PAN.
        """
        await asyncio.sleep(1) # Simulate network delay
        
        # Simple mock validation: Assume length 10 is enough, 
        # but normally PAN has format: 5 letters, 4 numbers, 1 letter
        if len(pan_number) != 10:
            return {"success": False, "message": "Invalid PAN length."}
        
        # Mock random holder name for demonstration
        mock_names = ["Rahul Sharma", "Priya Patel", "Amit Singh", "Sneha Gupta"]
        
        return {
            "success": True,
            "message": "PAN verified successfully.",
            "pan_holder_name": random.choice(mock_names)
        }

    async def generate_aadhaar_otp(self, aadhaar_number: str) -> dict:
        """
        Simulate requesting an Aadhaar OTP.
        """
        await asyncio.sleep(1)
        
        if len(aadhaar_number) != 12 or not aadhaar_number.isdigit():
             return {"success": False, "message": "Invalid Aadhaar number."}
        
        # Generate mock reference ID
        ref_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))
        
        return {
            "success": True,
            "message": "OTP sent to Aadhaar linked mobile.",
            "reference_id": f"ref_{ref_id}"
        }

    async def verify_aadhaar_otp(self, reference_id: str, otp: str) -> dict:
        """
        Simulate verifying the Aadhaar OTP.
        """
        await asyncio.sleep(1)
        
        # For mock purposes, accept any 6-digit OTP that isn't '000000'
        if len(otp) == 6 and otp.isdigit() and otp != "000000":
             return {"success": True, "message": "Aadhaar verified successfully."}
        
        return {"success": False, "message": "Invalid OTP."}

kyc_service = KycService()
