import requests
from services.dataset import get_question

def evaluate_answer(transcript):
    q = get_question("hr")

    prompt = f"""
You are an HR interviewer.

Question: {q['question']}

Ideal Answer:
{q['ideal_answer']}

Good Example:
{q['good_answer']}

Bad Example:
{q['bad_answer']}

Candidate Answer:
{transcript}

Evaluate:
- Communication (0-10)
- Confidence (0-10)
- Clarity (0-10)

Give feedback.

Format:
Communication: X
Confidence: X
Clarity: X
Feedback: ...
"""

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "gemma:2b",
            "prompt": prompt,
            "stream": False
        }
    )

    return response.json()["response"]