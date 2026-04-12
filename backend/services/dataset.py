import json
import random

def get_question(q_type="hr", domain=None):
    with open("data/questions.json", "r") as f:
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