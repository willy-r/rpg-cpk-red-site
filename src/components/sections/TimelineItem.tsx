import type { TimelineEvent, TimelineArc } from "@/lib/types";
import Tag from "@/components/ui/Tag";

interface TimelineItemProps {
  event: TimelineEvent;
  isLast?: boolean;
}

const arcColors = {
  founding: "yellow",
  "never-fade-away": "purple",
  "fall-of-towers": "pink",
  "time-of-red": "cyan",
} as const;

const arcLabels: Record<TimelineArc, string> = {
  founding: "Fundação",
  "never-fade-away": "Never Fade Away",
  "fall-of-towers": "A Queda",
  "time-of-red": "Hora do Vermelho",
};

export default function TimelineItem({ event, isLast = false }: TimelineItemProps) {
  const color = arcColors[event.arc];
  const dotColor =
    color === "cyan"
      ? "bg-[#00f5ff]"
      : color === "yellow"
      ? "bg-[#ffd700]"
      : color === "purple"
      ? "bg-[#bf00ff]"
      : "bg-[#ff0080]";
  const lineColor =
    color === "cyan"
      ? "border-[#00f5ff30]"
      : color === "yellow"
      ? "border-[#ffd70030]"
      : color === "purple"
      ? "border-[#bf00ff30]"
      : "border-[#ff008030]";

  return (
    <div className="flex gap-4">
      {/* Line + dot */}
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full ${dotColor} mt-1 shrink-0 shadow-[0_0_8px_currentColor]`} />
        {!isLast && <div className={`flex-1 w-px border-l ${lineColor} mt-1`} />}
      </div>

      {/* Content */}
      <div className="pb-8 flex-1">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="font-display text-xl text-[#e0e0e0] tracking-widest">
            {event.year}
          </span>
          <Tag label={arcLabels[event.arc]} color={color} />
        </div>
        <h4 className="text-[#e0e0e0] font-mono font-semibold mb-1">
          {event.title}
        </h4>
        <p className="text-[#8a8a9a] text-sm font-mono leading-relaxed">
          {event.description}
        </p>
      </div>
    </div>
  );
}
