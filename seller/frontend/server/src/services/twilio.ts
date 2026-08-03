import twilio  from "twilio";

export const Client = twilio(
    process.env.TWILIO_CLIENT_ID, 
    process.env.TWILIO_SECRET_key);



