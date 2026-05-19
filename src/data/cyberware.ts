import type { CyberwareItem } from "@/lib/types";

export const cyberwareItems: CyberwareItem[] = [
  // Neural
  {
    id: "neural-link",
    name: "Neural Link",
    namePtBr: "Interface Neural",
    category: "neural",
    description:
      "Implante base obrigatório para uso de armas inteligentes, cyberdecks e controle mental de veículos. A porta de entrada para o mundo cibernético.",
    humanityLoss: "2d6",
    cost: 500,
    pageRef: 113,
  },
  {
    id: "sandevistan",
    name: "Sandevistan",
    namePtBr: "Speedware (Sandevistan)",
    category: "neural",
    description:
      "Implante de reflexos que aumenta drasticamente a velocidade de reação. Faz o mundo parecer em câmera lenta durante o combate.",
    humanityLoss: "2d6",
    cost: 500,
    pageRef: 113,
  },
  {
    id: "interface-plugs",
    name: "Interface Plugs",
    namePtBr: "Plugues de Interface",
    category: "neural",
    description:
      "Conectores físicos no pulso para acoplar diretamente a veículos, armas e terminais. Necessário para controle neural de veículos.",
    humanityLoss: "1d6",
    cost: 500,
    pageRef: 113,
  },
  {
    id: "chipware-socket",
    name: "Chipware Socket",
    namePtBr: "Socket para Chipware",
    category: "neural",
    description:
      "Slot de expansão neural para chips de habilidade. Permite carregar competências pré-programadas diretamente no cérebro.",
    humanityLoss: "1d6/2",
    cost: 500,
    pageRef: 113,
  },
  {
    id: "combat-chipware",
    name: "Combat Chipware",
    namePtBr: "Chip de Combate",
    category: "neural",
    description:
      "Chip de habilidade com treinamento de combate pré-programado: Briga, Pilotagem, Primeiros Socorros ou outras competências.",
    humanityLoss: "1d6/2",
    cost: 500,
    pageRef: 113,
  },
  {
    id: "memory-chip",
    name: "Memory Chip",
    namePtBr: "Chip de Memória",
    category: "neural",
    description:
      "Armazenamento de dados no sistema nervoso. Pode conter mapas, códigos de acesso ou qualquer informação digital.",
    humanityLoss: "1d6/2",
    cost: 100,
    pageRef: 113,
  },
  // Optics
  {
    id: "targeting-scope",
    name: "Targeting Scope",
    namePtBr: "Mira de Precisão",
    category: "optics",
    description:
      "Implante ocular que fornece retícula de mira e telemetria de distância. Adiciona bônus a rolagens de ataque à distância.",
    humanityLoss: "1d6/2",
    cost: 500,
    pageRef: 116,
  },
  {
    id: "infrared-optic",
    name: "Infrared Optic",
    namePtBr: "Visão Infravermelha",
    category: "optics",
    description:
      "Permite enxergar no escuro através de calor corporal. Elimina penalidades de combate noturno.",
    humanityLoss: "1d6/2",
    cost: 500,
    pageRef: 116,
  },
  {
    id: "recording-optic",
    name: "Recording Optic",
    namePtBr: "Olho com Gravação",
    category: "optics",
    description:
      "Câmera integrada ao olho que grava vídeo e foto em memória interna. 12 horas de capacidade.",
    humanityLoss: "1d6/2",
    cost: 200,
    pageRef: 116,
  },
  {
    id: "polychrome-iris",
    name: "Polychrome Iris",
    namePtBr: "Íris Policromática",
    category: "optics",
    description:
      "Olhos com tinta iridescente customizável. Efeito estético/fashion — pequeno bônus em interações sociais com estilo.",
    humanityLoss: "0",
    cost: 100,
    pageRef: 116,
  },
  // Audio
  {
    id: "directional-audio",
    name: "Directional Audio",
    namePtBr: "Áudio Direcional",
    category: "audio",
    description:
      "Microfones integrados nas orelhas permitem amplificar sons distantes e identificar a direção de origem com precisão.",
    humanityLoss: "1d6/2",
    cost: 100,
    pageRef: 117,
  },
  {
    id: "audio-filter",
    name: "Audio Frequency Filter",
    namePtBr: "Filtro de Frequência Auditiva",
    category: "audio",
    description:
      "Permite filtrar ruído de fundo e isolar vozes específicas em ambientes barulhentos.",
    humanityLoss: "1d6/2",
    cost: 100,
    pageRef: 117,
  },
  // Cyberarm
  {
    id: "cyberarm-standard",
    name: "CyberArm (Standard)",
    namePtBr: "Cyberbraço (Padrão)",
    category: "cyberarm",
    description:
      "Braço mecânico completo com 3 slots de opção. Equivalente funcional a um braço biológico com a possibilidade de upgrades.",
    humanityLoss: "2d6",
    cost: 500,
    optionSlots: 3,
    pageRef: 114,
  },
  {
    id: "wolvers",
    name: "Wolvers",
    namePtBr: "Garras Retrácteis (Wolvers)",
    category: "cyberarm",
    description:
      "Garras de metal retráteis integradas à mão. Concealable, causam dano como arma pesada de melee. Favoritas de Solos.",
    humanityLoss: "1d6",
    cost: 500,
    pageRef: 114,
  },
  {
    id: "smartgun",
    name: "Smartgun Link",
    namePtBr: "Link para Arma Inteligente",
    category: "cyberarm",
    description:
      "Interface de arma integrada ao braço que permite usar armas smartgun sem segurar fisicamente. Requer Neural Link.",
    humanityLoss: "1d6",
    cost: 100,
    pageRef: 114,
  },
  {
    id: "tool-hand",
    name: "Tool Hand",
    namePtBr: "Mão Multifuncional",
    category: "cyberarm",
    description:
      "Mão com ferramentas integradas: chave de fenda, chave inglesa e furadeira. Essencial para Techs.",
    humanityLoss: "1d6/2",
    cost: 100,
    pageRef: 114,
  },
  // Cyberleg
  {
    id: "jump-booster",
    name: "Jump Booster",
    namePtBr: "Propulsores de Salto",
    category: "cyberleg",
    description:
      "Perna com hidráulicos integrados. Permite saltos de altura e distância muito superiores ao humano.",
    humanityLoss: "1d6",
    cost: 500,
    pageRef: 115,
  },
  {
    id: "skate-foot",
    name: "Skate Foot",
    namePtBr: "Pé com Patins",
    category: "cyberleg",
    description:
      "Patins integrados e retráteis na sola do pé. Concealable. Aumenta velocidade de movimento substancialmente.",
    humanityLoss: "1d6/2",
    cost: 500,
    pageRef: 115,
  },
  {
    id: "talon-foot",
    name: "Talon Foot",
    namePtBr: "Pé com Lâmina (Talon)",
    category: "cyberleg",
    description:
      "Lâmina retrátil integrada ao pé. Concealable. Arma de melee que pode surpreender oponentes.",
    humanityLoss: "1d6",
    cost: 500,
    pageRef: 115,
  },
  {
    id: "grip-foot",
    name: "Grip Foot",
    namePtBr: "Pé com Garras de Escalada",
    category: "cyberleg",
    description:
      "Dedos com garras magnéticas e de aderência. Permite escalar superfícies que seriam impossíveis normalmente.",
    humanityLoss: "1d6/2",
    cost: 500,
    pageRef: 115,
  },
  // Borgware
  {
    id: "subdermal-armor",
    name: "Subdermal Armor",
    namePtBr: "Armadura Subdérmica",
    category: "borgware",
    description:
      "Placas de metal sob a pele que fornecem SP adicional sem a necessidade de armadura externa visível.",
    humanityLoss: "2d6",
    cost: 1000,
    pageRef: 118,
  },
];
