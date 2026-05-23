import SectionHeader from "@/components/ui/SectionHeader";
import NeonCard from "@/components/ui/NeonCard";
import TerminalBox from "@/components/ui/TerminalBox";
import Sidebar from "@/components/layout/Sidebar";
import DisclaimerBanner from "@/components/ui/DisclaimerBanner";
import TimelineItem from "@/components/sections/TimelineItem";
import DistrictCard from "@/components/sections/DistrictCard";
import CorpCard from "@/components/sections/CorpCard";
import { timelineEvents } from "@/data/timeline";
import { districts } from "@/data/districts";
import { corporations } from "@/data/corporations";
import { slangTerms } from "@/data/slang";

const sidebarItems = [
  { label: "O Futuro Negro", anchor: "futuro-negro" },
  { label: "Linha do Tempo", anchor: "timeline" },
  { label: "Night City", anchor: "night-city" },
  { label: "Megacorporações", anchor: "corporations" },
  { label: "Gírias da Rua", anchor: "slang" },
];

export default function CenarioPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <p className="font-mono text-xs text-[#8a8a9a] tracking-widest uppercase mb-2">
          &gt; Módulo 01
        </p>
        <h1 className="font-display text-4xl text-[#00f5ff] tracking-widest uppercase mb-3">
          Cenário
        </h1>
        <p className="font-mono text-[#8a8a9a] text-sm max-w-2xl">
          O mundo de Cyberpunk RED é sombrio, violento e tecnologicamente avançado. Night City é o palco — uma metrópole californiana onde corporações governam com força letal e Edgerunners correm jobs para sobreviver.
        </p>
      </div>

      <DisclaimerBanner />

      <div className="flex gap-8">
        <Sidebar items={sidebarItems} />

        <div className="flex-1 space-y-16">
          {/* O Futuro Negro */}
          <section id="futuro-negro">
            <SectionHeader
              title="O Futuro Negro"
              subtitle="O mundo em 2045"
              color="cyan"
              bookPage={233}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NeonCard color="cyan">
                <h3 className="font-mono text-[#00f5ff] font-semibold mb-2">A Hora do Vermelho</h3>
                <p className="text-[#8a8a9a] text-sm font-mono leading-relaxed">
                  2045. O mundo ainda se recupera da Queda das Torres em 2022. O céu está tingido de vermelho pela poeira dos eventos que quase desfizeram a civilização. As megacorporações reconsolidam poder enquanto as cidades tentam se reconstruir.
                </p>
              </NeonCard>
              <NeonCard color="cyan">
                <h3 className="font-mono text-[#00f5ff] font-semibold mb-2">O Estilo de Vida</h3>
                <p className="text-[#8a8a9a] text-sm font-mono leading-relaxed">
                  &ldquo;Style over substance&rdquo; — em Night City, a aparência é sobrevivência. Cyberware de moda, roupas de grife e armas personalizadas definem quem você é. Parecer poderoso pode ser tão importante quanto ser poderoso.
                </p>
              </NeonCard>
              <NeonCard color="cyan">
                <h3 className="font-mono text-[#00f5ff] font-semibold mb-2">O Poder Real</h3>
                <p className="text-[#8a8a9a] text-sm font-mono leading-relaxed">
                  Os governos existem, mas as megacorporações governam. Arasaka, Militech e Petrochem têm exércitos privados, sistemas judiciais próprios e mais dinheiro que países inteiros. A polícia da NCPD existe — mas a Trauma Team só responde se você puder pagar.
                </p>
              </NeonCard>
              <NeonCard color="cyan">
                <h3 className="font-mono text-[#00f5ff] font-semibold mb-2">Os Edgerunners</h3>
                <p className="text-[#8a8a9a] text-sm font-mono leading-relaxed">
                  Você é um Edgerunner — mercenário do submundo que vive no limite. Roubo corporativo, assassinatos, infiltrações. Os jobs são perigosos, o pagamento é bom, e a expectativa de vida é tragicamente curta. Mas as alternativas são piores.
                </p>
              </NeonCard>
            </div>
          </section>

          {/* Timeline */}
          <section id="timeline">
            <SectionHeader
              title="Linha do Tempo"
              subtitle="Os eventos que moldaram o mundo"
              color="cyan"
              bookPage={236}
            />
            <div>
              {timelineEvents.map((event, i) => (
                <TimelineItem
                  key={event.year}
                  event={event}
                  isLast={i === timelineEvents.length - 1}
                />
              ))}
            </div>
          </section>

          {/* Night City */}
          <section id="night-city">
            <SectionHeader
              title="Night City"
              subtitle="A cidade que nunca dorme — porque dormir é morrer"
              color="cyan"
              bookPage={283}
            />
            <NeonCard color="cyan" className="mb-6">
              <p className="text-[#8a8a9a] text-sm font-mono leading-relaxed mb-3">
                Fundada por Richard Night em Morro Bay, Califórnia, Night City foi projetada para ser a cidade perfeita — planejada, autossuficiente, sem crime. A ambição foi esmagada quando Night foi assassinado pela máfia em 1998.
              </p>
              <p className="text-[#8a8a9a] text-sm font-mono leading-relaxed">
                Hoje é um furacão de neotecnologia e violência, uma metrópole de camadas sobrepostas de concreto e neon onde cada bairro tem suas próprias regras — e seus próprios mortos.
              </p>
            </NeonCard>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {districts.map((district) => (
                <DistrictCard key={district.name} district={district} />
              ))}
            </div>
          </section>

          {/* Megacorporações */}
          <section id="corporations">
            <SectionHeader
              title="Megacorporações"
              subtitle="Os verdadeiros governantes do mundo"
              color="yellow"
              bookPage={264}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {corporations.map((corp) => (
                <CorpCard key={corp.name} corp={corp} />
              ))}
            </div>
          </section>

          {/* Gírias */}
          <section id="slang">
            <SectionHeader
              title="Gírias da Rua"
              subtitle="O vocabulário dos Edgerunners"
              color="green"
              bookPage={24}
            />
            <TerminalBox label="DICIONÁRIO DE RUA — NIGHT CITY">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                {slangTerms.map((term) => (
                  <div key={term.term} className="flex gap-2 text-xs">
                    <span className="text-[#00f5ff] shrink-0 font-semibold">{term.term}:</span>
                    <span className="text-[#8a8a9a]">{term.definition}</span>
                  </div>
                ))}
              </div>
            </TerminalBox>
          </section>
        </div>
      </div>
    </div>
  );
}
