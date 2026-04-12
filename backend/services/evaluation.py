import requests
from services.dataset import get_question

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "gemma:2b"   # change if needed


def evaluate_answer(transcript):
    try:
        # ✅ Step 1: get question from dataset
        q = get_question()

        if not q:
            return {"error": "No question found in dataset"}

        # ✅ Step 2: build prompt (NO good_answer dependency)
        prompt = f"""
You are an AI interview evaluator.

Evaluate the candidate's answer based on the following:

Question:
{q.get("question")}

Ideal Answer:
{q.get("ideal_answer")}

Keywords to look for:
{q.get("keywords")}

Candidate Answer:
{transcript}

Evaluate the answer on:
1. Communication (0-10)
2. Clarity (0-10)
3. Confidence (0-10)

Also provide a short feedback.

Return response in this format:
Communication: X/10
Clarity: X/10
Confidence: X/10
Feedback: <your feedback>
"""

        # ✅ Step 3: call Gemma via Ollama
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": prompt,
                "stream": False
            }
        )

        # ✅ Step 4: handle response safely
        if response.status_code != 200:
            return {"error": "LLM request failed"}

        output = response.json().get("response", "")

        # ✅ Step 5: return structured output
        return {
            "question": q.get("question"),
            "evaluation": output.strip()
        }

    except Exception as e:
        print("EVALUATION ERROR:", str(e))
        return {"error": str(e)}