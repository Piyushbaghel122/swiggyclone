import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

load_dotenv()

def send_mail(to_email: str, subject: str, body: str, html_body: str = None):
    """
    Sends an email using smtplib, similar to how nodemailer works in Node.js.
    Uses environment variables for configuration.
    """
    smtp_host = os.getenv("SMTP_HOST", "piyushkumar898923@gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER", "your_email@gmail.com")
    smtp_pass = os.getenv("SMTP_PASS", "your_app_password")

    # Setup the MIME
    msg = MIMEMultipart("alternative")
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg['Subject'] = subject

    # Attach plain text
    part1 = MIMEText(body, 'plain')
    msg.attach(part1)
    
    # Attach HTML if provided
    if html_body:
        part2 = MIMEText(html_body, 'html')
        msg.attach(part2)

    try:
        # Create SMTP session
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls()  # Enable security
        
        # Login to the server
        server.login(smtp_user, smtp_pass)
        
        # Send email
        text = msg.as_string()
        server.sendmail(smtp_user, to_email, text)
        
        server.quit()
        print(f"Email sent successfully to {to_email}")
        return True
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        return False

if __name__ == "__main__":
    send_mail(
        to_email="customer@example.com",
        subject="Welcome to Swiggy!",
        body="Your account has been created.",
        html_body="<h1>Your account has been created.</h1>"
    )
