import { ReactNode } from "react";

interface TerminalBoxProps {
  children: ReactNode;
  className?: string;
  label?: string;
}

export default function TerminalBox({ children, className = "", label }: TerminalBoxProps) {
  return (
    <div className={`bg-black/60 border border-[#39ff1430] font-mono text-sm ${className}`}>
      {label && (
        <div className="border-b border-[#39ff1430] px-4 py-1 text-xs text-[#39ff14] tracking-widest uppercase">
          {label}
        </div>
      )}
      <div className="p-4 text-[#39ff14] leading-relaxed">{children}</div>
    </div>
  );
}
