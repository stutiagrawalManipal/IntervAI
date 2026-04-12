import json
import random
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "input.json")

def get_question(q_type="hr", domain=None):
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    filtered = []

    for q in data:
        if q["type"] == q_type:
            if q_type == "technical":
                if q.get("domain") == domain:
                    filtered.append(q)
            else:
                filtered.append(q)

    return random.choice(filtered) if filtered else None