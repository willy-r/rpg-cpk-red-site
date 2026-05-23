import SectionHeader from "@/components/ui/SectionHeader";
import NeonCard from "@/components/ui/NeonCard";
import TerminalBox from "@/components/ui/TerminalBox";
import Sidebar from "@/components/layout/Sidebar";
import DisclaimerBanner from "@/components/ui/DisclaimerBanner";
import { lifestyleTiers, commonGear } from "@/data/economy";

const sidebarItems = [
  { label: "Eurobucks", anchor: "eurobucks" },
  { label: "Categorias de Preço", anchor: "categorias" },
  { label: "Níveis de Vida", anchor: "lifestyle" },
  { label: "Mercado Noturno", anchor: "mercado" },
  { label: "Sobrevivendo", anchor: "sobrevivendo" },
];

const gearCategories = [...new Set(commonGear.map((g) => g.category))];

export default function EconomiaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <p className="font-mono text-xs text-[#8a8a9a] tracking-widest uppercase mb-2">
          &gt; Módulo 06
        </p>
        <h1 className="font-display text-4xl text-[#ffd700] tracking-widest uppercase mb-3">
          Economia
        </h1>
        <p className="font-mono text-[#8a8a9a] text-sm max-w-2xl">
          Em Night City, tudo tem preço. Eurobucks (eb) é a moeda que move o mundo — mas sobreviver custa mais do que parece.
        </p>
      </div>

      <DisclaimerBanner />

      <div className="flex gap-8">
        <Sidebar items={sidebarItems} />

        <div className="flex-1 space-y-16">
          {/* Eurobucks */}
          <section id="eurobucks">
            <SectionHeader
              title="Eurobucks (eb)"
              subtitle="A moeda global do mundo cyberpunk"
              color="yellow"
              bookPage={333}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NeonCard color="yellow">
                <h3 className="font-mono text-[#ffd700] font-semibold mb-2">O que é</h3>
                <p className="text-[#8a8a9a] text-sm font-mono leading-relaxed">
                  Eurobucks são a moeda digital padrão. Transferidos via cartões eletrônicos, Agentes Pessoais ou transações na NET. Dinheiro físico ainda existe, mas é antiquado — e suspeito.
                </p>
              </NeonCard>
              <NeonCard color="yellow">
                <h3 className="font-mono text-[#ffd700] font-semibold mb-2">Poder de Compra</h3>
                <p className="text-[#8a8a9a] text-sm font-mono leading-relaxed">
                  Uma refeição decente custa ~5 eb. Uma arma básica, 50-100 eb. Um apartamento por mês, 500+ eb. Um job médio paga 500-2.000 eb. Cyberware de alto nível: 1.000-5.000 eb ou mais.
                </p>
              </NeonCard>
            </div>
          </section>

          {/* Categorias de Preço */}
          <section id="categorias">
            <SectionHeader
              title="Categorias de Preço"
              subtitle="Referência rápida de custo por categoria"
              color="yellow"
              bookPage={333}
            />
            <NeonCard color="yellow" className="mb-4">
              <p className="text-sm font-mono text-[#8a8a9a]">
                Em vez de memorizar preços individuais, o Cyberpunk RED usa categorias para classificar custo de itens. Use como referência ao comprar equipamentos ou rolar Comércio.
              </p>
            </NeonCard>
            <div className="space-y-2">
              {[
                { category: "Ubíquo", cost: "Grátis", examples: "Água da torneira, comida básica de kibble, informação pública", color: "text-[#4a4a5a]" },
                { category: "Barato", cost: "10 eb", examples: "Refeição simples, kit de primeiros socorros básico, munição comum", color: "text-[#39ff14]" },
                { category: "Cotidiano", cost: "20 eb", examples: "Roupas comuns, bebida alcoólica, carregador de bateria", color: "text-[#39ff14]" },
                { category: "Custoso", cost: "50 eb", examples: "Faca de combate, pistola simples, noche de hotel", color: "text-[#ffd700]" },
                { category: "Premium", cost: "100 eb", examples: "Arma de qualidade, armadura leve, equipamentos táticos", color: "text-[#ffd700]" },
                { category: "Caro", cost: "500 eb", examples: "Arma pesada, armadura média, cyberware básico (Neural Link)", color: "text-[#ffd700]" },
                { category: "Muito Caro", cost: "1.000 eb", examples: "Cyberware avançado, veículo básico, equipamento especializado", color: "text-[#ff9900]" },
                { category: "Luxo", cost: "5.000 eb", examples: "Cyberware de alto nível, veículo modificado, apartamento luxuoso", color: "text-[#ff9900]" },
                { category: "Super Luxo", cost: "10.000 eb+", examples: "Borgware, veículos exclusivos, propriedades corporativas", color: "text-[#ff0080]" },
              ].map(({ category, cost, examples, color }) => (
                <div key={category} className="flex items-start justify-between p-3 bg-[#0f0f1a] border border-[#1e1e2e] hover:border-[#ffd70030] transition-colors gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <span className={`text-sm font-mono font-semibold shrink-0 w-28 ${color}`}>{category}</span>
                    <span className="text-[#4a4a5a] text-xs font-mono">{examples}</span>
                  </div>
                  <span className="text-[#ffd700] text-sm font-mono font-semibold shrink-0">{cost}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Lifestyle */}
          <section id="lifestyle">
            <SectionHeader
              title="Níveis de Vida"
              subtitle="Quanto custa sobreviver em Night City por mês"
              color="yellow"
              bookPage={333}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lifestyleTiers.map((tier) => {
                const isKibble = tier.costPerMonth === 0;
                return (
                  <NeonCard
                    key={tier.name}
                    color={isKibble ? "pink" : tier.costPerMonth >= 3000 ? "cyan" : "yellow"}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-display text-lg tracking-widest uppercase text-[#e0e0e0]">
                        {tier.name}
                      </h3>
                      <span className="text-[#ffd700] font-mono font-bold">
                        {isKibble ? "Gratuito" : `${tier.costPerMonth.toLocaleString("pt-BR")} eb/mês`}
                      </span>
                    </div>
                    <p className="text-[#8a8a9a] text-sm font-mono mb-3">{tier.description}</p>
                    <ul className="space-y-1">
                      {tier.includes.map((item) => (
                        <li key={item} className="text-xs font-mono text-[#4a4a5a]">
                          &gt; {item}
                        </li>
                      ))}
                    </ul>
                  </NeonCard>
                );
              })}
            </div>
          </section>

          {/* Mercado Noturno */}
          <section id="mercado">
            <SectionHeader
              title="Mercado Noturno"
              subtitle="O que você pode comprar nas ruas de Night City"
              color="yellow"
              bookPage={337}
            />
            <NeonCard color="yellow" className="mb-6">
              <p className="text-sm font-mono text-[#8a8a9a] leading-relaxed">
                O Mercado Noturno (Night Market) é onde os Edgerunners compram sem perguntas e sem garantia. Preços variam — barganha é possível com a habilidade Comércio. Fixers frequentemente intermediam compras de itens raros ou ilegais.
              </p>
            </NeonCard>

            {gearCategories.map((cat) => {
              const catItems = commonGear.filter((g) => g.category === cat);
              return (
                <div key={cat} className="mb-6">
                  <p className="text-[#4a4a5a] text-xs font-mono tracking-widest uppercase mb-3 border-b border-[#1e1e2e] pb-1 capitalize">
                    {cat}
                  </p>
                  <div className="space-y-2">
                    {catItems.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between py-2 px-3 bg-[#0f0f1a] border border-[#1e1e2e] hover:border-[#ffd70030] transition-colors"
                      >
                        <div>
                          <span className="text-[#e0e0e0] text-sm font-mono">{item.namePtBr}</span>
                          {item.notes && (
                            <p className="text-[#4a4a5a] text-xs font-mono">{item.notes}</p>
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

          {/* Sobrevivendo */}
          <section id="sobrevivendo">
            <SectionHeader
              title="Sobrevivendo no Mundo Cyberpunk"
              subtitle="Dicas práticas de Night City"
              color="yellow"
              bookPage={315}
            />
            <TerminalBox label="MANUAL DE SOBREVIVÊNCIA — NIGHT CITY">
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-[#00f5ff] font-semibold mb-1">Tenha um Fixer</p>
                  <p className="text-[#8a8a9a]">
                    Um bom Fixer é indispensável. Eles encontram jobs, fornecem equipamentos difíceis de achar e mediam conflitos com facções. Trate seu Fixer bem — ou encontre outro.
                  </p>
                </div>
                <div>
                  <p className="text-[#00f5ff] font-semibold mb-1">Street Cred importa</p>
                  <p className="text-[#8a8a9a]">
                    Reputação abre portas. Completar jobs difíceis, apoiar gangues locais ou causar impacto perceptível aumenta sua Reputação de Rua. Isso afeta preços, acesso e a reação dos NPCs.
                  </p>
                </div>
                <div>
                  <p className="text-[#00f5ff] font-semibold mb-1">Mantenha um Ripperdoc de confiança</p>
                  <p className="text-[#8a8a9a]">
                    Instalar cyberware requer um médico não-oficial (Ripperdoc). Um bom Ripperdoc cobra justo e não faz perguntas — e pode salvar sua vida depois de uma missão que deu errado.
                  </p>
                </div>
                <div>
                  <p className="text-[#00f5ff] font-semibold mb-1">Nunca entre sem um plano de saída</p>
                  <p className="text-[#8a8a9a]">
                    Toda missão deve ter pelo menos dois caminhos de retirada. Se as coisas derem errado — e sempre dão — você precisa saber como sair antes de saber como entrar.
                  </p>
                </div>
                <div>
                  <p className="text-[#ff0080] font-semibold mb-1">Ninguém sai de Night City. Exceto em um saco de lixo.</p>
                  <p className="text-[#8a8a9a] italic">
                    — Bes Isis, apresentadora do Net 54 News, 2020
                  </p>
                </div>
              </div>
            </TerminalBox>
          </section>
        </div>
      </div>
    </div>
  );
}
