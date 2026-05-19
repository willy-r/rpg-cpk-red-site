import type { NetProgram } from "@/lib/types";

export const netPrograms: NetProgram[] = [
  {
    name: "Armor",
    class: "defender",
    def: 4,
    rez: 5,
    description: "Programa defensivo que gera escudos de dados ao redor do Netrunner.",
    effect:
      "Adiciona +4 à defesa do Netrunner contra ataques de ICE e outros programas hostis. Pode ser ativado como ação.",
  },
  {
    name: "Sword",
    class: "attacker",
    atk: 4,
    rez: 5,
    description: "Programa de ataque básico — a espada digital de todo Netrunner iniciante.",
    effect:
      "Ataca ICE e outros Netrunners com ATK 4. Causa dano de REZ ao alvo se o ataque for bem-sucedido.",
  },
  {
    name: "Banhammer",
    class: "attacker",
    atk: 5,
    rez: 10,
    description: "Ataque devastador de alto custo de REZ. Martelo digital de força bruta.",
    effect:
      "Ataque ATK 5 de alto custo. Particularmente eficaz contra defesas de ICE pesado.",
  },
  {
    name: "See Ya",
    class: "booster",
    rez: 3,
    description: "Programa de furtividade que oculta a presença do Netrunner na NET.",
    effect:
      "Torna o Netrunner mais difícil de detectar por ICE de busca e outros Netrunners. Essencial para infiltrações silenciosas.",
  },
  {
    name: "Eraser",
    class: "anti-program",
    atk: 3,
    rez: 6,
    description: "Apaga dados e programas de sistemas alvo.",
    effect:
      "Pode deletar arquivos, programas e até identidades de personagens de um sistema comprometido.",
  },
  {
    name: "Vrizzbolt",
    class: "attacker",
    atk: 3,
    rez: 4,
    description: "Descarga elétrica digital rápida e barata.",
    effect:
      "Ataque de baixo custo, bom para combates rápidos contra ICE leve. Velocidade de execução alta.",
  },
  {
    name: "Worm",
    class: "booster",
    rez: 7,
    description: "Programa de intrusão que abre caminhos em sistemas protegidos.",
    effect:
      "Permite ao Netrunner ignorar uma camada de segurança ou ICE por rodada. Essencial para infiltrações profundas.",
  },
  {
    name: "Flak",
    class: "defender",
    def: 2,
    rez: 4,
    description: "Defesa em área que cobre múltiplos vetores de ataque.",
    effect: "Defesa +2 contra todos os ataques de ICE neste turno.",
  },
];
