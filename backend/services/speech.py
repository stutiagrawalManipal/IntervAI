import whisper

model = whisper.load_model("base")

def transcribe_audio(audio_path):
    result = model.transcribe(audio_path)
    return result["text"]

if __name__ == "__main__":
    print("Loading model...")
    text = transcribe_audio("test.wav")
    print("Transcript:")
    print(text)