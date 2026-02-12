import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "@/contexts/InterviewContext";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, ArrowRight } from "lucide-react";

const levels = [
  { value: "Student / Fresher", label: "Student / Fresher", desc: "Currently studying or recently graduated", icon: GraduationCap },
  { value: "1-2 Years Experience", label: "1–2 Years Experience", desc: "Early career professional", icon: Briefcase },
];

const Experience = () => {
  const { setExperienceLevel } = useInterview();
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selected) return;
    setExperienceLevel(selected);
    navigate("/interview-mode");
  };

  return (
    <PageShell title="Experience Level" subtitle="This helps us calibrate the difficulty of your interview." step={3}>
      <div className="space-y-3">
        {levels.map(({ value, label, desc, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setSelected(value)}
            className={`flex w-full items-center gap-4 rounded-xl border p-5 text-left transition-all duration-200 ${
              selected === value
                ? "border-primary bg-secondary shadow-teal"
                : "border-border bg-card shadow-card hover:shadow-card-hover hover:border-primary/40"
            }`}
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
              selected === value ? "gradient-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <span className="font-semibold text-foreground">{label}</span>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-8">
        <Button
          onClick={handleContinue}
          disabled={!selected}
          className="h-11 gradient-primary text-primary-foreground font-semibold shadow-teal hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </PageShell>
  );
};

export default Experience;
