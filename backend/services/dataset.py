import json
import random
import os

# Get base directory (backend folder)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Path to your dataset file
DATA_PATH = os.path.join(BASE_DIR, "data", "input.json")   # 👈 your file name

def get_question(category=None, role=None):
    try:
        # Load dataset
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)

        # Ensure it's a list
        if not isinstance(data, list):
            raise ValueError("Dataset should be a list of questions")

        # Optional filtering
        filtered = data

        if category:
            filtered = [q for q in filtered if q.get("category") == category]

        if role:
            filtered = [q for q in filtered if q.get("role") == role]

        # If no match, fallback to full dataset
        if not filtered:
            filtered = data

        # Pick random question
        q = random.choice(filtered)

        # Return structured output (safe access)
        return {
            "question": q.get("question", ""),
            "ideal_answer": q.get("ideal_answer", ""),
            "keywords": q.get("keywords", []),
            "category": q.get("category", ""),
            "role": q.get("role", ""),
            "difficulty": q.get("difficulty", "")
        }

    except Exception as e:
        print("DATASET ERROR:", str(e))
        return None