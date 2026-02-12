import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { InterviewProvider } from "@/contexts/InterviewContext";
import Navbar from "@/components/Navbar";
import Login from "@/pages/Login";
import Branch from "@/pages/Branch";
import Role from "@/pages/Role";
import Experience from "@/pages/Experience";
import InterviewMode from "@/pages/InterviewMode";
import Interview from "@/pages/Interview";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <InterviewProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/branch" element={<Branch />} />
            <Route path="/role" element={<Role />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/interview-mode" element={<InterviewMode />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </InterviewProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
