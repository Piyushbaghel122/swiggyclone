const SendOtp = {
  "formData": {
    "required": [
      "otp[identity]",
      "otp[scope]",
      "otp[channels][]",
      "otp[type]"
    ],
    "type": "object",
    "properties": {
      "otp[identity]": {
        "type": "string",
        "description": "Indicates the entity on which the OTP is to be sent. For example, Phone Number"
      },
      "otp[scope]": {
        "type": "string",
        "description": "Indicates the purpose of the API. For more details, refer to Additional Info table.",
        "examples": [
          "create_payment_links update_payment_links read_payment_links"
        ]
      },
      "otp[channels][]": {
        "type": "string",
        "description": "Indicates the way or medium through which the OTP should be sent the merchant",
        "examples": [
          "sms"
        ]
      },
      "otp[type]": {
        "type": "string",
        "description": "ndicates the type of OTP you want to receive depending upon the action to be performed.",
        "examples": [
          "SignIn"
        ]
      }
    },
    "contentMediaType": "application/x-www-form-urlencoded",
    "$schema": "https://json-schema.org/draft/2020-12/schema"
  },
  "response": {
    "200": {
      "type": "object",
      "properties": {}
    }
  }
} as const;
export default SendOtp
