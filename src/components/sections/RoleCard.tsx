import Link from "next/link";
import type { Role, StatKey } from "@/lib/types";
import NeonCard from "@/components/ui/NeonCard";
import Tag from "@/components/ui/Tag";

interface RoleCardProps {
  role: Role;
  compact?: boolean;
}

export default function RoleCard({ role, compact = false }: RoleCardProps) {
  return (
    <NeonCard color="purple" className="h-full flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-display text-lg text-[#bf00ff] tracking-widest uppercase">
            {role.name}
          </h3>
          <p className="text-[#8a8a9a] text-xs font-mono">{role.namePtBr}</p>
        </div>
        <Tag label={`p.${role.pageRef}`} color="dim" />
      </div>

      <p className="text-[#8a8a9a] text-xs font-mono italic mb-3">
        &ldquo;{role.tagline}&rdquo;
      </p>

      {!compact && (
        <p className="text-[#e0e0e0] text-sm font-mono leading-relaxed mb-4">
          {role.description}
        </p>
      )}

      <div className="mb-3">
        <p className="text-[#4a4a5a] text-xs tracking-wider uppercase mb-1">
          Habilidade Especial
        </p>
        <p className="text-[#bf00ff] text-sm font-mono font-semibold">
          {role.abilityName}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-[#4a4a5a] text-xs tracking-wider uppercase mb-2">
          Stats Principais
        </p>
        <div className="flex flex-wrap gap-1">
          {role.keyStats.map((stat: StatKey) => (
            <Tag key={stat} label={stat} color="cyan" />
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <Link
          href={`/personagem/${role.id}`}
          className="inline-block text-xs font-mono text-[#bf00ff] border border-[#bf00ff44] px-3 py-1 hover:bg-[#bf00ff11] transition-colors tracking-wider"
        >
          Ver Detalhes &gt;
        </Link>
      </div>
    </NeonCard>
  );
}
