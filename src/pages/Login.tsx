import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "@/contexts/InterviewContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useInterview();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }
    const name = email.split("@")[0].replace(/[^a-zA-Z]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    setUser({ email, name });
    navigate("/branch");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md animate-slide-up">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-teal">
            <Sparkles className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">Welcome to IntervAI</h1>
          <p className="mt-2 text-muted-foreground">Practice interviews. Build confidence. Land your dream job.</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                className="h-11"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="h-11 w-full gradient-primary text-primary-foreground font-semibold shadow-teal hover:opacity-90 transition-opacity">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Demo mode — any credentials will work
        </p>
      </div>
    </div>
  );
};

export default Login;
