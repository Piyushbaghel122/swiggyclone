import urllib.request

url = "http://localhost:8001/api/v1/reastaurant/deleteReastaurant/1/undefined"
req = urllib.request.Request(url, method="DELETE")
try:
    with urllib.request.urlopen(req) as res:
        print(res.read().decode())
except Exception as e:
    print(e.read().decode())
