import requests
import sys

try:
    # 1. Login
    login_url = "http://127.0.0.1:8000/api/auth/login"
    payload = {"email": "admin@admin.com", "password": "admin"}
    print(f"1. Login at {login_url}...", flush=True)
    resp = requests.post(login_url, json=payload, timeout=5)
    
    if resp.status_code != 200:
        print(f"Login Failed: {resp.status_code} {resp.text}", flush=True)
        sys.exit(1)
        
    token = resp.json().get("access_token")
    print(f"   Token received (len={len(token)})", flush=True)

    # 2. Access Dashboard
    dash_url = "http://127.0.0.1:8000/api/dashboard/"
    headers = {"Authorization": f"Bearer {token}"}
    print(f"2. Accessing Dashboard at {dash_url}...", flush=True)
    resp2 = requests.get(dash_url, headers=headers, timeout=5)
    
    print(f"   Status: {resp2.status_code}", flush=True)
    print(f"   Response: {resp2.text}", flush=True)

except Exception as e:
    print(f"Error: {e}", flush=True)
