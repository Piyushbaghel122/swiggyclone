import requests

url = "https://in.staging.decentro.tech/kyc/public_registry/validate"

headers = {
    "client_id": "5e296f1d-a994-4b97-991e-b7d457f4b919",
    "client_secret": "",
    "module_secret": "d01005b6-2b5b-424c-973e-f755b932926d",
    "content_type": "application/json"
}

payload = {
     "reference_id": "REF123456",
    "document_type": "PAN",
    "document_number": "ABCDE1234F"
}

response = requests.post(url, headers=headers , json=payload)

print(response.status_code)