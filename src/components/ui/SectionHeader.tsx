import BookRef from "./BookRef";

type NeonColor = "cyan" | "green" | "purple" | "pink" | "yellow";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  color?: NeonColor;
  id?: string;
  bookPage?: number;
}

const colorMap: Record<NeonColor, string> = {
  cyan: "text-[#00f5ff] border-[#00f5ff40]",
  green: "text-[#39ff14] border-[#39ff1440]",
  purple: "text-[#bf00ff] border-[#bf00ff40]",
  pink: "text-[#ff0080] border-[#ff008040]",
  yellow: "text-[#ffd700] border-[#ffd70040]",
};

export default function SectionHeader({
  title,
  subtitle,
  color = "cyan",
  id,
  bookPage,
}: SectionHeaderProps) {
  return (
    <div className="mb-6" id={id}>
      <div className="flex items-center gap-1 mb-2">
        <h2
          className={`font-display text-2xl tracking-widest uppercase ${colorMap[color].split(" ")[0]}`}
        >
          {title}
        </h2>
        {bookPage && <BookRef page={bookPage} />}
      </div>
      {subtitle && (
        <p className="text-[#8a8a9a] text-sm font-mono mb-3">{subtitle}</p>
      )}
      <div className={`border-t ${colorMap[color].split(" ")[1]} w-full`} />
    </div>
  );
}
