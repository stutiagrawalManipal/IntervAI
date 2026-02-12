import { useInterview } from "@/contexts/InterviewContext";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logout } = useInterview();
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === "/login" || location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <button onClick={() => navigate(user ? "/branch" : "/login")} className="flex items-center gap-2 font-display text-xl font-bold text-foreground transition-colors hover:text-primary">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          IntervAI
        </button>
        {user && !isLogin && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
              <LogOut className="mr-1.5 h-4 w-4" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
