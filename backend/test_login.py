import requests
import sys

try:
    url = "http://127.0.0.1:8000/api/auth/login"
    payload = {"email": "admin@admin.com", "password": "admin"}
    print(f"Testing login at {url}...", flush=True)
    resp = requests.post(url, json=payload, timeout=5)
    print(f"Status: {resp.status_code}", flush=True)
    print(f"Response: {resp.text}", flush=True)
except Exception as e:
    print(f"Error: {e}", flush=True)
