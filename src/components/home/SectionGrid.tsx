import Link from "next/link";

const sections = [
  {
    href: "/cenario",
    title: "Cenário",
    subtitle: "Lore & Night City",
    description: "Night City, megacorporações, distritos e a linha do tempo do Futuro Negro.",
    color: "cyan",
    borderColor: "border-[#00f5ff40]",
    hoverBorder: "hover:border-[#00f5ff]",
    textColor: "text-[#00f5ff]",
    bgHover: "hover:bg-[#00f5ff08]",
  },
  {
    href: "/personagem",
    title: "Personagem",
    subtitle: "Criação & Papéis",
    description: "Os 10 papéis, estatísticas, habilidades e métodos de criação de personagem.",
    color: "green",
    borderColor: "border-[#39ff1440]",
    hoverBorder: "hover:border-[#39ff14]",
    textColor: "text-[#39ff14]",
    bgHover: "hover:bg-[#39ff1408]",
  },
  {
    href: "/combate",
    title: "Combate",
    subtitle: "Friday Night Firefight",
    description: "Iniciativa, ações, armas, armaduras e o sistema de ferimentos.",
    color: "pink",
    borderColor: "border-[#ff008040]",
    hoverBorder: "hover:border-[#ff0080]",
    textColor: "text-[#ff0080]",
    bgHover: "hover:bg-[#ff008008]",
  },
  {
    href: "/equipamentos",
    title: "Equipamentos",
    subtitle: "Armas & Cyberware",
    description: "Catálogo de cyberware, armas, armaduras e a mecânica de Ciberpsicose.",
    color: "purple",
    borderColor: "border-[#bf00ff40]",
    hoverBorder: "hover:border-[#bf00ff]",
    textColor: "text-[#bf00ff]",
    bgHover: "hover:bg-[#bf00ff08]",
  },
  {
    href: "/netrunning",
    title: "Netrunning",
    subtitle: "Hacking & NET",
    description: "Como invadir sistemas, programas de Netrunner e o combate na NET.",
    color: "cyan",
    borderColor: "border-[#00f5ff40]",
    hoverBorder: "hover:border-[#00f5ff]",
    textColor: "text-[#00f5ff]",
    bgHover: "hover:bg-[#00f5ff08]",
  },
  {
    href: "/economia",
    title: "Economia",
    subtitle: "Eurobucks & Mercado",
    description: "Níveis de vida, Mercado Noturno e como sobreviver em Night City.",
    color: "yellow",
    borderColor: "border-[#ffd70040]",
    hoverBorder: "hover:border-[#ffd700]",
    textColor: "text-[#ffd700]",
    bgHover: "hover:bg-[#ffd70008]",
  },
];

export default function SectionGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className={`block bg-[#14141f] border ${section.borderColor} ${section.hoverBorder} ${section.bgHover} p-6 transition-all duration-300 group`}
          >
            <div className="mb-4">
              <p className={`text-xs font-mono tracking-widest uppercase ${section.textColor} mb-1`}>
                {section.subtitle}
              </p>
              <h3 className={`font-display text-2xl tracking-widest uppercase ${section.textColor}`}>
                {section.title}
              </h3>
            </div>
            <p className="text-[#8a8a9a] text-sm font-mono leading-relaxed">
              {section.description}
            </p>
            <div className={`mt-4 text-xs font-mono ${section.textColor} opacity-0 group-hover:opacity-100 transition-opacity tracking-wider`}>
              Acessar &gt;
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
