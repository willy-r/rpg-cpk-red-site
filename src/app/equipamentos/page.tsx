"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import NeonCard from "@/components/ui/NeonCard";
import TerminalBox from "@/components/ui/TerminalBox";
import Sidebar from "@/components/layout/Sidebar";
import DisclaimerBanner from "@/components/ui/DisclaimerBanner";
import CyberwareCard from "@/components/sections/CyberwareCard";
import { cyberwareItems } from "@/data/cyberware";
import { commonGear, fashionStyles } from "@/data/economy";
import type { CyberwareCategory } from "@/lib/types";

const sidebarItems = [
  { label: "Cyberware", anchor: "cyberware" },
  { label: "Ciberpsicose", anchor: "ciberpsicose" },
  { label: "Equipamentos", anchor: "equipamentos" },
  { label: "Munição Especial", anchor: "municao" },
  { label: "Modificações de Arma", anchor: "modificacoes" },
  { label: "Moda & Estilo", anchor: "moda" },
];

const categoryFilters: { label: string; value: CyberwareCategory | "all" }[] = [
  { label: "Todos", value: "all" },
  { label: "Neural", value: "neural" },
  { label: "Óptica", value: "optics" },
  { label: "Auditivo", value: "audio" },
  { label: "Cyberbraço", value: "cyberarm" },
  { label: "Cyberperna", value: "cyberleg" },
  { label: "Borgware", value: "borgware" },
];

const gearCategories = [...new Set(commonGear.map((g) => g.category))];

