from os import getenv 
from dotenv import load_dotenv
from twilio.rest import Client 

load_dotenv() 


account_sid = getenv("TWILIO_ACCOUNT_SID")
auth_token = getenv("TWILIO_AUTH_TOKEN")
verify_sid = getenv("TWILIO_VERIFY_SID")

client = Client(account_sid, auth_token)


def send_otp(mobile_number: str):
    try:
        verification = client.verify.v2.services(verify_sid).verifications.create(to=mobile_number, channel="sms")
        return verification.sid
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def verify_otp(mobile_number: str, otp: str):
    try:
        verification_check = client.verify.v2.services(verify_sid).verification_checks.create(to=mobile_number, code=otp)
        return verification_check.status
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


twilio_number = getenv("TWILIO_PHONE_NUMBER")

def send_message(mobile_number: str, message: str):
    try:
        msg = client.messages.create(
            body=message,
            from_=twilio_number,
            to=mobile_number
        )
        return msg.sid
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
