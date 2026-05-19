import SectionHeader from "@/components/ui/SectionHeader";
import NeonCard from "@/components/ui/NeonCard";
import TerminalBox from "@/components/ui/TerminalBox";
import Sidebar from "@/components/layout/Sidebar";
import ProgramCard from "@/components/sections/ProgramCard";
import { netPrograms } from "@/data/programs";

const sidebarItems = [
  { label: "O que é Netrunning", anchor: "intro" },
  { label: "Requisitos", anchor: "requisitos" },
  { label: "Arquitetura NET", anchor: "arquitetura" },
  { label: "Programas", anchor: "programas" },
  { label: "Black ICE", anchor: "black-ice" },
  { label: "Fazendo um Netrun", anchor: "netrun" },
];

export default function NetrunningPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <p className="font-mono text-xs text-[#8a8a9a] tracking-widest uppercase mb-2">
          &gt; Módulo 05
        </p>
        <h1 className="font-display text-4xl text-[#00f5ff] tracking-widest uppercase mb-3">
          Netrunning
        </h1>
        <p className="font-mono text-[#8a8a9a] text-sm max-w-2xl">
          A guerra invisível na NET. Enquanto o grupo atira em guardas no mundo real, o Netrunner invade sistemas, desativa câmeras e derruba defesas — ou morre na tentativa.
        </p>
      </div>

      <div className="flex gap-8">
        <Sidebar items={sidebarItems} />

        <div className="flex-1 space-y-16">
          {/* Intro */}
          <section id="intro">
            <SectionHeader
              title="O que é Netrunning"
              subtitle="Hacking em tempo real — com riscos letais"
              color="cyan"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NeonCard color="cyan">
                <h3 className="font-mono text-[#00f5ff] font-semibold mb-2">A NET</h3>
                <p className="text-[#8a8a9a] text-sm font-mono leading-relaxed">
                  A NET é uma realidade digital alternativa onde dados se tornam arquiteturas virtuais. Sistemas corporativos aparecem como fortalezas; bancos de dados como cofres. Netrunners navegam este espaço para roubar, sabotar ou destruir.
                </p>
              </NeonCard>
              <NeonCard color="cyan">
                <h3 className="font-mono text-[#00f5ff] font-semibold mb-2">A Ameaça</h3>
                <p className="text-[#8a8a9a] text-sm font-mono leading-relaxed">
                  Sistemas protegidos por ICE (Programas de Contra-Intrusão). O Black ICE é a versão letal — pode causar dano real ao sistema nervoso do Netrunner conectado. Um Netrunner morto na NET está morto no mundo real.
                </p>
              </NeonCard>
            </div>
          </section>

          {/* Requisitos */}
          <section id="requisitos">
            <SectionHeader
              title="Requisitos"
              subtitle="O que você precisa para netrunning"
              color="cyan"
            />
            <TerminalBox label="EQUIPAMENTO OBRIGATÓRIO">
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <span className="text-[#00f5ff] shrink-0">01.</span>
                  <div>
                    <span className="text-[#e0e0e0] font-semibold">Interface Neural (Neural Link)</span>
                    <p className="text-[#8a8a9a] mt-0.5">Implante obrigatório para conectar à NET. Custo: 500 eb.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#00f5ff] shrink-0">02.</span>
                  <div>
                    <span className="text-[#e0e0e0] font-semibold">Cyberdeck</span>
                    <p className="text-[#8a8a9a] mt-0.5">Dispositivo que carrega os Programas. 7 slots básicos. Custo: 500 eb.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#00f5ff] shrink-0">03.</span>
                  <div>
                    <span className="text-[#e0e0e0] font-semibold">Habilidade de Interface (Papel: Netrunner)</span>
                    <p className="text-[#8a8a9a] mt-0.5">Apenas Netrunners têm acesso completo às capacidades do Cyberdeck.</p>
                  </div>
                </div>
              </div>
            </TerminalBox>
          </section>

          {/* Arquitetura NET */}
          <section id="arquitetura">
            <SectionHeader
              title="Arquitetura NET"
              subtitle="Estrutura de um sistema a ser invadido"
              color="cyan"
            />
            <NeonCard color="cyan" className="mb-4">
              <p className="text-[#8a8a9a] text-sm font-mono leading-relaxed">
                Cada sistema corporativo na NET é representado como uma arquitetura de andares. Cada andar pode conter ICE (defesas), dados para roubo, controles de sistema ou outras ameaças. O Netrunner se move pelos andares, enfrentando ou evitando cada obstáculo.
              </p>
            </NeonCard>

            <div className="border border-[#00f5ff30] bg-[#0f0f1a] p-4 font-mono text-xs">
              <div className="text-[#4a4a5a] mb-4 tracking-widest uppercase">Exemplo de Arquitetura — Andar por Andar</div>
              <div className="space-y-2">
                {[
                  { floor: "ANDAR 6", content: "DADOS DO ALVO", color: "text-[#ffd700]", bg: "bg-[#ffd70011] border-[#ffd70040]" },
                  { floor: "ANDAR 5", content: "BLACK ICE — Hellhound", color: "text-[#ff0080]", bg: "bg-[#ff008011] border-[#ff008040]" },
                  { floor: "ANDAR 4", content: "CONTROLES DE SISTEMA", color: "text-[#00f5ff]", bg: "bg-[#00f5ff11] border-[#00f5ff40]" },
                  { floor: "ANDAR 3", content: "ICE — Skunk (Alarme)", color: "text-[#ffd700]", bg: "bg-[#ffd70011] border-[#ffd70040]" },
                  { floor: "ANDAR 2", content: "ICE — Asp (Cegante)", color: "text-[#ffd700]", bg: "bg-[#ffd70011] border-[#ffd70040]" },
                  { floor: "ANDAR 1", content: "ENTRADA — Senha ou Brute Force", color: "text-[#39ff14]", bg: "bg-[#39ff1411] border-[#39ff1440]" },
                ].map(({ floor, content, color, bg }) => (
                  <div key={floor} className={`flex items-center gap-4 border ${bg} px-4 py-2`}>
                    <span className="text-[#4a4a5a] w-16 shrink-0">{floor}</span>
                    <span className={color}>{content}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Programas */}
          <section id="programas">
            <SectionHeader
              title="Programas"
              subtitle="Ferramentas digitais do Netrunner"
              color="cyan"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {netPrograms.map((program) => (
                <ProgramCard key={program.name} program={program} />
              ))}
            </div>
          </section>

          {/* Black ICE */}
          <section id="black-ice">
            <SectionHeader
              title="Black ICE"
              subtitle="O inimigo letal na NET"
              color="pink"
            />
            <NeonCard color="pink">
              <h3 className="font-mono text-[#ff0080] font-semibold mb-3">Por que é diferente do ICE comum</h3>
              <p className="text-[#8a8a9a] text-sm font-mono leading-relaxed mb-3">
                ICE comum pode te derrubar da NET. <span className="text-[#ff0080]">Black ICE</span> pode te matar. Esses programas causam dano real ao sistema nervoso do Netrunner através da Interface Neural — um ataque bem-sucedido do Black ICE pode significar parada cardíaca no mundo real.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[#4a4a5a] text-xs uppercase tracking-wider mb-2">ICE Comum</p>
                  <ul className="space-y-1 text-[#8a8a9a] font-mono text-xs">
                    <li>&gt; Derruba conexão (Skunk)</li>
                    <li>&gt; Cega temporariamente (Asp)</li>
                    <li>&gt; Rastreia origem (Scout)</li>
                    <li>&gt; Aciona alarmes (Watchdog)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[#ff0080] text-xs uppercase tracking-wider mb-2">Black ICE</p>
                  <ul className="space-y-1 text-[#8a8a9a] font-mono text-xs">
                    <li className="text-[#ff0080]">&gt; Hellhound — 3d6 dano neural</li>
                    <li className="text-[#ff0080]">&gt; Dragon — 3d6 dano, ataques duplos</li>
                    <li className="text-[#ff0080]">&gt; Liche — Paralisia total</li>
                    <li className="text-[#ff0080]">&gt; Raven — Mata instantaneamente</li>
                  </ul>
                </div>
              </div>
            </NeonCard>
          </section>

          {/* Netrun */}
          <section id="netrun">
            <SectionHeader
              title="Fazendo um Netrun"
              subtitle="Passo a passo de uma invasão"
              color="cyan"
            />
            <TerminalBox label="PROTOCOLO DE NETRUN">
              <ol className="space-y-3 text-sm">
                {[
                  ["Localizar a entrada", "Encontrar o nó de acesso físico ou remoto ao sistema alvo."],
                  ["Conectar", "Usar Interface Neural + Cyberdeck. Ação: Entrar na NET."],
                  ["Navegar a arquitetura", "Mover-se pelos andares — 1 andar por ação na NET."],
                  ["Enfrentar ICE", "Rolar Interface + INT + 1d10 vs nível do ICE. Usar programas defensivos."],
                  ["Atingir o objetivo", "Roubar dados (Eraser), controlar sistemas ou destruir arquivos."],
                  ["Extrair", "Desconectar-se com segurança — ou ser arrancado pela força."],
                ].map(([step, desc], i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#00f5ff] shrink-0 font-bold">0{i + 1}.</span>
                    <div>
                      <span className="text-[#e0e0e0] font-semibold">{step}</span>
                      <p className="text-[#8a8a9a] mt-0.5 text-xs">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </TerminalBox>
          </section>
        </div>
      </div>
    </div>
  );
}