export default function EquipamentosPage() {
  const [activeFilter, setActiveFilter] = useState<CyberwareCategory | "all">("all");

  const filteredCyberware =
    activeFilter === "all"
      ? cyberwareItems
      : cyberwareItems.filter((item) => item.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <p className="font-mono text-xs text-[#8a8a9a] tracking-widest uppercase mb-2">
          &gt; Módulo 04
        </p>
        <h1 className="font-display text-4xl text-[#bf00ff] tracking-widest uppercase mb-3">
          Equipamentos
        </h1>
        <p className="font-mono text-[#8a8a9a] text-sm max-w-2xl">
          Cyberware, armas, equipamentos e a moda que define quem você é em Night City. Chrome no corpo, créditos na conta, estilo nas ruas.
        </p>
      </div>

      <DisclaimerBanner />

      <div className="flex gap-8">
        <Sidebar items={sidebarItems} />

        <div className="flex-1 space-y-16">
          {/* Cyberware */}
          <section id="cyberware">
            <SectionHeader
              title="Cyberware"
              subtitle="Implantes cibernéticos permanentes — cada um tem um custo em Humanidade"
              color="purple"
              bookPage={110}
            />

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categoryFilters.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setActiveFilter(value)}
                  className={`px-3 py-1 text-xs font-mono border tracking-wider transition-colors ${
                    activeFilter === value
                      ? "text-[#bf00ff] border-[#bf00ff] bg-[#bf00ff11]"
                      : "text-[#4a4a5a] border-[#1e1e2e] hover:text-[#8a8a9a] hover:border-[#4a4a5a]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCyberware.map((item) => (
                <CyberwareCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* Ciberpsicose */}
          <section id="ciberpsicose">
            <SectionHeader
              title="Ciberpsicose"
              subtitle="O preço de ser mais máquina do que humano"
              color="pink"
              bookPage={108}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NeonCard color="pink">
                <h3 className="font-mono text-[#ff0080] font-semibold mb-3">Como Funciona</h3>
                <p className="text-[#8a8a9a] text-sm font-mono leading-relaxed mb-3">
                  Cada implante de cyberware tem um valor de Perda de Humanidade (geralmente 1d6 ou 2d6). Quando a Humanidade cai abaixo de certos limiares, o personagem começa a perder empatia e contato com o que significa ser humano.
                </p>
                <p className="text-[#8a8a9a] text-sm font-mono leading-relaxed">
                  A <span className="text-[#ff0080]">Empatia (EMP)</span> é o stat crítico — ela representa sua capacidade de resistir à psicose. EMP alta = mais espaço para chrome.
                </p>
              </NeonCard>
              <NeonCard color="pink">
                <h3 className="font-mono text-[#ff0080] font-semibold mb-3">Consequências</h3>
                <ul className="space-y-2 text-sm font-mono text-[#8a8a9a]">
                  <li>&gt; Dissociação emocional progressiva</li>
                  <li>&gt; Perda de empatia pelos humanos</li>
                  <li>&gt; Surtos violentos imprevisíveis</li>
                  <li>&gt; Ataques a aliados e inocentes</li>
                  <li>&gt; Intervenção da MaxTac (polícia de Ciberpsicóticos)</li>
                  <li className="text-[#ff0080]">&gt; Terapia pode recuperar Humanidade perdida</li>
                </ul>
              </NeonCard>
            </div>

            <TerminalBox label="CÁLCULO DE HUMANIDADE" className="mt-4">
              <div className="text-sm space-y-2">
                <div>
                  <span className="text-[#00f5ff]">Humanidade Máxima =</span>
                  <span className="text-[#e0e0e0] ml-2">EMP × 10</span>
                </div>
                <div>
                  <span className="text-[#00f5ff]">Humanidade Atual =</span>
                  <span className="text-[#e0e0e0] ml-2">Humanidade Máxima − Soma de todas as Perdas de Humanidade</span>
                </div>
                <div>
                  <span className="text-[#00f5ff]">EMP Efetiva =</span>
                  <span className="text-[#e0e0e0] ml-2">Humanidade Atual ÷ 10 (arredondado para baixo)</span>
                </div>
                <div className="border-t border-[#39ff1430] pt-2 text-[#8a8a9a]">
                  Humanidade igual a zero = Ciberpsicose total. O personagem torna-se um NPC hostil.
                </div>
              </div>
            </TerminalBox>
          </section>

          {/* Equipamentos Comuns */}
          <section id="equipamentos">
            <SectionHeader
              title="Equipamentos Comuns"
              subtitle="O que um Edgerunner carrega no campo"
              color="cyan"
              bookPage={315}
            />
            {gearCategories.map((cat) => {
              const catItems = commonGear.filter((g) => g.category === cat);
              return (
                <div key={cat} className="mb-6">
                  <p className="text-[#4a4a5a] text-xs font-mono tracking-widest uppercase mb-3 border-b border-[#1e1e2e] pb-1">
                    {cat}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {catItems.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-3 bg-[#0f0f1a] border border-[#1e1e2e] hover:border-[#00f5ff30] transition-colors"
                      >
                        <div>
                          <span className="text-[#e0e0e0] text-sm font-mono">{item.namePtBr}</span>
                          {item.notes && (
                            <p className="text-[#4a4a5a] text-xs font-mono mt-0.5">{item.notes}</p>
                          )}
                        </div>
                        <span className="text-[#ffd700] text-sm font-mono font-semibold ml-4 shrink-0">
                          {item.cost} eb
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>

          {/* Munição Especial */}
          <section id="municao">
            <SectionHeader
              title="Munição Especial"
              subtitle="Substitui a munição padrão — preço por 10 projéteis ou por granada"
              color="cyan"
              bookPage={91}
            />
            <div className="space-y-2">
              {[
                { name: "Básica", cost: "10 eb", effect: "Munição padrão. Nenhum efeito especial." },
                { name: "Perfurante (AP)", cost: "100 eb", effect: "Cada acerto consome 2 pontos de SP da armadura (em vez de 1)." },
                { name: "Biotoxina", cost: "500 eb", effect: "DV 15 ou 3d6 de dano direto ao HP. Apenas pistolas, rifles e SMGs." },
                { name: "EMP", cost: "500 eb", effect: "Apenas granadas. Desabilita eletrônicos e cyberware não-blindado em área." },
                { name: "Expansiva", cost: "100 eb", effect: "+2 de dano, mas não pode penetrar SP de armadura (dano mínimo = 0)." },
                { name: "Flashbang", cost: "100 eb", effect: "Apenas granadas. Sem dano — cega e ensurdece alvos por 1 turno (DV 13 para resistir)." },
                { name: "Incendiária", cost: "100 eb", effect: "O alvo pega fogo: 2d6 de dano por turno até apagar. DV 15 para resistir." },
                { name: "Venenosa", cost: "100 eb", effect: "DV 13 ou 2d6 de dano direto ao HP. Apenas pistolas, rifles e SMGs." },
                { name: "Borracha", cost: "10 eb", effect: "Não letal. Não pode matar (HP mínimo 1). Reduz dano pela metade." },
                { name: "Sonífera", cost: "500 eb", effect: "DV 15 ou o alvo dorme por 1 hora. Apenas pistolas, rifles e SMGs." },
                { name: "Smart", cost: "500 eb", effect: "Requer Smart Link. Ignora penalidades de cobertura." },
                { name: "Fumaça", cost: "50 eb", effect: "Apenas granadas. Cria nuvem de fumaça de 6m de raio por 3 turnos. Ataques ranged: −2." },
                { name: "Gás Lacrimogêneo", cost: "50 eb", effect: "Apenas granadas. DV 14 por turno dentro da área ou −2 em todas as ações." },
              ].map(({ name, cost, effect }) => (
                <div key={name} className="flex items-start justify-between p-3 bg-[#0f0f1a] border border-[#1e1e2e] hover:border-[#00f5ff30] transition-colors gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <span className="text-[#00f5ff] text-sm font-mono font-semibold shrink-0 w-36">{name}</span>
                    <span className="text-[#8a8a9a] text-xs font-mono">{effect}</span>
                  </div>
                  <span className="text-[#ffd700] text-sm font-mono font-semibold shrink-0">{cost}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Modificações de Arma */}
          <section id="modificacoes">
            <SectionHeader
              title="Modificações de Arma"
              subtitle="Acessórios instalados em armas — cada arma tem slots de modificação"
              color="cyan"
              bookPage={94}
            />
            <NeonCard color="cyan" className="mb-4">
              <p className="text-sm font-mono text-[#e0e0e0]">
                A maioria das armas tem <span className="text-[#00f5ff]">3 slots</span> de modificação. Algumas modificações ocupam 2 slots. Apenas uma modificação por tipo pode ser instalada.
              </p>
            </NeonCard>
            <div className="space-y-2">
              {[
                { name: "Baioneta", cost: "100 eb", slots: "1", effect: "Adiciona ataque corpo a corpo: 1d6 dano." },
                { name: "Cartucho de Tambor", cost: "500 eb", slots: "1", effect: "Triplica a capacidade de munição da arma." },
                { name: "Carregador Estendido", cost: "100 eb", slots: "1", effect: "Dobra a capacidade de munição da arma." },
                { name: "Lança-Granada Sob-Cano", cost: "500 eb", slots: "2", effect: "Dispara granadas (1 por vez). Granadas compradas separadamente." },
                { name: "Mira Infravermelho/Noturna", cost: "500 eb", slots: "1", effect: "Ignora penalidades de escuridão e fumaça." },
                { name: "Escopeta Sob-Cano", cost: "500 eb", slots: "2", effect: "Dispara carga de escopeta (3d6, sem AP, curto alcance)." },
                { name: "Smart Link", cost: "500 eb", slots: "2", effect: "Requer Neural Link. Ignora penalidades de cobertura. Amunição Smart disponível." },
                { name: "Mira de Precisão", cost: "100 eb", slots: "1", effect: "+1 em Tiros Visados a longa distância." },
              ].map(({ name, cost, slots, effect }) => (
                <div key={name} className="flex items-start justify-between p-3 bg-[#0f0f1a] border border-[#1e1e2e] hover:border-[#00f5ff30] transition-colors gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <span className="text-[#00f5ff] text-sm font-mono font-semibold shrink-0 w-52">{name}</span>
                    <span className="text-[#8a8a9a] text-xs font-mono">{effect}</span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-[#4a4a5a] text-xs font-mono">{slots} slot{slots === "2" ? "s" : ""}</span>
                    <span className="text-[#ffd700] text-sm font-mono font-semibold">{cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Moda */}
          <section id="moda">
            <SectionHeader
              title="Moda & Estilo"
              subtitle="Em Night City, como você se veste é quem você é"
              color="purple"
              bookPage={99}
            />
            <NeonCard color="purple" className="mb-4">
              <p className="text-sm font-mono text-[#8a8a9a] leading-relaxed">
                Fashion em Cyberpunk RED não é superficial — é sinalização social. O seu estilo comunica afiliação, poder e atitude. Usar as cores erradas no território errado pode ser fatal.
              </p>
            </NeonCard>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {fashionStyles.map((style) => (
                <NeonCard key={style.name} color="purple" className="text-center">
                  <div className="font-mono font-semibold text-[#e0e0e0] text-sm mb-1">
                    {style.namePtBr}
                  </div>
                  <div className="text-[#ffd700] font-mono text-lg font-bold mb-2">
                    {style.cost} eb
                  </div>
                  {style.notes && (
                    <p className="text-[#4a4a5a] text-xs font-mono">{style.notes}</p>
                  )}
                </NeonCard>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
