import { notFound } from "next/navigation";
import Link from "next/link";
import { roles } from "@/data/roles";
import NeonCard from "@/components/ui/NeonCard";
import Tag from "@/components/ui/Tag";
import TerminalBox from "@/components/ui/TerminalBox";
import SectionHeader from "@/components/ui/SectionHeader";
import type { StatKey } from "@/lib/types";

export function generateStaticParams() {
  return roles.map((role) => ({ role: role.id }));
}

interface PageProps {
  params: Promise<{ role: string }>;
}

export default async function RolePage({ params }: PageProps) {
  const { role: roleId } = await params;
  const role = roles.find((r) => r.id === roleId);

  if (!role) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <Link
          href="/personagem"
          className="text-xs font-mono text-[#4a4a5a] hover:text-[#8a8a9a] transition-colors tracking-wider"
        >
          &lt; Voltar para Personagem
        </Link>
      </div>

      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-xs text-[#4a4a5a] tracking-widest uppercase mb-2">
          &gt; Papel
        </p>
        <h1
          className="font-display text-5xl sm:text-6xl font-black tracking-widest uppercase text-[#bf00ff] mb-2"
          style={{ textShadow: "0 0 10px #bf00ff, 0 0 30px rgba(191,0,255,0.3)" }}
        >
          {role.name}
        </h1>
        <p className="font-mono text-[#8a8a9a] text-base mb-4">{role.namePtBr}</p>
        <p className="font-mono text-[#8a8a9a] text-sm italic max-w-xl">
          &ldquo;{role.tagline}&rdquo;
        </p>
      </div>

      {/* Description */}
      <div className="mb-8">
        <NeonCard color="purple">
          <p className="text-[#e0e0e0] font-mono text-sm leading-relaxed">
            {role.description}
          </p>
        </NeonCard>
      </div>

      {/* Special Ability */}
      <div className="mb-8">
        <SectionHeader
          title="Habilidade Especial"
          color="purple"
        />
        <NeonCard color="purple" className="border-l-4">
          <div className="mb-2">
            <h3 className="font-display text-xl text-[#bf00ff] tracking-widest uppercase">
              {role.abilityName}
            </h3>
          </div>
          <p className="text-[#e0e0e0] font-mono text-sm leading-relaxed">
            {role.specialAbility}
          </p>
        </NeonCard>
      </div>

      {/* Key Stats */}
      <div className="mb-8">
        <SectionHeader title="Stats Principais" color="cyan" />
        <div className="flex flex-wrap gap-3">
          {role.keyStats.map((stat: StatKey) => (
            <div
              key={stat}
              className="bg-[#14141f] border border-[#00f5ff40] px-6 py-4 text-center"
            >
              <div className="font-display text-2xl text-[#00f5ff] font-black tracking-widest">
                {stat}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typical Gear */}
      <div className="mb-8">
        <SectionHeader title="Equipamento Típico" color="green" />
        <TerminalBox label={`LOADOUT — ${role.name.toUpperCase()}`}>
          <ul className="space-y-1">
            {role.typicalGear.map((item) => (
              <li key={item} className="text-sm">
                <span className="text-[#39ff14]">&gt;</span>{" "}
                <span className="text-[#e0e0e0]">{item}</span>
              </li>
            ))}
          </ul>
        </TerminalBox>
      </div>

      {/* Reference */}
      <div className="flex items-center justify-between border-t border-[#1e1e2e] pt-6">
        <Tag label={`Referência: p.${role.pageRef}`} color="dim" />
        <Link
          href="/personagem"
          className="text-xs font-mono text-[#4a4a5a] hover:text-[#8a8a9a] transition-colors tracking-wider"
        >
          &lt; Ver todos os Papéis
        </Link>
      </div>
    </div>
  );
}
