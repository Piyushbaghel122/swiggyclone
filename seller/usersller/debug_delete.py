import urllib.request
import json

url = "http://localhost:8001/api/v1/reastaurant/menu_item/1"
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as response:
    data = json.loads(response.read().decode())
    print("GET RESPONSE:", data)
    
    if data and "data" in data and len(data["data"]) > 0:
        first_id = data["data"][0]["id"]
        print(f"Attempting to delete item with id: {first_id}")
        
        delete_url = f"http://localhost:8001/api/v1/reastaurant/deleteReastaurant/1/{first_id}"
        del_req = urllib.request.Request(delete_url, method="DELETE")
        try:
            with urllib.request.urlopen(del_req) as del_res:
                del_data = json.loads(del_res.read().decode())
                print("DELETE RESPONSE:", del_data)
        except Exception as e:
            print("DELETE FAILED:", e)
            if hasattr(e, 'read'):
                print("Error Details:", e.read().decode())
