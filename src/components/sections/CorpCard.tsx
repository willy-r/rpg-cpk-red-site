import type { Corporation } from "@/lib/types";
import NeonCard from "@/components/ui/NeonCard";
import Tag from "@/components/ui/Tag";

interface CorpCardProps {
  corp: Corporation;
}

export default function CorpCard({ corp }: CorpCardProps) {
  return (
    <NeonCard color="yellow">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-display text-base text-[#ffd700] tracking-widest uppercase">
          {corp.name}
        </h4>
        <Tag label={`p.${corp.pageRef}`} color="dim" />
      </div>

      <p className="text-[#4a4a5a] text-xs font-mono tracking-wide mb-3 uppercase">
        {corp.focus}
      </p>

      <p className="text-[#e0e0e0] text-sm font-mono leading-relaxed mb-3">
        {corp.description}
      </p>

      <div className="mb-2">
        <p className="text-[#4a4a5a] text-xs tracking-wider uppercase mb-1">
          Papel no Mundo
        </p>
        <p className="text-[#ffd700] text-xs font-mono">{corp.role}</p>
      </div>

      {corp.keyFigures && corp.keyFigures.length > 0 && (
        <div>
          <p className="text-[#4a4a5a] text-xs tracking-wider uppercase mb-1">
            Figuras-Chave
          </p>
          <div className="flex flex-wrap gap-1">
            {corp.keyFigures.map((fig) => (
              <Tag key={fig} label={fig} color="yellow" />
            ))}
          </div>
        </div>
      )}
    </NeonCard>
  );
}
