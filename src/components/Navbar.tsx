import { useInterview } from "@/contexts/InterviewContext";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/intervai-logo.png";

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
          <img src={logoImg} alt="IntervAI" className="h-9 w-9 rounded-lg object-contain" />
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
