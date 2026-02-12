import React, { createContext, useContext, useState, useCallback } from "react";

interface User {
  email: string;
  name: string;
}

interface InterviewResult {
  date: string;
  branch: string;
  role: string;
  mode: string;
  experience: string;
  score: number;
  confidence: number;
  feedback: string;
}

interface InterviewState {
  user: User | null;
  branch: string;
  role: string;
  experienceLevel: string;
  interviewMode: string;
  results: InterviewResult[];
}

interface InterviewContextType extends InterviewState {
  setUser: (user: User | null) => void;
  setBranch: (branch: string) => void;
  setRole: (role: string) => void;
  setExperienceLevel: (level: string) => void;
  setInterviewMode: (mode: string) => void;
  addResult: (result: InterviewResult) => void;
  logout: () => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<InterviewState>(() => {
    const saved = localStorage.getItem("intervai_state");
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return { user: null, branch: "", role: "", experienceLevel: "", interviewMode: "", results: [] };
  });

  const persist = useCallback((newState: InterviewState) => {
    setState(newState);
    localStorage.setItem("intervai_state", JSON.stringify(newState));
  }, []);

  const setUser = (user: User | null) => persist({ ...state, user });
  const setBranch = (branch: string) => persist({ ...state, branch });
  const setRole = (role: string) => persist({ ...state, role });
  const setExperienceLevel = (level: string) => persist({ ...state, experienceLevel: level });
  const setInterviewMode = (mode: string) => persist({ ...state, interviewMode: mode });
  const addResult = (result: InterviewResult) => persist({ ...state, results: [...state.results, result] });
  const logout = () => {
    localStorage.removeItem("intervai_state");
    setState({ user: null, branch: "", role: "", experienceLevel: "", interviewMode: "", results: [] });
  };

  return (
    <InterviewContext.Provider value={{ ...state, setUser, setBranch, setRole, setExperienceLevel, setInterviewMode, addResult, logout }}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const ctx = useContext(InterviewContext);
  if (!ctx) throw new Error("useInterview must be used within InterviewProvider");
  return ctx;
};
