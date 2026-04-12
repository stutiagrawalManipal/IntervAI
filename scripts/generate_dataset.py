import json
import requests
import time

OLLAMA_URL = "http://localhost:11434/api/generate"


def fallback_answers():
    return {
        "good": "I plan tasks based on priorities and deadlines.",
        "bad": "I just do whatever comes."
    }


def generate_answers(question):
    prompt = f"""
You are a strict JSON generator.

You MUST return ONLY valid JSON.
Do NOT include explanations.
Do NOT include text outside JSON.

Format EXACTLY like this:
{{"good": "text", "bad": "text"}}

Question: "{question}"

Generate:
- 1 good answer
- 1 bad answer

Rules:
- Human-like
- 1–2 sentences
- No repetition

ONLY OUTPUT JSON.
"""

    try:
        print("Calling Ollama...")

        response = requests.post(OLLAMA_URL, json={
            "model": "gemma:2b",
            "prompt": prompt,
            "stream": False
        })

        output = response.json().get("response", "").strip()

        print("Got response")

        # ✅ Extract JSON safely
        start = output.find("{")
        end = output.rfind("}") + 1

        if start != -1 and end != -1:
            output = output[start:end]
        else:
            print("⚠️ Could not find JSON block")
            return fallback_answers()

        try:
            parsed = json.loads(output)
        except:
            print("⚠️ Invalid JSON from model, using fallback")
            return fallback_answers()

        return parsed

    except Exception as e:
        print("❌ Error:", e)
        return fallback_answers()


def convert_dataset(input_file, output_file):
    with open(input_file, "r") as f:
        data = json.load(f)

    # 🔥 Test with small data first (remove later)
    # data = data[:5]

    final = []

    for i, item in enumerate(data, start=1):
        print(f"\nGenerating for question {i}/{len(data)}...")

        answers = generate_answers(item["question"])

        print(f"Done question {i}")

        final.append({
            "id": i,
            "type": "hr",
            "category": item.get("category"),
            "role": item.get("role"),
            "difficulty": item.get("difficulty"),
            "source_type": item.get("source_type"),
            "question": item.get("question"),
            "ideal_answer": item.get("ideal_answer"),
            "good_answer": answers.get("good", fallback_answers()["good"]),
            "bad_answer": answers.get("bad", fallback_answers()["bad"]),
            "keywords": item.get("keywords", [])
        })

        time.sleep(0.2)

    with open(output_file, "w") as f:
        json.dump(final, f, indent=2)

    print("\n✅ Dataset generated successfully!")


convert_dataset(
    "backend/data/input.json",
    "backend/data/intervai_dataset.json"
)