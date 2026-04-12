import json
import requests
import time

OLLAMA_URL = "http://localhost:11434/api/generate"

def generate_answers(question):
    prompt = f"""
Question: "{question}"

Generate:
- 1 good answer
- 1 bad answer

Rules:
- Human-like
- 1–2 sentences
- No repetition

Return JSON:
{{
  "good": "...",
  "bad": "..."
}}
"""

    try:
        response = requests.post(OLLAMA_URL, json={
            "model": "gemma:2b",
            "prompt": prompt,
            "stream": False
        })

        output = response.json()["response"]
        return json.loads(output)

    except:
        return {
            "good": "I plan tasks based on priorities and deadlines.",
            "bad": "I just do whatever comes."
        }

def convert_dataset(input_file, output_file):
    with open(input_file, "r") as f:
        data = json.load(f)

    final = []

    for i, item in enumerate(data, start=1):
        answers = generate_answers(item["question"])

        final.append({
            "id": i,
            "type": "hr",
            "category": item.get("category"),
            "role": item.get("role"),
            "difficulty": item.get("difficulty"),
            "source_type": item.get("source_type"),
            "question": item.get("question"),
            "ideal_answer": item.get("ideal_answer"),
            "good_answer": answers["good"],
            "bad_answer": answers["bad"],
            "keywords": item.get("keywords", [])
        })

        time.sleep(0.2)

    with open(output_file, "w") as f:
        json.dump(final, f, indent=2)

    print("✅ Dataset generated")

# RUN
convert_dataset("data/input.json", "data/intervai_dataset.json")