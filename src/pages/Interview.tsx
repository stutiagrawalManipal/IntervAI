import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "@/contexts/InterviewContext";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Send, ChevronRight, Play, CheckCircle } from "lucide-react";

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

  const [phase, setPhase] = useState<"start" | "active" | "end">("start");
  const [currentQ, setCurrentQ] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<{ score: number; confidence: number; feedback: string } | null>(null);

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
      const feedback = score >= 85 ? "Excellent performance! Keep it up." : score >= 75 ? "Good job. Focus on adding more depth to your answers." : "Decent attempt. Practice structuring your responses better.";
      const res = { score, confidence, feedback };
      setResult(res);
      addResult({
        date: new Date().toISOString(),
        branch,
        role,
        mode: interviewMode,
        experience: experienceLevel,
        ...res,
      });
      setPhase("end");
    }
  };

  // START SCREEN
  if (phase === "start") {
    return (
      <PageShell title="Ready to Begin?" subtitle={interviewMode || "Interview Session"} step={5}>
        <div className="flex flex-col items-center text-center gap-6 py-8">
          <div className="rounded-full gradient-primary p-5 shadow-teal">
            <Play className="h-10 w-10 text-primary-foreground" />
          </div>
          <div className="space-y-2 max-w-md">
            <h2 className="font-display text-2xl font-bold text-foreground">Session Overview</h2>
            <p className="text-muted-foreground text-sm">You'll answer <span className="font-semibold text-foreground">{questions.length} questions</span> in this round.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm text-sm">
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <p className="text-muted-foreground text-xs">Branch</p>
              <p className="font-semibold text-foreground mt-0.5">{branch || "—"}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <p className="text-muted-foreground text-xs">Role</p>
              <p className="font-semibold text-foreground mt-0.5">{role || "—"}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <p className="text-muted-foreground text-xs">Experience</p>
              <p className="font-semibold text-foreground mt-0.5">{experienceLevel || "—"}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <p className="text-muted-foreground text-xs">Mode</p>
              <p className="font-semibold text-foreground mt-0.5">{interviewMode || "—"}</p>
            </div>
          </div>
          <Button
            onClick={() => setPhase("active")}
            className="h-12 px-8 gradient-primary text-primary-foreground font-semibold shadow-teal hover:opacity-90 transition-opacity text-base"
          >
            Start Session <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </PageShell>
    );
  }

  // END SCREEN
  if (phase === "end" && result) {
    return (
      <PageShell title="Session Complete" subtitle="Here's how you did" step={5}>
        <div className="flex flex-col items-center text-center gap-6 py-8">
          <div className="rounded-full bg-accent p-5">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-muted-foreground text-xs">Score</p>
              <p className="font-display text-3xl font-bold text-primary mt-1">{result.score}%</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-muted-foreground text-xs">Confidence</p>
              <p className="font-display text-3xl font-bold text-foreground mt-1">{result.confidence}%</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 w-full max-w-sm">
            <p className="text-muted-foreground text-xs mb-1">Feedback</p>
            <p className="text-foreground text-sm font-medium">{result.feedback}</p>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => { setPhase("start"); setCurrentQ(0); setAnswers([]); setResult(null); }} className="h-11">
              Retry Session
            </Button>
            <Button onClick={() => navigate("/dashboard")} className="h-11 gradient-primary text-primary-foreground font-semibold shadow-teal hover:opacity-90 transition-opacity">
              Go to Dashboard <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </PageShell>
    );
  }

  // ACTIVE INTERVIEW
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col px-6 py-10 animate-fade-in">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-2">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < 5 ? "gradient-primary" : "bg-muted"}`} />
        ))}
        <span className="ml-2 text-xs font-medium text-muted-foreground">5/5</span>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {/* LEFT — Question + Controls */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">{interviewMode || "Interview"}</h1>
            <p className="mt-2 text-base text-muted-foreground">Question {currentQ + 1} of {questions.length}</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Question {currentQ + 1}</p>
            <h2 className="mt-2 font-display text-xl font-semibold text-foreground">{questions[currentQ]}</h2>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={toggleMic}
              className={`h-12 px-6 text-base transition-all ${isListening ? "border-primary text-primary ring-2 ring-primary/20" : ""}`}
            >
              {isListening ? <MicOff className="mr-2 h-5 w-5" /> : <Mic className="mr-2 h-5 w-5" />}
              {isListening ? "Stop" : "Start Speaking"}
            </Button>

            <Button
              onClick={submitAnswer}
              disabled={!answer.trim()}
              className="h-12 px-6 gradient-primary text-primary-foreground font-semibold shadow-teal hover:opacity-90 transition-opacity disabled:opacity-40 text-base"
            >
              {currentQ < questions.length - 1 ? (
                <>Next <ChevronRight className="ml-1 h-5 w-5" /></>
              ) : (
                <>Finish <Send className="ml-1 h-5 w-5" /></>
              )}
            </Button>
          </div>

          {/* Question progress dots */}
          <div className="flex gap-1.5 mt-auto">
            {questions.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= currentQ ? "gradient-primary" : "bg-muted"}`} />
            ))}
          </div>
        </div>

        {/* RIGHT — Live Transcript */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Your Answer</p>
          <div className="flex-1 rounded-xl border border-border bg-card p-6 shadow-card min-h-[240px] relative">
            {answer ? (
              <p className="text-foreground text-base leading-relaxed whitespace-pre-wrap">{answer}</p>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center gap-3 text-muted-foreground">
                <Mic className="h-8 w-8 opacity-40" />
                <p className="text-sm">Click <span className="font-semibold text-foreground">"Start Speaking"</span> to record your answer</p>
              </div>
            )}
            {isListening && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium text-primary">Listening...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
