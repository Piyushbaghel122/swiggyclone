import random
import string
import asyncio
import os

class KarzaService:
    """
    Mock service to simulate Karza Technologies KYC API interactions.
    """

    async def verify_pan(self, pan_number: str) -> dict:
        api_key = os.getenv("KARZA_API_KEY")
        if not api_key or api_key == "your_karza_api_key_here":
            print("WARNING: Using default/missing Karza API key.")
        
        await asyncio.sleep(1)
        if len(pan_number) != 10:
            return {"success": False, "message": "Invalid PAN length."}
        
        mock_names = ["Rahul Sharma", "Priya Patel", "Amit Singh", "Sneha Gupta"]
        return {
            "success": True,
            "message": "PAN verified successfully via Karza.",
            "pan_holder_name": random.choice(mock_names)
        }

    async def generate_aadhaar_otp(self, aadhaar_number: str) -> dict:
        await asyncio.sleep(1)
        if len(aadhaar_number) != 12 or not aadhaar_number.isdigit():
             return {"success": False, "message": "Invalid Aadhaar number."}
        
        ref_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=12))
        return {
            "success": True,
            "message": "OTP sent to Aadhaar linked mobile via Karza.",
            "reference_id": f"ref_{ref_id}"
        }

    async def verify_aadhaar_otp(self, reference_id: str, otp: str) -> dict:
        await asyncio.sleep(1)
        if len(otp) == 6 and otp.isdigit() and otp != "000000":
             return {"success": True, "message": "Aadhaar verified successfully via Karza."}
        return {"success": False, "message": "Invalid OTP."}

    async def karza_ckyc_search(self, id_type: str, id_value: str) -> dict:
        await asyncio.sleep(1)
        if not id_value:
            return {"success": False, "message": "Invalid ID value for CKYC."}
            
        mock_ckyc_no = ''.join(random.choices(string.digits, k=14))
        return {
            "success": True,
            "message": "CKYC Record found.",
            "ckyc_number": mock_ckyc_no
        }
        
    async def karza_bank_penny_drop(self, account_number: str, ifsc: str) -> dict:
        await asyncio.sleep(1)
        if len(account_number) < 9 or len(ifsc) != 11:
            return {"success": False, "message": "Invalid Bank Account or IFSC details."}
            
        mock_names = ["Rahul S", "Priya P", "Amit S", "Sneha G"]
        return {
            "success": True,
            "message": "Bank Account verified successfully.",
            "bank_holder_name": random.choice(mock_names)
        }

karza_service = KarzaService()
