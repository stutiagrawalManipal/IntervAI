import { useNavigate } from "react-router-dom";
import { useInterview } from "@/contexts/InterviewContext";
import PageShell from "@/components/PageShell";
import { MessageSquare, Cpu, Code, Play } from "lucide-react";

const modes = [
  { type: "HR Interview", desc: "Communication and personality assessment", icon: MessageSquare },
  { type: "Technical Interview", desc: "Core subject and role-based knowledge", icon: Cpu },
  { type: "Coding Interview", desc: "Logic and problem-solving explanation", icon: Code },
  { type: "Full Interview Simulation", desc: "Complete multi-round interview experience", icon: Play },
];

const InterviewMode = () => {
  const { setInterviewMode } = useInterview();
  const navigate = useNavigate();

  const handleSelect = (mode: string) => {
    setInterviewMode(mode);
    navigate("/interview");
  };

  return (
    <PageShell title="Interview Mode" subtitle="Pick the type of interview you'd like to practice." step={4}>
      <div className="grid gap-4 sm:grid-cols-2">
        {modes.map(({ type, desc, icon: Icon }) => (
          <button
            key={type}
            onClick={() => handleSelect(type)}
            className="group flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-6 text-left shadow-card transition-all duration-200 hover:shadow-card-hover hover:border-primary/40"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors group-hover:gradient-primary group-hover:text-primary-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{type}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          </button>
        ))}
      </div>
    </PageShell>
  );
};

export default InterviewMode;
