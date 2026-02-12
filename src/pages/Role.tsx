import { useNavigate } from "react-router-dom";
import { useInterview } from "@/contexts/InterviewContext";
import PageShell from "@/components/PageShell";
import { Code, Server, Layers, BarChart3, Brain, Cog } from "lucide-react";

const roleMap: Record<string, { name: string; icon: React.ElementType }[]> = {
  "Computer Science": [
    { name: "Software Engineer", icon: Code },
    { name: "Backend Developer", icon: Server },
    { name: "Full Stack Developer", icon: Layers },
    { name: "Data Analyst", icon: BarChart3 },
    { name: "Data Scientist", icon: Brain },
    { name: "Machine Learning Engineer", icon: Cog },
  ],
};

const Role = () => {
  const { branch, setRole } = useInterview();
  const navigate = useNavigate();
  const roles = roleMap[branch] || roleMap["Computer Science"];

  const handleSelect = (name: string) => {
    setRole(name);
    navigate("/experience");
  };

  return (
    <PageShell title="Select Your Role" subtitle={`Roles available for ${branch || "Computer Science"}`} step={2}>
      <div className="grid gap-3 sm:grid-cols-2">
        {roles.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => handleSelect(name)}
            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 text-left shadow-card transition-all duration-200 hover:shadow-card-hover hover:border-primary/40"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-colors group-hover:gradient-primary group-hover:text-primary-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <span className="font-medium text-foreground">{name}</span>
          </button>
        ))}
      </div>
    </PageShell>
  );
};

export default Role;
