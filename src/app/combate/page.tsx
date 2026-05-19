import SectionHeader from "@/components/ui/SectionHeader";
import NeonCard from "@/components/ui/NeonCard";
import TerminalBox from "@/components/ui/TerminalBox";
import Table from "@/components/ui/Table";
import Sidebar from "@/components/layout/Sidebar";
import { weapons } from "@/data/weapons";
import { armorPieces } from "@/data/armor";
import type { Weapon, ArmorPiece } from "@/lib/types";

const sidebarItems = [
  { label: "Estrutura do Turno", anchor: "turno" },
  { label: "Iniciativa", anchor: "iniciativa" },
  { label: "Combate à Distância", anchor: "distancia" },
  { label: "Combate Corpo a Corpo", anchor: "melee" },
  { label: "Armas", anchor: "armas" },
  { label: "Armadura", anchor: "armadura" },
  { label: "Cobertura", anchor: "cobertura" },
  { label: "Ferimentos", anchor: "ferimentos" },
];

const weaponTypeLabels: Record<string, string> = {
  pistol: "Pistola",
  smg: "Submetralhadora",
  rifle: "Rifle",
  shotgun: "Escopeta",
  melee: "Melee",
  heavy: "Pesada",
  grenade: "Granada",
};

const coverData = [
  { material: "Porta de Madeira", hp: "5 HP", sp: "5", notes: "Armas pesadas passam facilmente" },
  { material: "Porta de Vidro", hp: "2 HP", sp: "0", notes: "Não oferece proteção real" },
  { material: "Porta de Carro", hp: "25 HP", sp: "14", notes: "Cobertura de combate decente" },
  { material: "Motor de Carro", hp: "35 HP", sp: "18", notes: "Cobertura pesada" },
  { material: "Parede de Tijolos", hp: "35 HP", sp: "12", notes: "Proteção sólida" },
  { material: "Parede de Concreto", hp: "50 HP", sp: "15", notes: "Cobertura de alto nível" },
  { material: "Cofre Bancário", hp: "50 HP", sp: "20", notes: "Quase impenetrável" },
];

