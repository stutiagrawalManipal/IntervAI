from fastapi import FastAPI, UploadFile, File
from services.speech import transcribe_audio
from services.evaluation import evaluate_answer

app = FastAPI()

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    
    # save audio
    with open("temp.wav", "wb") as f:
        f.write(await file.read())

    # step 1: speech to text
    transcript = transcribe_audio("temp.wav")

    # step 2: evaluation
    result = evaluate_answer(transcript)

    return {
        "transcript": transcript,
        "question": result["question"],
        "evaluation": result["evaluation"]
    }