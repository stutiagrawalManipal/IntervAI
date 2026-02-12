import React from "react";

interface PageShellProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  step?: number;
  totalSteps?: number;
}

const PageShell: React.FC<PageShellProps> = ({ children, title, subtitle, step, totalSteps = 5 }) => {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col px-6 py-10 animate-fade-in">
      {step && (
        <div className="mb-8 flex items-center gap-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i < step ? "gradient-primary" : "bg-muted"
              }`}
            />
          ))}
          <span className="ml-2 text-xs font-medium text-muted-foreground">{step}/{totalSteps}</span>
        </div>
      )}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="mt-2 text-base text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default PageShell;