export default function CombatePage() {
  const wepColumns = [
    { key: "namePtBr", header: "Arma", color: "cyan" as const },
    { key: "type", header: "Tipo", render: (w: Weapon) => weaponTypeLabels[w.type] ?? w.type },
    { key: "damage", header: "Dano", color: "pink" as const, render: (w: Weapon) => <span className="text-[#ff0080]">{w.damage}</span> },
    { key: "rof", header: "ROF" },
    { key: "concealable", header: "Ocultável", render: (w: Weapon) => <span className={w.concealable ? "text-[#39ff14]" : "text-[#4a4a5a]"}>{w.concealable ? "Sim" : "Não"}</span> },
    { key: "cost", header: "Custo", render: (w: Weapon) => <span className="text-[#ffd700]">{w.cost} eb</span> },
  ];

  const armorColumns = [
    { key: "namePtBr", header: "Armadura", color: "cyan" as const },
    { key: "location", header: "Local", render: (a: ArmorPiece) => a.location === "body" ? "Corpo" : "Cabeça" },
    { key: "sp", header: "SP", render: (a: ArmorPiece) => <span className="text-[#39ff14] font-semibold">{a.sp}</span> },
    { key: "cost", header: "Custo", render: (a: ArmorPiece) => <span className="text-[#ffd700]">{a.cost} eb</span> },
    { key: "penalty", header: "Penalidade", render: (a: ArmorPiece) => <span className="text-[#8a8a9a]">{a.penalty ?? "—"}</span> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <p className="font-mono text-xs text-[#8a8a9a] tracking-widest uppercase mb-2">
          &gt; Módulo 03
        </p>
        <h1 className="font-display text-4xl text-[#ff0080] tracking-widest uppercase mb-3">
          Combate
        </h1>
        <p className="font-mono text-[#8a8a9a] text-sm max-w-2xl">
          Friday Night Firefight — o sistema de combate de Cyberpunk RED. Rápido, letal e brutal. Um erro pode ser fatal; uma boa posição pode salvar sua vida.
        </p>
      </div>

      <div className="flex gap-8">
        <Sidebar items={sidebarItems} />

        <div className="flex-1 space-y-16">
          {/* Turno */}
          <section id="turno">
            <SectionHeader
              title="Estrutura do Turno"
              subtitle="Cada turno = 6 segundos no mundo real"
              color="pink"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <NeonCard color="pink">
                <div className="text-center">
                  <div className="font-display text-3xl text-[#ff0080] mb-2">01</div>
                  <h3 className="font-mono text-[#e0e0e0] font-semibold mb-2">Rolar Iniciativa</h3>
                  <p className="text-[#8a8a9a] text-xs font-mono">
                    Cada jogador rola 1d10 + REF. Quem tiver o resultado maior age primeiro.
                  </p>
                </div>
              </NeonCard>
              <NeonCard color="pink">
                <div className="text-center">
                  <div className="font-display text-3xl text-[#ff0080] mb-2">02</div>
                  <h3 className="font-mono text-[#e0e0e0] font-semibold mb-2">Escolher Ações</h3>
                  <p className="text-[#8a8a9a] text-xs font-mono">
                    Cada personagem tem 1 Ação e 1 Ação de Movimento por turno (mais ações com habilidades especiais).
                  </p>
                </div>
              </NeonCard>
              <NeonCard color="pink">
                <div className="text-center">
                  <div className="font-display text-3xl text-[#ff0080] mb-2">03</div>
                  <h3 className="font-mono text-[#e0e0e0] font-semibold mb-2">Resolver Ações</h3>
                  <p className="text-[#8a8a9a] text-xs font-mono">
                    Em ordem de iniciativa. Aplicar dano, rolar saves de morte se necessário.
                  </p>
                </div>
              </NeonCard>
            </div>

            <TerminalBox label="TIPOS DE AÇÃO">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                <div>
                  <span className="text-[#00f5ff]">Ataque:</span>
                  <span className="text-[#8a8a9a] ml-2">Atacar um alvo com arma ou corpo a corpo</span>
                </div>
                <div>
                  <span className="text-[#00f5ff]">Mover:</span>
                  <span className="text-[#8a8a9a] ml-2">Mover-se até MOVE × 2 metros</span>
                </div>
                <div>
                  <span className="text-[#00f5ff]">Usar Item:</span>
                  <span className="text-[#8a8a9a] ml-2">Usar medicamento, trocar de arma, etc.</span>
                </div>
                <div>
                  <span className="text-[#00f5ff]">Recarregar:</span>
                  <span className="text-[#8a8a9a] ml-2">Recarregar uma arma de fogo</span>
                </div>
                <div>
                  <span className="text-[#00f5ff]">Esquivar:</span>
                  <span className="text-[#8a8a9a] ml-2">Tentar desviar de ataque (DEX + 1d10 vs ataque)</span>
                </div>
                <div>
                  <span className="text-[#00f5ff]">Netrun:</span>
                  <span className="text-[#8a8a9a] ml-2">Entrar/sair da NET (apenas Netrunners)</span>
                </div>
              </div>
            </TerminalBox>
          </section>

          {/* Iniciativa */}
          <section id="iniciativa">
            <SectionHeader title="Iniciativa" color="pink" />
            <NeonCard color="pink">
              <div className="font-mono text-center py-4">
                <div className="text-[#ff0080] text-3xl font-black tracking-widest mb-2">
                  1d10 + REF
                </div>
                <p className="text-[#8a8a9a] text-sm">
                  Maior resultado age primeiro. Em empate, quem tem maior REF age primeiro. <br />
                  Solos adicionam metade do nível de Consciência de Combate à Iniciativa.
                </p>
              </div>
            </NeonCard>
          </section>

          {/* Combate à Distância */}
          <section id="distancia">
            <SectionHeader
              title="Combate à Distância"
              subtitle="REF é o stat primário para armas de fogo"
              color="pink"
            />
            <TerminalBox label="ROLAGEM DE ATAQUE À DISTÂNCIA">
              <div className="text-center mb-4">
                <span className="text-[#00f5ff] text-xl font-bold">Habilidade + REF + 1d10</span>
                <span className="text-[#8a8a9a] text-sm ml-4">vs Dificuldade (DV)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm">
                <div className="text-[#8a8a9a]">Alvo parado em campo aberto: DV 13</div>
                <div className="text-[#8a8a9a]">Alvo se movendo: DV 15</div>
                <div className="text-[#8a8a9a]">Alvo em cobertura parcial: DV 17</div>
                <div className="text-[#8a8a9a]">Alvo em cobertura total: DV 20</div>
                <div className="text-[#8a8a9a]">Disparo rápido (sem mirar): DV +5</div>
                <div className="text-[#8a8a9a]">Arma sem estabilização (SMG): −2</div>
              </div>
            </TerminalBox>
          </section>

          {/* Melee */}
          <section id="melee">
            <SectionHeader
              title="Combate Corpo a Corpo"
              subtitle="DEX é o stat primário para ataques melee"
              color="pink"
            />
            <TerminalBox label="ROLAGEM DE ATAQUE MELEE">
              <div className="text-center mb-4">
                <span className="text-[#00f5ff] text-xl font-bold">Habilidade + DEX + 1d10</span>
                <span className="text-[#8a8a9a] text-sm ml-4">vs Defesa do alvo</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-[#8a8a9a]">
                <div>Defesa = DEX + Habilidade de Evasão + 1d10</div>
                <div>Corpo a corpo básico (Briga): DEX + Briga + 1d10</div>
                <div>Ataque de bônus se flanqueando: +2 ao ataque</div>
                <div>Alvo deitado/incapacitado: +5 ao ataque</div>
              </div>
            </TerminalBox>
          </section>

          {/* Armas */}
          <section id="armas">
            <SectionHeader title="Armas" color="pink" />
            <Table data={weapons} columns={wepColumns} />
          </section>

          {/* Armadura */}
          <section id="armadura">
            <SectionHeader
              title="Armadura"
              subtitle="SP = Stopping Power — quanto dano a armadura absorve"
              color="pink"
            />
            <NeonCard color="green" className="mb-4">
              <p className="text-sm font-mono text-[#e0e0e0]">
                Quando um ataque acerta, role o dano da arma. Subtraia o SP da armadura atingida. O resultado (mínimo 0) é aplicado ao HP do personagem. A armadura tem HP próprio — ataques que penetram o SP reduzem o HP da armadura.
              </p>
            </NeonCard>
            <Table data={armorPieces} columns={armorColumns} />
          </section>

          {/* Cobertura */}
          <section id="cobertura">
            <SectionHeader
              title="Cobertura & Materiais"
              subtitle="HP e SP de obstáculos comuns"
              color="pink"
            />
            <Table data={coverData} columns={[
              { key: "material", header: "Material", color: "cyan" },
              { key: "hp", header: "HP", render: (d: typeof coverData[0]) => <span className="text-[#39ff14]">{d.hp}</span> },
              { key: "sp", header: "SP", render: (d: typeof coverData[0]) => <span className="text-[#00f5ff]">{d.sp}</span> },
              { key: "notes", header: "Notas", render: (d: typeof coverData[0]) => <span className="text-[#8a8a9a]">{d.notes}</span> },
            ]} />
          </section>

          {/* Ferimentos */}
          <section id="ferimentos">
            <SectionHeader
              title="Sistema de Ferimentos"
              subtitle="Estados de saúde e morte"
              color="pink"
            />
            <div className="space-y-3">
              {[
                { state: "Levemente Ferido", hp: "HP entre 1–Máximo", color: "green", description: "Nenhuma penalidade. Apenas machucados superficialmente." },
                { state: "Seriamente Ferido", hp: "HP abaixo de 50%", color: "yellow", description: "−2 em todas as rolagens de Habilidade e Ataque." },
                { state: "Mortalmente Ferido", hp: "HP = 0", color: "pink", description: "Inconsciente e morrendo. Deve fazer Save de Morte a cada rodada (WILL + 1d10 ≥ 12 para sobreviver). A Trauma Team pode estabilizar." },
                { state: "Morto", hp: "Falha no Save de Morte", color: "pink", description: "Flatlined. Fim do personagem — a menos que haja intervenção médica imediata." },
              ].map(({ state, hp, color, description }) => (
                <NeonCard key={state} color={color as "green" | "yellow" | "pink"}>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`font-mono font-semibold ${color === "green" ? "text-[#39ff14]" : color === "yellow" ? "text-[#ffd700]" : "text-[#ff0080]"}`}>
                      {state}
                    </span>
                    <span className="text-[#4a4a5a] text-xs font-mono">{hp}</span>
                  </div>
                  <p className="text-[#8a8a9a] text-sm font-mono">{description}</p>
                </NeonCard>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
