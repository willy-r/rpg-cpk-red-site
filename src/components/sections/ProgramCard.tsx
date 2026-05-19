import type { NetProgram } from "@/lib/types";
import NeonCard from "@/components/ui/NeonCard";
import Tag from "@/components/ui/Tag";

interface ProgramCardProps {
  program: NetProgram;
}

const classColors = {
  booster: "cyan",
  attacker: "pink",
  defender: "green",
  "anti-program": "yellow",
} as const;

const classLabels = {
  booster: "Booster",
  attacker: "Atacante",
  defender: "Defensor",
  "anti-program": "Anti-Programa",
};

export default function ProgramCard({ program }: ProgramCardProps) {
  const color = classColors[program.class];

  return (
    <NeonCard color={color}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-display text-sm text-[#e0e0e0] tracking-widest uppercase">
          {program.name}
        </h4>
        <Tag label={classLabels[program.class]} color={color} />
      </div>

      <p className="text-[#8a8a9a] text-xs font-mono leading-relaxed mb-3">
        {program.description}
      </p>

      <p className="text-[#e0e0e0] text-xs font-mono leading-relaxed mb-3 border-l-2 border-[#00f5ff30] pl-3">
        {program.effect}
      </p>

      <div className="flex gap-4 border-t border-[#1e1e2e] pt-3">
        {program.atk !== undefined && (
          <div>
            <p className="text-[#4a4a5a] text-xs uppercase tracking-wider">ATK</p>
            <p className="text-[#ff0080] font-mono font-semibold">{program.atk}</p>
          </div>
        )}
        {program.def !== undefined && (
          <div>
            <p className="text-[#4a4a5a] text-xs uppercase tracking-wider">DEF</p>
            <p className="text-[#39ff14] font-mono font-semibold">{program.def}</p>
          </div>
        )}
        <div>
          <p className="text-[#4a4a5a] text-xs uppercase tracking-wider">REZ</p>
          <p className="text-[#00f5ff] font-mono font-semibold">{program.rez}</p>
        </div>
      </div>
    </NeonCard>
  );
}
