import { useNavigate } from "react-router-dom";
import { useInterview } from "@/contexts/InterviewContext";
import PageShell from "@/components/PageShell";
import { Monitor, Cpu, Radio, Wrench, Lock } from "lucide-react";

const branches = [
  { name: "Computer Science", icon: Monitor, active: true },
  { name: "Information Technology", icon: Cpu, active: false },
  { name: "Electronics & Communication", icon: Radio, active: false },
  { name: "Mechanical Engineering", icon: Wrench, active: false },
];

const Branch = () => {
  const { setBranch } = useInterview();
  const navigate = useNavigate();

  const handleSelect = (name: string, active: boolean) => {
    if (!active) return;
    setBranch(name);
    navigate("/role");
  };

  return (
    <PageShell title="Select Your Branch" subtitle="Choose your academic background to get tailored interview questions." step={1}>
      <div className="grid gap-4 sm:grid-cols-2">
        {branches.map(({ name, icon: Icon, active }) => (
          <button
            key={name}
            onClick={() => handleSelect(name, active)}
            disabled={!active}
            className={`group relative flex items-center gap-4 rounded-xl border p-5 text-left transition-all duration-200 ${
              active
                ? "border-border bg-card shadow-card hover:shadow-card-hover hover:border-primary/40 cursor-pointer"
                : "border-border/50 bg-muted/40 opacity-60 cursor-not-allowed"
            }`}
          >
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors ${
              active ? "bg-secondary text-secondary-foreground group-hover:gradient-primary group-hover:text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <span className="font-semibold text-foreground">{name}</span>
              {!active && (
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  Coming soon
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </PageShell>
  );
};

export default Branch;
