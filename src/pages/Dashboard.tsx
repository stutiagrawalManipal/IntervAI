import { useInterview } from "@/contexts/InterviewContext";
import { useNavigate } from "react-router-dom";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, TrendingUp, MessageSquare, Calendar, Target, BarChart3 } from "lucide-react";

const Dashboard = () => {
  const { results } = useInterview();
  const navigate = useNavigate();
  const latest = results[results.length - 1];

  if (!latest) {
    return (
      <PageShell title="Dashboard" subtitle="No results yet. Start an interview to see your performance.">
        <Button onClick={() => navigate("/branch")} className="gradient-primary text-primary-foreground font-semibold shadow-teal hover:opacity-90 transition-opacity">
          Start Interview
        </Button>
      </PageShell>
    );
  }

  const avgScore = Math.round(results.reduce((a, r) => a + r.score, 0) / results.length);

  return (
    <PageShell title="Your Results" subtitle="Here's how you performed in your latest interview.">
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Trophy className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Score</span>
          </div>
          <p className="mt-2 font-display text-3xl font-bold text-foreground">{latest.score}<span className="text-lg text-muted-foreground">/100</span></p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Confidence</span>
          </div>
          <p className="mt-2 font-display text-3xl font-bold text-foreground">{latest.confidence}<span className="text-lg text-muted-foreground">%</span></p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Avg Score</span>
          </div>
          <p className="mt-2 font-display text-3xl font-bold text-foreground">{avgScore}<span className="text-lg text-muted-foreground">/100</span></p>
        </div>
      </div>

      {/* Feedback */}
      <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-card">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <MessageSquare className="h-4 w-4" />
          <span className="text-xs font-medium uppercase tracking-wider">Feedback</span>
        </div>
        <p className="text-foreground">{latest.feedback}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-secondary px-3 py-1">{latest.branch}</span>
          <span className="rounded-full bg-secondary px-3 py-1">{latest.role}</span>
          <span className="rounded-full bg-secondary px-3 py-1">{latest.mode}</span>
          <span className="rounded-full bg-secondary px-3 py-1">{latest.experience}</span>
        </div>
      </div>

      {/* History */}
      {results.length > 1 && (
        <div className="mt-6">
          <h3 className="mb-3 font-display text-lg font-semibold text-foreground">History</h3>
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground"><Calendar className="mr-1 inline h-3.5 w-3.5" />Date</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground"><Target className="mr-1 inline h-3.5 w-3.5" />Mode</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Score</th>
                </tr>
              </thead>
              <tbody>
                {results.slice().reverse().map((r, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-foreground">{new Date(r.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-foreground">{r.mode}</td>
                    <td className="px-4 py-3 text-right font-semibold text-foreground">{r.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-8">
        <Button onClick={() => navigate("/branch")} className="gradient-primary text-primary-foreground font-semibold shadow-teal hover:opacity-90 transition-opacity">
          <RotateCcw className="mr-2 h-4 w-4" />
          Practice Again
        </Button>
      </div>
    </PageShell>
  );
};

export default Dashboard;
