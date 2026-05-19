import SectionHeader from "@/components/ui/SectionHeader";
import NeonCard from "@/components/ui/NeonCard";
import TerminalBox from "@/components/ui/TerminalBox";
import Sidebar from "@/components/layout/Sidebar";
import StatGrid from "@/components/sections/StatGrid";
import RoleCard from "@/components/sections/RoleCard";
import { roles } from "@/data/roles";
import { skills } from "@/data/skills";

const sidebarItems = [
  { label: "Métodos de Criação", anchor: "metodos" },
  { label: "Estatísticas", anchor: "stats" },
  { label: "Os 10 Papéis", anchor: "roles" },
  { label: "Caminho de Vida", anchor: "lifepath" },
  { label: "Habilidades", anchor: "skills" },
];

const skillCategories = [...new Set(skills.map((s) => s.category))];

export default function PersonagemPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <p className="font-mono text-xs text-[#8a8a9a] tracking-widest uppercase mb-2">
          &gt; Módulo 02
        </p>
        <h1 className="font-display text-4xl text-[#39ff14] tracking-widest uppercase mb-3">
          Personagem
        </h1>
        <p className="font-mono text-[#8a8a9a] text-sm max-w-2xl">
          Em Cyberpunk RED existem 10 Papéis — Rockerboy, Solo, Netrunner, Tech, Medtech, Media, Exec, Lawman, Fixer e Nomad. Cada um tem uma Habilidade Especial exclusiva que nenhum outro personagem pode usar.
        </p>
      </div>

      <div className="flex gap-8">
        <Sidebar items={sidebarItems} />

        <div className="flex-1 space-y-16">
          {/* Métodos de criação */}
          <section id="metodos">
            <SectionHeader
              title="Métodos de Criação"
              subtitle="Três formas de criar seu Edgerunner"
              color="green"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <NeonCard color="green">
                <h3 className="font-mono text-[#39ff14] font-semibold mb-2">Streetrat</h3>
                <p className="text-[#4a4a5a] text-xs font-mono uppercase tracking-wider mb-3">
                  Iniciante nas ruas
                </p>
                <ul className="space-y-1 text-sm font-mono text-[#8a8a9a]">
                  <li>&gt; Equipamento pré-determinado</li>
                  <li>&gt; Sem escolhas de gear</li>
                  <li>&gt; Ideal para novos jogadores</li>
                  <li>&gt; Começa com o básico</li>
                </ul>
              </NeonCard>
              <NeonCard color="cyan">
                <h3 className="font-mono text-[#00f5ff] font-semibold mb-2">Edgerunner</h3>
                <p className="text-[#4a4a5a] text-xs font-mono uppercase tracking-wider mb-3">
                  Veterano das ruas
                </p>
                <ul className="space-y-1 text-sm font-mono text-[#8a8a9a]">
                  <li>&gt; Algumas escolhas de equipamento</li>
                  <li>&gt; Experiência moderada</li>
                  <li>&gt; Bom equilíbrio</li>
                  <li>&gt; Recomendado para a maioria</li>
                </ul>
              </NeonCard>
              <NeonCard color="yellow">
                <h3 className="font-mono text-[#ffd700] font-semibold mb-2">Pacote Completo</h3>
                <p className="text-[#4a4a5a] text-xs font-mono uppercase tracking-wider mb-3">
                  2.550 eb em gear
                </p>
                <ul className="space-y-1 text-sm font-mono text-[#8a8a9a]">
                  <li>&gt; 2.550 eb para equipamentos</li>
                  <li>&gt; + 800 eb para fashion</li>
                  <li>&gt; Máxima customização</li>
                  <li>&gt; Para jogadores experientes</li>
                </ul>
              </NeonCard>
            </div>
          </section>

          {/* Stats */}
          <section id="stats">
            <SectionHeader
              title="Estatísticas"
              subtitle="Os 10 atributos base — escala de 1 a 8 (podendo ultrapassar com cyberware)"
              color="green"
            />
            <StatGrid />
          </section>

          {/* Roles */}
          <section id="roles">
            <SectionHeader
              title="Os 10 Papéis"
              subtitle="Cada papel possui uma Habilidade Especial única"
              color="purple"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {roles.map((role) => (
                <RoleCard key={role.id} role={role} compact />
              ))}
            </div>
          </section>

          {/* Caminho de Vida */}
          <section id="lifepath">
            <SectionHeader
              title="Caminho de Vida"
              subtitle="A história do seu Edgerunner antes do jogo começa"
              color="cyan"
            />
            <TerminalBox label="PROTOCOLO DE CRIAÇÃO — LIFEPATH">
              <ol className="space-y-3 text-sm">
                <li>
                  <span className="text-[#00f5ff]">01.</span>{" "}
                  <span className="text-[#e0e0e0]">Escolha seu Papel</span>
                  <p className="text-[#8a8a9a] ml-6 text-xs mt-0.5">O papel define sua Habilidade Especial e estilo de jogo</p>
                </li>
                <li>
                  <span className="text-[#00f5ff]">02.</span>{" "}
                  <span className="text-[#e0e0e0]">Distribua os pontos de STAT</span>
                  <p className="text-[#8a8a9a] ml-6 text-xs mt-0.5">62 pontos distribuídos entre os 10 atributos (máximo 8 por stat)</p>
                </li>
                <li>
                  <span className="text-[#00f5ff]">03.</span>{" "}
                  <span className="text-[#e0e0e0]">Distribua os pontos de Habilidade</span>
                  <p className="text-[#8a8a9a] ml-6 text-xs mt-0.5">86 pontos para habilidades — no máximo 6 em qualquer habilidade na criação</p>
                </li>
                <li>
                  <span className="text-[#00f5ff]">04.</span>{" "}
                  <span className="text-[#e0e0e0]">Escolha sua origem cultural</span>
                  <p className="text-[#8a8a9a] ml-6 text-xs mt-0.5">Determina língua natal e contexto de background</p>
                </li>
                <li>
                  <span className="text-[#00f5ff]">05.</span>{" "}
                  <span className="text-[#e0e0e0]">Role o Caminho de Vida</span>
                  <p className="text-[#8a8a9a] ml-6 text-xs mt-0.5">Família, amigos, inimigos e eventos marcantes do passado</p>
                </li>
                <li>
                  <span className="text-[#00f5ff]">06.</span>{" "}
                  <span className="text-[#e0e0e0]">Selecione Equipamentos</span>
                  <p className="text-[#8a8a9a] ml-6 text-xs mt-0.5">Baseado no método de criação escolhido</p>
                </li>
                <li>
                  <span className="text-[#00f5ff]">07.</span>{" "}
                  <span className="text-[#e0e0e0]">Calcule HP e outros valores derivados</span>
                  <p className="text-[#8a8a9a] ml-6 text-xs mt-0.5">HP = 10 + (5 × [(WILL + BODY) / 2]), arredondado para cima</p>
                </li>
              </ol>
            </TerminalBox>
          </section>

          {/* Habilidades */}
          <section id="skills">
            <SectionHeader
              title="Habilidades"
              subtitle="Todas as habilidades e seus atributos base"
              color="green"
            />
            <div className="space-y-6">
              {skillCategories.map((cat) => {
                const catSkills = skills.filter((s) => s.category === cat);
                return (
                  <div key={cat}>
                    <p className="text-[#4a4a5a] text-xs font-mono tracking-widest uppercase mb-3 border-b border-[#1e1e2e] pb-1">
                      {cat}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {catSkills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center justify-between p-2 bg-[#0f0f1a] border border-[#1e1e2e] hover:border-[#39ff1430] transition-colors"
                        >
                          <span className="text-[#e0e0e0] text-xs font-mono">
                            {skill.namePtBr}
                          </span>
                          <span className="text-[#39ff14] text-xs font-mono font-semibold ml-2 shrink-0">
                            {skill.linkedStat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
