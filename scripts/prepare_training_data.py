import json

INPUT_FILE = "backend/data/intervai_dataset.json"
OUTPUT_FILE = "backend/data/train.jsonl"


def create_sample(question, answer, content, confidence, tone):
    return {
        "text": f"Question: {question}\nAnswer: {answer}\nScores: content={content}, confidence={confidence}, tone={tone}"
    }


def convert():
    with open(INPUT_FILE, "r") as f:
        data = json.load(f)

    output = []

    for item in data:
        q = item["question"]

        # ideal answer → best score
        output.append(create_sample(
            q,
            item["ideal_answer"],
            10, 9, 9
        ))

        # good answer → medium-high score
        output.append(create_sample(
            q,
            item["good_answer"],
            8, 7, 7
        ))

        # bad answer → low score
        output.append(create_sample(
            q,
            item["bad_answer"],
            3, 3, 3
        ))

    # write JSONL
    with open(OUTPUT_FILE, "w") as f:
        for entry in output:
            f.write(json.dumps(entry) + "\n")

    print(f"✅ Training data created: {OUTPUT_FILE}")
    print(f"Total samples: {len(output)}")


convert()