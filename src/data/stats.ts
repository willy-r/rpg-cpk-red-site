import type { Stat } from "@/lib/types";

export const stats: Stat[] = [
  {
    key: "INT",
    name: "Inteligência",
    group: "mental",
    description:
      "Capacidade de percepção, raciocínio e aprendizado. Afeta habilidades de conhecimento, percepção e o Netrunning.",
  },
  {
    key: "WILL",
    name: "Força de Vontade",
    group: "mental",
    description:
      "Coragem, determinação e resistência ao estresse. Afeta a resistência a danos e a capacidade de continuar lutando mesmo ferido.",
  },
  {
    key: "COOL",
    name: "Presença",
    group: "mental",
    description:
      "Carisma, influência social e impressão causada nos outros. Afeta habilidades sociais, intimidação e resistência ao medo.",
  },
  {
    key: "EMP",
    name: "Empatia",
    group: "mental",
    description:
      "Capacidade de se conectar com outros. CRÍTICA para resistir à Ciberpsicose — cada implante reduz a EMP temporariamente.",
  },
  {
    key: "TECH",
    name: "Técnica",
    group: "combat",
    description:
      "Habilidade para usar ferramentas e instrumentos. Diferente dos Reflexos — afeta reparos, construção e uso de equipamentos complexos.",
  },
  {
    key: "REF",
    name: "Reflexos",
    group: "combat",
    description:
      "Velocidade de reação e coordenação. Stat primária para combate à distância — determina precisão com armas de fogo.",
  },
  {
    key: "DEX",
    name: "Destreza",
    group: "physical",
    description:
      "Competência física geral, atletismo e combate corpo a corpo. Stat primária para ataques melee e acrobacias.",
  },
  {
    key: "MOVE",
    name: "Movimento",
    group: "physical",
    description:
      "Velocidade de corrida, salto e natação. Determina quantos metros por turno o personagem pode se mover em combate.",
  },
  {
    key: "BODY",
    name: "Corpo",
    group: "physical",
    description:
      "Força bruta e resistência física. Afeta dano corpo a corpo, capacidade de carga e resistência a traumas.",
  },
  {
    key: "LUCK",
    name: "Sorte",
    group: "fortune",
    description:
      "Favor divino que pode virar o jogo. Pode ser gasta para adicionar pontos extras a qualquer rolagem — se recupera a cada sessão.",
  },
];
