type NeonColor = "cyan" | "green" | "purple" | "pink" | "yellow" | "dim";

interface TagProps {
  label: string;
  color?: NeonColor;
}

const colorMap: Record<NeonColor, string> = {
  cyan: "text-[#00f5ff] border-[#00f5ff44] bg-[#00f5ff11]",
  green: "text-[#39ff14] border-[#39ff1444] bg-[#39ff1411]",
  purple: "text-[#bf00ff] border-[#bf00ff44] bg-[#bf00ff11]",
  pink: "text-[#ff0080] border-[#ff008044] bg-[#ff008011]",
  yellow: "text-[#ffd700] border-[#ffd70044] bg-[#ffd70011]",
  dim: "text-[#4a4a5a] border-[#4a4a5a44] bg-[#4a4a5a11]",
};

export default function Tag({ label, color = "cyan" }: TagProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs font-mono border ${colorMap[color]} tracking-wider`}
    >
      {label}
    </span>
  );
}
