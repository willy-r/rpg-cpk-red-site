import { ReactNode } from "react";

type NeonColor = "cyan" | "green" | "purple" | "pink" | "yellow";

interface NeonCardProps {
  children: ReactNode;
  color?: NeonColor;
  className?: string;
  hover?: boolean;
}

const colorMap: Record<NeonColor, string> = {
  cyan: "border-[#00f5ff33] border-l-[#00f5ff] hover:shadow-[0_0_15px_rgba(0,245,255,0.15)]",
  green: "border-[#39ff1433] border-l-[#39ff14] hover:shadow-[0_0_15px_rgba(57,255,20,0.15)]",
  purple: "border-[#bf00ff33] border-l-[#bf00ff] hover:shadow-[0_0_15px_rgba(191,0,255,0.15)]",
  pink: "border-[#ff008033] border-l-[#ff0080] hover:shadow-[0_0_15px_rgba(255,0,128,0.15)]",
  yellow: "border-[#ffd70033] border-l-[#ffd700] hover:shadow-[0_0_15px_rgba(255,215,0,0.15)]",
};

export default function NeonCard({
  children,
  color = "cyan",
  className = "",
  hover = true,
}: NeonCardProps) {
  return (
    <div
      className={`bg-[#14141f] border border-l-2 ${colorMap[color]} rounded-none p-4 ${hover ? "transition-shadow duration-300" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
