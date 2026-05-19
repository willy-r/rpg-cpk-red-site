import type { District, DistrictType } from "@/lib/types";
import NeonCard from "@/components/ui/NeonCard";
import Tag from "@/components/ui/Tag";

interface DistrictCardProps {
  district: District;
}

const typeLabels: Record<DistrictType, string> = {
  corporate: "Corporativo",
  "combat-zone": "Zona de Combate",
  residential: "Residencial",
  entertainment: "Entretenimento",
  industrial: "Industrial",
};

const typeColors = {
  corporate: "cyan",
  "combat-zone": "pink",
  residential: "green",
  entertainment: "purple",
  industrial: "yellow",
} as const;

function SafetyDots({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < level ? "bg-[#39ff14]" : "bg-[#1e1e2e]"
          }`}
        />
      ))}
    </div>
  );
}

export default function DistrictCard({ district }: DistrictCardProps) {
  const color = typeColors[district.type];

  return (
    <NeonCard color={color}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-[#e0e0e0] font-mono font-semibold">
          {district.namePtBr ?? district.name}
        </h4>
        <Tag label={typeLabels[district.type]} color={color} />
      </div>

      <p className="text-[#8a8a9a] text-xs font-mono leading-relaxed mb-3">
        {district.description}
      </p>

      <div className="flex items-center gap-3 mb-3">
        <p className="text-[#4a4a5a] text-xs tracking-wider uppercase">
          Segurança
        </p>
        <SafetyDots level={district.safetyLevel} />
      </div>

      {district.notableLocations.length > 0 && (
        <div>
          <p className="text-[#4a4a5a] text-xs tracking-wider uppercase mb-1">
            Locais Notáveis
          </p>
          <ul className="space-y-0.5">
            {district.notableLocations.map((loc) => (
              <li key={loc} className="text-xs font-mono text-[#8a8a9a]">
                &gt; {loc}
              </li>
            ))}
          </ul>
        </div>
      )}
    </NeonCard>
  );
}
