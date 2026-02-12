import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "@/contexts/InterviewContext";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Send, ChevronRight } from "lucide-react";

const sampleQuestions: Record<string, string[]> = {
  "HR Interview": [
    "Tell me about yourself.",
    "Why do you want to work in this field?",
    "What are your strengths and weaknesses?",
    "Where do you see yourself in 5 years?",
    "Describe a challenging situation you handled.",
  ],
  "Technical Interview": [
    "Explain the difference between a stack and a queue.",
    "What is the time complexity of binary search?",
    "Explain REST APIs and their principles.",
    "What are SOLID principles?",
    "Describe the concept of OOP with examples.",
  ],
  "Coding Interview": [
    "How would you reverse a linked list?",
    "Explain your approach to solving two-sum problem.",
    "Describe how you would implement a cache system.",
    "Walk me through finding duplicates in an array.",
    "How would you detect a cycle in a linked list?",
  ],
  "Full Interview Simulation": [
    "Tell me about yourself and your technical background.",
    "Explain polymorphism with a real-world example.",
    "How would you design a URL shortener system?",
    "Walk through your approach to debugging a production issue.",
    "Do you have any questions for us?",
  ],
};

const Interview = () => {
  const { interviewMode, branch, role, experienceLevel, addResult } = useInterview();
  const navigate = useNavigate();
  const questions = sampleQuestions[interviewMode] || sampleQuestions["Technical Interview"];

  const [currentQ, setCurrentQ] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);

  const toggleMic = useCallback(() => {
    setIsListening(prev => !prev);
    if (!isListening) {
      setTimeout(() => {
        setAnswer(prev => prev + (prev ? " " : "") + "Sample recorded answer for demo purposes.");
        setIsListening(false);
      }, 2000);
    }
  }, [isListening]);

  const submitAnswer = () => {
    if (!answer.trim()) return;
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setAnswer("");

    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      const score = Math.floor(Math.random() * 30) + 70;
      const confidence = Math.floor(Math.random() * 25) + 65;
      addResult({
        date: new Date().toISOString(),
        branch,
        role,
        mode: interviewMode,
        experience: experienceLevel,
        score,
        confidence,
        feedback: score >= 85 ? "Excellent performance! Keep it up." : score >= 75 ? "Good job. Focus on adding more depth to your answers." : "Decent attempt. Practice structuring your responses better.",
      });
      navigate("/dashboard");
    }
  };

  return (
    <PageShell title={interviewMode || "Interview"} subtitle={`Question ${currentQ + 1} of ${questions.length}`} step={5}>
      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Question {currentQ + 1}</p>
        <h2 className="mt-2 font-display text-xl font-semibold text-foreground">{questions[currentQ]}</h2>
      </div>

      <div className="mt-6 space-y-4">
        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder="Type your answer or use the mic..."
          rows={4}
          className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
        />

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={toggleMic}
            className={`h-11 ${isListening ? "border-primary text-primary" : ""}`}
          >
            {isListening ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
            {isListening ? "Listening..." : "Start Speaking"}
          </Button>

          <Button
            onClick={submitAnswer}
            disabled={!answer.trim()}
            className="h-11 gradient-primary text-primary-foreground font-semibold shadow-teal hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {currentQ < questions.length - 1 ? (
              <>Next <ChevronRight className="ml-1 h-4 w-4" /></>
            ) : (
              <>Submit <Send className="ml-1 h-4 w-4" /></>
            )}
          </Button>
        </div>
      </div>

      <div className="mt-6 flex gap-1.5">
        {questions.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= currentQ ? "gradient-primary" : "bg-muted"}`} />
        ))}
      </div>
    </PageShell>
  );
};

export default Interview;
