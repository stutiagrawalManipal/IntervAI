import multiprocessing
multiprocessing.set_start_method("spawn", force=True)

from fastapi import FastAPI, UploadFile, File
from services.speech import transcribe_audio
from services.evaluation import evaluate_answer

app = FastAPI()

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    try:
        # ✅ Step 1: save audio
        with open("temp.wav", "wb") as f:
            f.write(await file.read())

        print("STEP 1: file received")

        # ✅ Step 2: speech to text
        transcript = transcribe_audio("temp.wav")
        print("STEP 2: transcript:", transcript)

        # ✅ Step 3: evaluation
        result = evaluate_answer(transcript)
        print("STEP 3: result:", result)

        return {
            "transcript": transcript,
            "question": result.get("question"),
            "evaluation": result.get("evaluation")
        }

    except Exception as e:
        print("ERROR:", str(e))
        return {
            "error": str(e)
        }