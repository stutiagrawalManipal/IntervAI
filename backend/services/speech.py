import whisper

model = whisper.load_model("base")

def transcribe_audio(file_path):
    result = model.transcribe(file_path, fp16=False)
    return result["text"]

if __name__ == "__main__":
    print("Loading model...")
    text = transcribe_audio("test.wav")
    print("Transcript:")
    print(text)