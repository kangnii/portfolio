import os
import json
from datetime import datetime

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
os.makedirs(DATA_DIR, exist_ok=True)

MESSAGES_PATH = os.path.join(DATA_DIR, "messages.jsonl")

def append_message(payload: dict) -> None:
    payload = dict(payload)
    payload["received_at"] = datetime.utcnow().isoformat() + "Z"
    with open(MESSAGES_PATH, "a", encoding="utf-8") as f:
        f.write(json.dumps(payload, ensure_ascii=False) + "\n")
