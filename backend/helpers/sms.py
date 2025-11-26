import os
import requests
from .format_phone import normalize_phone_number

API_KEY = os.getenv("API_BEF_KEY")
API_URL = os.getenv("API_BEF_URL")


def send_sms(to_phone: str, message: str):
    phone = normalize_phone_number(to_phone)

    headers = {
        "Authorization": API_KEY,
        "Content-Type": "application/json",
    }

    payload = {"phone_number": phone, "message": message}

    try:
        response = requests.post(f"{API_URL}/send/", json=payload, headers=headers)
        response.raise_for_status()
        print(response.json())
        return response.json()

    except Exception as e:
        print("Erreur envoi SMS:", e)
        return {"error": str(e)}
