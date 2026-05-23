import { roles } from "@/data/roles";
import { weapons } from "@/data/weapons";
import { armorPieces } from "@/data/armor";
import { cyberwareItems } from "@/data/cyberware";
import { netPrograms } from "@/data/programs";
import { districts } from "@/data/districts";
import { corporations } from "@/data/corporations";
import { skills } from "@/data/skills";
import { stats } from "@/data/stats";
import { commonGear } from "@/data/economy";

export interface SearchItem {
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  category: string;
  categoryLabel: string;
}

const sections: SearchItem[] = [
  { title: "Cenário", description: "Night City, distritos, corporações e linha do tempo", href: "/cenario", category: "section", categoryLabel: "SEÇÃO" },
  { title: "Personagem", description: "Papéis, atributos, habilidades e criação de personagem", href: "/personagem", category: "section", categoryLabel: "SEÇÃO" },
  { title: "Combate", description: "Regras de combate, iniciativa, dano e recuperação", href: "/combate", category: "section", categoryLabel: "SEÇÃO" },
  { title: "Equipamentos", description: "Armas, armaduras e cyberware", href: "/equipamentos", category: "section", categoryLabel: "SEÇÃO" },
  { title: "Netrunning", description: "Arquitetura NET, programas e hacking", href: "/netrunning", category: "section", categoryLabel: "SEÇÃO" },
  { title: "Economia", description: "Eurobucks, custo de vida e mercado negro", href: "/economia", category: "section", categoryLabel: "SEÇÃO" },
  { title: "Criar Personagem", description: "Assistente passo-a-passo: método Ratos de Rua", href: "/criar-personagem", category: "section", categoryLabel: "SEÇÃO" },
];

export const searchIndex: SearchItem[] = [
  ...sections,

  ...roles.map((r) => ({
    title: r.name,
    subtitle: r.namePtBr,
    description: `${r.tagline} — ${r.abilityName}: ${r.specialAbility}`,
    href: `/personagem/${r.id}`,
    category: "role",
    categoryLabel: "PAPEL",
  })),

  ...stats.map((s) => ({
    title: s.key,
    subtitle: s.name,
    description: s.description,
    href: "/personagem",
    category: "stat",
    categoryLabel: "ATRIBUTO",
  })),

  ...skills.map((s) => ({
    title: s.namePtBr,
    subtitle: s.name,
    description: `${s.category} · ligado a ${s.linkedStat} · ${s.description}`,
    href: "/personagem",
    category: "skill",
    categoryLabel: "PERÍCIA",
  })),

  ...weapons.map((w) => ({
    title: w.name,
    subtitle: w.namePtBr,
    description: `${w.damage} · ${w.cost} eb`,
    href: "/equipamentos",
    category: "weapon",
    categoryLabel: "ARMA",
  })),

  ...armorPieces.map((a) => ({
    title: a.name,
    subtitle: a.namePtBr,
    description: `SP ${a.sp} · ${a.cost} eb`,
    href: "/equipamentos",
    category: "armor",
    categoryLabel: "ARMADURA",
  })),

  ...cyberwareItems.map((c) => ({
    title: c.name,
    subtitle: c.namePtBr,
    description: c.description,
    href: "/equipamentos",
    category: "cyberware",
    categoryLabel: "CYBERWARE",
  })),

  ...netPrograms.map((p) => ({
    title: p.name,
    description: `${p.class} · REZ ${p.rez} · ${p.description}`,
    href: "/netrunning",
    category: "program",
    categoryLabel: "PROGRAMA",
  })),

  ...districts.map((d) => ({
    title: d.name,
    subtitle: d.namePtBr,
    description: d.description,
    href: "/cenario",
    category: "district",
    categoryLabel: "DISTRITO",
  })),

  ...corporations.map((c) => ({
    title: c.name,
    subtitle: c.focus,
    description: c.description,
    href: "/cenario",
    category: "corporation",
    categoryLabel: "CORPORAÇÃO",
  })),

  ...commonGear.map((g) => ({
    title: g.name,
    subtitle: g.namePtBr,
    description: `${g.category} · ${g.cost} eb${g.notes ? ` · ${g.notes}` : ""}`,
    href: "/economia",
    category: "economy",
    categoryLabel: "ITEM",
  })),
];
