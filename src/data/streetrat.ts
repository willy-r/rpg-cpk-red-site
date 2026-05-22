import type { StatKey } from "@/lib/types";

// Stat templates use actual values from the Cyberpunk RED rulebook (p.74-78).
// In the Streetrat method, stats come from pre-generated tables (roll 1d10).
// These are 3 representative rows per role — totals vary as they do in the book.

export interface StatTemplate {
  label: string;
  stats: Record<StatKey, number>;
}

export interface StreetratSkill {
  namePtBr: string;
  linkedStat: StatKey;
  rank: number;
  whyItMatters: string;
}

export interface StreetratGearItem {
  name: string;
  description: string;
  category: "weapon" | "armor" | "gear";
  cost: number;
  icon: string;
  damage?: string;        // weapons only
  sp?: number;            // armor only
  choiceGroupId?: string; // items sharing the same id = user picks one
  linkedChoice?: { group: string; when: string }; // auto-included when linked group has this value selected
}

// Cyberware items in the Streetrat package
// Items sharing the same choiceGroupId = user picks one
export interface StreetratCywarItem {
  name: string;
  namePtBr: string;
  description: string;
  humanityLoss: number;   // pre-calculated; 0 for fashionware
  choiceGroupId?: string;
}

export interface StreetratPackage {
  roleId: string;
  statTemplates: StatTemplate[];
  skills: StreetratSkill[];
  gear: StreetratGearItem[];
  cyware: StreetratCywarItem[];
  totalHumanityLoss: number; // fixed package total, book p.118
  empLoss: number;           // EMP stat reduction
  startingEurobucks: number;
  survivorTip: string;
}

export const streetratPackages: StreetratPackage[] = [
  // ── ROCKERBOY ─────────────────────────────────────────────────────────────
  {
    roleId: "rockerboy",
    statTemplates: [
      { label: "Ícone Carismático",     stats: { INT: 7, REF: 6, DEX: 6, TECH: 5, COOL: 6, WILL: 8, LUCK: 7, MOVE: 7, BODY: 3, EMP: 8 } },
      { label: "Ídolo Underground",     stats: { INT: 3, REF: 7, DEX: 7, TECH: 7, COOL: 7, WILL: 6, LUCK: 7, MOVE: 7, BODY: 5, EMP: 8 } },
      { label: "Voz das Ruas",          stats: { INT: 4, REF: 5, DEX: 7, TECH: 7, COOL: 6, WILL: 6, LUCK: 7, MOVE: 7, BODY: 5, EMP: 8 } },
      { label: "Poeta de Barricada",    stats: { INT: 4, REF: 5, DEX: 7, TECH: 7, COOL: 6, WILL: 8, LUCK: 7, MOVE: 6, BODY: 3, EMP: 8 } },
      { label: "Performer Radical",     stats: { INT: 3, REF: 7, DEX: 7, TECH: 7, COOL: 6, WILL: 8, LUCK: 6, MOVE: 5, BODY: 4, EMP: 7 } },
      { label: "Agitador Urbano",       stats: { INT: 5, REF: 6, DEX: 7, TECH: 5, COOL: 7, WILL: 8, LUCK: 5, MOVE: 7, BODY: 3, EMP: 7 } },
      { label: "Músico Subversivo",     stats: { INT: 5, REF: 6, DEX: 6, TECH: 7, COOL: 7, WILL: 8, LUCK: 7, MOVE: 6, BODY: 3, EMP: 6 } },
      { label: "Agitador Cultural",     stats: { INT: 5, REF: 7, DEX: 7, TECH: 5, COOL: 6, WILL: 6, LUCK: 6, MOVE: 6, BODY: 4, EMP: 8 } },
      { label: "Artivista das Ruas",    stats: { INT: 3, REF: 5, DEX: 5, TECH: 6, COOL: 7, WILL: 8, LUCK: 7, MOVE: 5, BODY: 5, EMP: 7 } },
      { label: "Estrela do Apocalipse", stats: { INT: 4, REF: 5, DEX: 6, TECH: 5, COOL: 8, WILL: 8, LUCK: 7, MOVE: 6, BODY: 4, EMP: 7 } },
    ],
    skills: [
      { namePtBr: "Atletismo",              linkedStat: "DEX",  rank: 2, whyItMatters: "Correr do palco até as ruas quando a noite vira caos." },
      { namePtBr: "Briga",                  linkedStat: "DEX",  rank: 6, whyItMatters: "Shows de Rockerboy frequentemente terminam em violência." },
      { namePtBr: "Concentração",           linkedStat: "WILL", rank: 2, whyItMatters: "Manter o foco sob pressão — no palco ou numa operação." },
      { namePtBr: "Conversação",            linkedStat: "EMP",  rank: 2, whyItMatters: "Construir rapport com fãs, aliados e fontes de informação." },
      { namePtBr: "Educação",               linkedStat: "INT",  rank: 2, whyItMatters: "Entender o suficiente do mundo para escrever sobre ele." },
      { namePtBr: "Evasão",                 linkedStat: "DEX",  rank: 6, whyItMatters: "Desviar de seguranças corporativos e violência de palco." },
      { namePtBr: "Primeiros Socorros",     linkedStat: "TECH", rank: 6, whyItMatters: "Estabilizar aliados feridos nas noites que saem errado." },
      { namePtBr: "Percepção Humana",       linkedStat: "EMP",  rank: 6, whyItMatters: "Sentir o que o público sente e detectar ameaças disfarçadas." },
      { namePtBr: "Idioma das Ruas",        linkedStat: "INT",  rank: 2, whyItMatters: "Comunicar-se no submundo onde sua música tem mais impacto." },
      { namePtBr: "Especialista Local",     linkedStat: "INT",  rank: 4, whyItMatters: "Conhecer o território onde você toca, mora e opera." },
      { namePtBr: "Percepção",              linkedStat: "INT",  rank: 2, whyItMatters: "Notar problemas antes que eles te notem." },
      { namePtBr: "Persuasão",              linkedStat: "COOL", rank: 6, whyItMatters: "Convencer fãs, patronos e rivais — sua segunda arma." },
      { namePtBr: "Furtividade",            linkedStat: "DEX",  rank: 2, whyItMatters: "Entrar e sair de lugares sem atrair atenção quando necessário." },
      { namePtBr: "Composição",             linkedStat: "INT",  rank: 6, whyItMatters: "Criar músicas e letras que ressoam como arma cultural." },
      { namePtBr: "Armas Curtas",           linkedStat: "REF",  rank: 6, whyItMatters: "A pistola que todo artista precisa quando a fama atrai inimigos." },
      { namePtBr: "Armas Brancas",          linkedStat: "DEX",  rank: 6, whyItMatters: "Combate corpo a corpo quando o backstage vira zona de guerra." },
      { namePtBr: "Aparência Pessoal",      linkedStat: "COOL", rank: 4, whyItMatters: "A imagem é parte da mensagem — Rockerboys vivem de presença." },
      { namePtBr: "Tocar Instrumento",      linkedStat: "TECH", rank: 6, whyItMatters: "Sua arte, sua arma, sua identidade. A performance que move multidões." },
      { namePtBr: "Malícia de Rua",         linkedStat: "COOL", rank: 6, whyItMatters: "Navegar o submundo onde sua música tem o poder real." },
      { namePtBr: "Guarda-roupa & Estilo",  linkedStat: "COOL", rank: 4, whyItMatters: "Presença visual que amplifica o impacto da sua mensagem." },
    ],
    gear: [
      // Weapons
      { name: "Pistola Muito Pesada",          category: "weapon", damage: "4d6", description: "A arma de Johnny Silverhand. Alta potência, pouco recuo na mão de quem treinou.", cost: 100, icon: "🔫" },
      { name: "Arma Melee Pesada",             category: "weapon", damage: "3d6", description: "Para quando o show termina em violência corpo a corpo.", cost: 100, icon: "🔪", choiceGroupId: "rb-melee" },
      { name: "Granada Flashbang",             category: "gear",   description: "Não letal. Cega e ensurdece por 1d6 rodadas. Útil para criar caos e fugir.", cost: 50, icon: "💥", choiceGroupId: "rb-melee" },
      // Armor
      { name: "Armorjack Leve — Corpo (SP 11)", category: "armor",  sp: 11,        description: "Pode parecer roupa de palco. Ninguém precisa saber que é à prova de balas.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)",    category: "armor",  sp: 11,        description: "Proteção craniana. Acertos na cabeça sem proteção são devastadores.", cost: 100, icon: "⛑️" },
      // Gear
      { name: "Munição Básica VH x50",         category: "gear",   description: "Cinquenta balas para a Pistola Muito Pesada.", cost: 50, icon: "📦" },
      { name: "Granada de Gás Lacrimogênio x2",category: "gear",   description: "Não letal. Área de gás irrita os olhos e provoca tosse por 2d6 rodadas.", cost: 50, icon: "💨" },
      { name: "Instrumento Elétrico",           category: "gear",   description: "Guitarra, baixo ou sintetizador. Precisa de amplificador.", cost: 500, icon: "🎸", choiceGroupId: "rb-instr" },
      { name: "Detector de Microfones",        category: "gear",   description: "Emite sinal quando detecta dispositivo de escuta em raio de 2m. Para varredura de ambientes.", cost: 500, icon: "🔍", choiceGroupId: "rb-instr" },
      { name: "Amplificador de Bolso",         category: "gear",   description: "Suporta dois instrumentos. 6 horas de carga.", cost: 50, icon: "🔊" },
      { name: "Computador",                    category: "gear",   description: "Laptop para composição, divulgação e comunicação.", cost: 50, icon: "💻" },
      { name: "Tinta Luminosa x5",             category: "gear",   description: "Spray que brilha no escuro. Sinalização, arte urbana e marcação.", cost: 100, icon: "🎨" },
      { name: "Rádio Scanner/Player",          category: "gear",   description: "Toca música do Data Pool ou sintoniza rádios num raio de 1 milha.", cost: 50, icon: "📻" },
      { name: "Câmera de Vídeo",               category: "gear",   description: "Grava 12h de áudio e vídeo. Documente cada show e incidente.", cost: 100, icon: "📹" },
      { name: "Agente Pessoal",                category: "gear",   description: "Smartphone com IA. +2 em Pesquisa em Biblioteca e +2 em Guarda-roupa & Estilo. Transmissão ao vivo e agenda.", cost: 100, icon: "📱" },
      { name: "Cama Inflável c/ Saco de Dormir",category: "gear",   description: "Colchão autoinflável com saco de dormir. Dobra em pacote de 15cm×15cm.", cost: 20, icon: "🛏️" },
      { name: "Roupa de Rua",                  category: "gear",   description: "Generic Chic (jaqueta, joias x3, camisetas x4) + Leisurewear (joias, óculos, calçados) + Urbanflash (calça, camiseta).", cost: 340, icon: "👕" },
    ],
    cyware: [
      { name: "Audio Recorder",     namePtBr: "Gravador de Áudio",  description: "Grava áudio em chip. Opção do Cyberaudio Suite.", humanityLoss: 2 },
      { name: "Chemskin",           namePtBr: "Pele Química",       description: "Pigmentos infundidos na pele — cor permanente.", humanityLoss: 0 },
      { name: "Cyberaudio Suite",   namePtBr: "Suite Cyberaudio",   description: "Ouvido cibernético com 3 slots de opções.", humanityLoss: 7 },
      { name: "Techhair",           namePtBr: "Cabelo Tech",        description: "Cabelo artificial com LEDs coloridos.", humanityLoss: 0 },
    ],
    totalHumanityLoss: 9,
    empLoss: 1,
    startingEurobucks: 0,
    survivorTip: "Sua Habilidade Especial (Impacto Carismático) só funciona em fãs — mas você pode criar fãs de estranhos com uma rolagem. Quanto maior sua audiência, maior seu poder. Construa fama e use-a como escudo.",
  },

  // ── SOLO ──────────────────────────────────────────────────────────────────
  {
    roleId: "solo",
    statTemplates: [
      { label: "Guarda-Costas de Elite",   stats: { INT: 6, REF: 7, DEX: 7, TECH: 3, COOL: 8, WILL: 6, LUCK: 5, MOVE: 5, BODY: 6, EMP: 5 } },
      { label: "Atirador de Longa Linha",  stats: { INT: 7, REF: 8, DEX: 6, TECH: 3, COOL: 6, WILL: 6, LUCK: 7, MOVE: 5, BODY: 6, EMP: 6 } },
      { label: "Máquina de Combate",       stats: { INT: 5, REF: 8, DEX: 7, TECH: 4, COOL: 7, WILL: 7, LUCK: 6, MOVE: 7, BODY: 8, EMP: 5 } },
      { label: "Guerreiro Tático",         stats: { INT: 5, REF: 8, DEX: 6, TECH: 4, COOL: 6, WILL: 7, LUCK: 6, MOVE: 5, BODY: 7, EMP: 6 } },
      { label: "Atirador Preciso",         stats: { INT: 6, REF: 6, DEX: 7, TECH: 5, COOL: 7, WILL: 6, LUCK: 7, MOVE: 6, BODY: 8, EMP: 4 } },
      { label: "Mercenário Calculista",    stats: { INT: 7, REF: 7, DEX: 6, TECH: 5, COOL: 7, WILL: 6, LUCK: 6, MOVE: 7, BODY: 7, EMP: 5 } },
      { label: "Operativo Equilibrado",    stats: { INT: 7, REF: 7, DEX: 6, TECH: 5, COOL: 6, WILL: 7, LUCK: 7, MOVE: 6, BODY: 6, EMP: 6 } },
      { label: "Máquina de Guerra",        stats: { INT: 7, REF: 8, DEX: 7, TECH: 5, COOL: 6, WILL: 6, LUCK: 5, MOVE: 6, BODY: 8, EMP: 4 } },
      { label: "Soldado Veterano",         stats: { INT: 7, REF: 7, DEX: 6, TECH: 4, COOL: 6, WILL: 6, LUCK: 6, MOVE: 5, BODY: 6, EMP: 5 } },
      { label: "Combatente Ágil",          stats: { INT: 6, REF: 6, DEX: 8, TECH: 5, COOL: 6, WILL: 6, LUCK: 5, MOVE: 6, BODY: 6, EMP: 5 } },
    ],
    skills: [
      { namePtBr: "Atletismo",               linkedStat: "DEX",  rank: 2, whyItMatters: "Correr, saltar e mover-se em terreno hostil." },
      { namePtBr: "Briga",                   linkedStat: "DEX",  rank: 2, whyItMatters: "Combate desarmado quando as armas ficam sem munição." },
      { namePtBr: "Concentração",            linkedStat: "WILL", rank: 2, whyItMatters: "Manter o foco em situações de alta pressão e estresse." },
      { namePtBr: "Conversação",             linkedStat: "EMP",  rank: 2, whyItMatters: "Coleta de informação casual antes de uma missão." },
      { namePtBr: "Educação",                linkedStat: "INT",  rank: 2, whyItMatters: "Conhecimento básico para interpretar briefings e ordens." },
      { namePtBr: "Evasão",                  linkedStat: "DEX",  rank: 6, whyItMatters: "Desviar de tiros é tão vital quanto acertar. Base da sobrevivência em combate." },
      { namePtBr: "Primeiros Socorros",      linkedStat: "TECH", rank: 6, whyItMatters: "Estabilizar-se no campo quando não há Medtech disponível." },
      { namePtBr: "Percepção Humana",        linkedStat: "EMP",  rank: 2, whyItMatters: "Identificar traição e detectar emboscadas antes que aconteçam." },
      { namePtBr: "Idioma das Ruas",         linkedStat: "INT",  rank: 2, whyItMatters: "Comunicar-se no submundo para obter contratos e informações." },
      { namePtBr: "Especialista Local",      linkedStat: "INT",  rank: 2, whyItMatters: "Conhecer o território de operação — saídas, coberturas e rotas." },
      { namePtBr: "Percepção",               linkedStat: "INT",  rank: 6, whyItMatters: "Notar emboscadas e ameaças ocultas antes que te vejam." },
      { namePtBr: "Persuasão",               linkedStat: "COOL", rank: 2, whyItMatters: "Negociar contratos e condições com clientes." },
      { namePtBr: "Furtividade",             linkedStat: "DEX",  rank: 2, whyItMatters: "Aproximação silenciosa e infiltração em posição de vantagem." },
      { namePtBr: "Fogo Automático",         linkedStat: "REF",  rank: 6, whyItMatters: "Suprimir inimigos e cobrir aliados em combates abertos." },
      { namePtBr: "Armas Curtas",            linkedStat: "REF",  rank: 6, whyItMatters: "Pistola de alta potência — confiável em qualquer situação." },
      { namePtBr: "Interrogatório",          linkedStat: "COOL", rank: 6, whyItMatters: "Extrair informações de alvos capturados sob pressão." },
      { namePtBr: "Armas Brancas",           linkedStat: "DEX",  rank: 6, whyItMatters: "Combate silencioso e corpo a corpo especializado." },
      { namePtBr: "Resistir Tortura/Drogas", linkedStat: "WILL", rank: 6, whyItMatters: "Manter segredos quando capturado — a última linha de defesa." },
      { namePtBr: "Fuzil",                   linkedStat: "REF",  rank: 6, whyItMatters: "Rifles e escopetas para alcance médio e longo — arsenal primário." },
      { namePtBr: "Estratégia",              linkedStat: "INT",  rank: 6, whyItMatters: "Planejar movimentos, usar o terreno e coordenar ataques eficientes." },
    ],
    gear: [
      // Weapons
      { name: "Rifle de Assalto",              category: "weapon", damage: "5d6", description: "Arma de guerra padrão — alcance, poder e confiabilidade.", cost: 500, icon: "🔫" },
      { name: "Pistola Muito Pesada",          category: "weapon", damage: "4d6", description: "Secundária de alta potência para situações de curto alcance.", cost: 100, icon: "🔫" },
      { name: "Arma Melee Pesada",             category: "weapon", damage: "3d6", description: "Para combate corpo a corpo quando não há espaço para atirar.", cost: 100, icon: "🔪", choiceGroupId: "solo-melee" },
      { name: "Escudo Balístico",              category: "gear",               description: "Cobertura móvel com 10 HP. Interposto entre você e o ataque — o escudo absorve o dano inteiro. Ocupa uma mão. Destruído ao chegar a 0 HP.", cost: 100, icon: "🛡️", choiceGroupId: "solo-melee" },
      // Armor
      { name: "Armorjack Leve — Corpo (SP 11)", category: "armor",  sp: 11,       description: "Proteção balística discreta. SP 11 resiste à maioria das armas comuns.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)",    category: "armor",  sp: 11,       description: "Proteção craniana. Um headshot sem capacete pode ser fatal.", cost: 100, icon: "⛑️" },
      // Gear
      { name: "Munição Básica VH x30",         category: "gear",   description: "Trinta balas para a Pistola Muito Pesada.", cost: 30, icon: "📦" },
      { name: "Munição Básica Rifle x70",      category: "gear",   description: "Setenta balas de rifle. Suficiente para um combate sério.", cost: 70, icon: "📦" },
      { name: "Agente Pessoal",                category: "gear",   description: "Smartphone com IA. +2 em Pesquisa em Biblioteca e +2 em Guarda-roupa & Estilo. Comunicação segura, mapas e identificação de alvos.", cost: 100, icon: "📱" },
      { name: "Cama Inflável c/ Saco de Dormir",category: "gear",   description: "Colchão autoinflável com saco de dormir. Dobra em pacote de 15cm×15cm.", cost: 20, icon: "🛏️" },
      { name: "Roupas de Lazer",               category: "gear",   description: "Leisurewear: calçados x2, jaqueta x3, óculos de sol, calças x2, camisetas x2.", cost: 370, icon: "👕" },
    ],
    cyware: [
      { name: "Biomonitor",  namePtBr: "Biomonitor", description: "Implante que monitora sinais vitais. Pode vincular ao Agente.", humanityLoss: 0 },
      { name: "Neural Link", namePtBr: "Neural Link", description: "Sistema nervoso artificial. 5 slots. Base para cyberware neural.", humanityLoss: 7 },
      { name: "Sandevistan", namePtBr: "Sandevistan", description: "Speedware neural — reage antes do inimigo. +3 à Iniciativa.", humanityLoss: 7, choiceGroupId: "solo-speed" },
      { name: "Wolvers",     namePtBr: "Wolvers",     description: "Garras retráteis nos nós dos dedos. Arma Pesada de Melee. Concealable.", humanityLoss: 7, choiceGroupId: "solo-speed" },
    ],
    totalHumanityLoss: 14,
    empLoss: 2,
    startingEurobucks: 0,
    survivorTip: "Solos vivem por posicionamento e Consciência de Combate. Nunca fique em campo aberto. Use cobertura, flanqueie, e recue para estabilizar quando estiver ferido.",
  },

  // ── NETRUNNER ─────────────────────────────────────────────────────────────
  {
    roleId: "netrunner",
    statTemplates: [
      { label: "Fantasma Digital",          stats: { INT: 5, REF: 8, DEX: 7, TECH: 7, COOL: 7, WILL: 4, LUCK: 8, MOVE: 7, BODY: 7, EMP: 4 } },
      { label: "Runner Arrojado",           stats: { INT: 5, REF: 6, DEX: 7, TECH: 5, COOL: 8, WILL: 3, LUCK: 8, MOVE: 7, BODY: 5, EMP: 5 } },
      { label: "Hacker Veloz",              stats: { INT: 5, REF: 6, DEX: 8, TECH: 6, COOL: 6, WILL: 4, LUCK: 7, MOVE: 6, BODY: 7, EMP: 4 } },
      { label: "Invasor Técnico",           stats: { INT: 5, REF: 7, DEX: 7, TECH: 7, COOL: 7, WILL: 5, LUCK: 8, MOVE: 6, BODY: 5, EMP: 5 } },
      { label: "Corredor de Dados",         stats: { INT: 5, REF: 8, DEX: 8, TECH: 5, COOL: 7, WILL: 3, LUCK: 7, MOVE: 5, BODY: 5, EMP: 6 } },
      { label: "Infiltrador da NET",        stats: { INT: 6, REF: 6, DEX: 6, TECH: 7, COOL: 8, WILL: 4, LUCK: 7, MOVE: 7, BODY: 6, EMP: 6 } },
      { label: "Netrunner Estratégico",     stats: { INT: 6, REF: 6, DEX: 6, TECH: 7, COOL: 6, WILL: 5, LUCK: 7, MOVE: 7, BODY: 7, EMP: 6 } },
      { label: "Runner Ofensivo",           stats: { INT: 5, REF: 7, DEX: 8, TECH: 6, COOL: 8, WILL: 4, LUCK: 8, MOVE: 5, BODY: 7, EMP: 4 } },
      { label: "Arquiteto Digital",         stats: { INT: 7, REF: 6, DEX: 7, TECH: 7, COOL: 6, WILL: 3, LUCK: 6, MOVE: 5, BODY: 6, EMP: 5 } },
      { label: "Runner de Alta Performance",stats: { INT: 7, REF: 8, DEX: 6, TECH: 6, COOL: 6, WILL: 4, LUCK: 7, MOVE: 7, BODY: 5, EMP: 6 } },
    ],
    skills: [
      { namePtBr: "Atletismo",                        linkedStat: "DEX",  rank: 2, whyItMatters: "Mobilidade básica quando precisar alcançar um terminal físico." },
      { namePtBr: "Briga",                            linkedStat: "DEX",  rank: 2, whyItMatters: "Defesa básica quando o hardware é o único que está disponível." },
      { namePtBr: "Concentração",                     linkedStat: "WILL", rank: 2, whyItMatters: "Manter o foco durante longas sessões de invasão." },
      { namePtBr: "Conversação",                      linkedStat: "EMP",  rank: 2, whyItMatters: "Obter informações e acesso físico de forma discreta." },
      { namePtBr: "Educação",                         linkedStat: "INT",  rank: 6, whyItMatters: "Base teórica ampla — sistemas, protocolos e arquitetura de redes." },
      { namePtBr: "Evasão",                           linkedStat: "DEX",  rank: 6, whyItMatters: "No mundo real seu corpo fica vulnerável. Desviar é sobreviver." },
      { namePtBr: "Primeiros Socorros",               linkedStat: "TECH", rank: 2, whyItMatters: "Estabilização básica enquanto os aliados não chegam." },
      { namePtBr: "Percepção Humana",                 linkedStat: "EMP",  rank: 2, whyItMatters: "Detectar quando a segurança está monitorando você fisicamente." },
      { namePtBr: "Idioma das Ruas",                  linkedStat: "INT",  rank: 2, whyItMatters: "Comunicar-se com contatos e conseguir acesso a nós da NET." },
      { namePtBr: "Especialista Local",               linkedStat: "INT",  rank: 2, whyItMatters: "Conhecer onde estão os terminais e nós de acesso físicos." },
      { namePtBr: "Percepção",                        linkedStat: "INT",  rank: 2, whyItMatters: "Detectar ICE físico e segurança antes de conectar." },
      { namePtBr: "Persuasão",                        linkedStat: "COOL", rank: 2, whyItMatters: "Convencer guardas e técnicos a dar acesso ou se afastar." },
      { namePtBr: "Furtividade",                      linkedStat: "DEX",  rank: 6, whyItMatters: "Posicionar-se perto do terminal sem ser detectado." },
      { namePtBr: "Técnica Básica",                   linkedStat: "TECH", rank: 6, whyItMatters: "Manter o Cyberdeck e improvizar hardware em campo." },
      { namePtBr: "Esconder/Revelar Objeto",          linkedStat: "INT",  rank: 6, whyItMatters: "Ocultar o Cyberdeck e equipamento sensível de buscas físicas." },
      { namePtBr: "Criptografia",                     linkedStat: "INT",  rank: 6, whyItMatters: "Decifrar comunicações corporativas e proteger as suas." },
      { namePtBr: "Cibertecnologia",                  linkedStat: "TECH", rank: 6, whyItMatters: "Instalar e manter cyberware — especialmente o Neural Link." },
      { namePtBr: "Eletrônica/Seg. Tecnológica",      linkedStat: "TECH", rank: 6, whyItMatters: "Invadir sistemas eletrônicos físicos sem usar a NET." },
      { namePtBr: "Armas Curtas",                     linkedStat: "REF",  rank: 6, whyItMatters: "Quando sair da NET para te matar, você precisa se defender." },
      { namePtBr: "Pesquisa em Biblioteca",           linkedStat: "INT",  rank: 6, whyItMatters: "Localizar dados em bases físicas e arquivos corporativos." },
    ],
    gear: [
      // Weapons
      { name: "Pistola Muito Pesada",           category: "weapon", damage: "4d6", description: "Enquanto o grupo atira lá fora, você pode precisar disso.", cost: 100, icon: "🔫" },
      // Armor
      { name: "Armorjack Leve — Corpo (SP 11)", category: "armor",  sp: 11,        description: "Seu corpo fica imóvel quando conectado. Armadura protege.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)",     category: "armor",  sp: 11,        description: "Proteção craniana durante o netrunning.", cost: 100, icon: "⛑️" },
      // Gear
      { name: "Munição Básica VH x30",          category: "gear",   description: "Trinta balas. Para emergências — você não deveria estar no tiroteio.", cost: 30, icon: "📦" },
      { name: "Cyberdeck Básico (7 slots)",     category: "gear",   description: "Seu computador de batalha. 7 slots para programas.", cost: 500, icon: "💻" },
      { name: "Óculos de Realidade Virtual",    category: "gear",   description: "Projetam imagens do ciberespaço. Essenciais para netrunning completo.", cost: 100, icon: "🥽" },
      { name: "Programa: Armor (DEF 4)",        category: "gear",   description: "Escudo digital. Protege de ataques de ICE.", cost: 250, icon: "🛡️" },
      { name: "Programa: Sword (ATK 4)",        category: "gear",   description: "Ataque padrão. Destrói ICE e ataca Netrunners inimigos.", cost: 250, icon: "⚡" },
      { name: "Programa: See Ya",               category: "gear",   description: "Camufla sua presença na NET.", cost: 250, icon: "👻", choiceGroupId: "nr-prog1" },
      { name: "Programa: Eraser",               category: "gear",   description: "Apaga rastros de acesso nos logs do sistema.", cost: 250, icon: "🧹", choiceGroupId: "nr-prog1" },
      { name: "Programa: Vrizzbolt (ATK 3)",    category: "gear",   description: "Ataque elétrico que causa dano extra em sistemas energizados.", cost: 250, icon: "⚡", choiceGroupId: "nr-prog2" },
      { name: "Programa: Sword (2ª cópia)",     category: "gear",   description: "Segunda cópia do programa de ataque — para redundância.", cost: 250, icon: "⚔️", choiceGroupId: "nr-prog2" },
      { name: "Programa: Worm",                 category: "gear",   description: "Abre caminhos em sistemas protegidos.", cost: 250, icon: "🪱", choiceGroupId: "nr-prog3" },
      { name: "Programa: Sword (3ª opção)",     category: "gear",   description: "Terceira cópia de Sword — maximizar poder de ataque.", cost: 250, icon: "⚔️", choiceGroupId: "nr-prog3" },
      { name: "Agente Pessoal",                 category: "gear",   description: "Smartphone com IA. +2 em Pesquisa em Biblioteca e +2 em Guarda-roupa & Estilo. Comunicação e suporte fora da NET.", cost: 100, icon: "📱" },
      { name: "Cama Inflável c/ Saco de Dormir",category: "gear",   description: "Colchão autoinflável com saco de dormir. Dobra em pacote de 15cm×15cm.", cost: 20, icon: "🛏️" },
      { name: "Roupas Casuais",                category: "gear",   description: "Generic Chic (camisetas x10) + Leisurewear (calçados x2, joias, calças x2) + Urban Flash (jaqueta).", cost: 270, icon: "👕" },
    ],
    cyware: [
      { name: "Interface Plugs", namePtBr: "Conectores de Interface", description: "Plugues no pulso ou cabeça para conectar à NET e controlar máquinas. Requer Neural Link.", humanityLoss: 7 },
      { name: "Neural Link",     namePtBr: "Neural Link",             description: "Sistema nervoso artificial. 5 slots. Base para cyberware neural e conexão ao Cyberdeck.", humanityLoss: 7 },
      { name: "Shift Tacts",     namePtBr: "Muta-Contato",            description: "Lentes coloridas implantadas nos olhos — mudam de cor a vontade.", humanityLoss: 0 },
    ],
    totalHumanityLoss: 14,
    empLoss: 2,
    startingEurobucks: 0,
    survivorTip: "NUNCA conecte na NET sem um aliado guardando seu corpo. Seu corpo fica inconsciente e indefeso. Posicione-se em cobertura antes de conectar.",
  },

  // ── TECH ──────────────────────────────────────────────────────────────────
  {
    roleId: "tech",
    statTemplates: [
      { label: "Engenheiro Criativo",      stats: { INT: 6, REF: 7, DEX: 7, TECH: 8, COOL: 4, WILL: 4, LUCK: 5, MOVE: 5, BODY: 7, EMP: 6 } },
      { label: "Técnico Meticuloso",       stats: { INT: 7, REF: 6, DEX: 6, TECH: 7, COOL: 5, WILL: 3, LUCK: 7, MOVE: 7, BODY: 5, EMP: 5 } },
      { label: "Engenheiro de Sistemas",   stats: { INT: 8, REF: 6, DEX: 5, TECH: 7, COOL: 5, WILL: 4, LUCK: 7, MOVE: 7, BODY: 5, EMP: 7 } },
      { label: "Especialista em Cyberware",stats: { INT: 7, REF: 8, DEX: 7, TECH: 8, COOL: 4, WILL: 4, LUCK: 6, MOVE: 5, BODY: 6, EMP: 7 } },
      { label: "Inventor Improvisado",     stats: { INT: 6, REF: 6, DEX: 7, TECH: 6, COOL: 4, WILL: 3, LUCK: 7, MOVE: 7, BODY: 6, EMP: 6 } },
      { label: "Armeiro das Ruas",         stats: { INT: 8, REF: 7, DEX: 5, TECH: 6, COOL: 3, WILL: 3, LUCK: 7, MOVE: 6, BODY: 6, EMP: 7 } },
      { label: "MacGyver das Ruas",        stats: { INT: 8, REF: 6, DEX: 7, TECH: 8, COOL: 4, WILL: 4, LUCK: 7, MOVE: 6, BODY: 7, EMP: 6 } },
      { label: "Especialista em Maquinário",stats:{ INT: 8, REF: 8, DEX: 7, TECH: 8, COOL: 5, WILL: 4, LUCK: 6, MOVE: 5, BODY: 6, EMP: 6 } },
      { label: "Catador Tecnológico",      stats: { INT: 6, REF: 6, DEX: 7, TECH: 8, COOL: 3, WILL: 3, LUCK: 5, MOVE: 7, BODY: 7, EMP: 7 } },
      { label: "Tech de Elite",            stats: { INT: 8, REF: 8, DEX: 5, TECH: 6, COOL: 4, WILL: 4, LUCK: 6, MOVE: 5, BODY: 6, EMP: 6 } },
    ],
    skills: [
      { namePtBr: "Atletismo",                   linkedStat: "DEX",  rank: 2, whyItMatters: "Mover-se em campos de trabalho industrial e espaços apertados." },
      { namePtBr: "Briga",                       linkedStat: "DEX",  rank: 2, whyItMatters: "Defesa básica quando o trabalho atrai problemas." },
      { namePtBr: "Concentração",                linkedStat: "WILL", rank: 2, whyItMatters: "Manter o foco em reparos delicados sob pressão." },
      { namePtBr: "Conversação",                 linkedStat: "EMP",  rank: 2, whyItMatters: "Obter informações técnicas de clientes e fornecedores." },
      { namePtBr: "Educação",                    linkedStat: "INT",  rank: 6, whyItMatters: "Base teórica sólida em engenharia, física e ciências aplicadas." },
      { namePtBr: "Evasão",                      linkedStat: "DEX",  rank: 6, whyItMatters: "Sair vivo quando o trabalho vira confronto." },
      { namePtBr: "Primeiros Socorros",          linkedStat: "TECH", rank: 6, whyItMatters: "Estabilizar aliados feridos — Techs carregam kit de trauma." },
      { namePtBr: "Percepção Humana",            linkedStat: "EMP",  rank: 2, whyItMatters: "Saber quando um cliente está mentindo sobre o trabalho." },
      { namePtBr: "Idioma das Ruas",             linkedStat: "INT",  rank: 2, whyItMatters: "Comunicar-se no mercado paralelo onde compra componentes." },
      { namePtBr: "Especialista Local",          linkedStat: "INT",  rank: 2, whyItMatters: "Conhecer fornecedores, officinas e depósitos da região." },
      { namePtBr: "Percepção",                   linkedStat: "INT",  rank: 2, whyItMatters: "Detectar falhas em equipamentos antes que virem problemas maiores." },
      { namePtBr: "Persuasão",                   linkedStat: "COOL", rank: 2, whyItMatters: "Negociar contratos de reparo e venda de modificações." },
      { namePtBr: "Furtividade",                 linkedStat: "DEX",  rank: 2, whyItMatters: "Entrar em instalações para fazer reparos ou instalar dispositivos." },
      { namePtBr: "Técnica Básica",              linkedStat: "TECH", rank: 6, whyItMatters: "A base de tudo — consertar, construir e modificar qualquer coisa." },
      { namePtBr: "Cibertecnologia",             linkedStat: "TECH", rank: 6, whyItMatters: "Instalar e reparar cyberware. A fonte de renda número um do Tech." },
      { namePtBr: "Eletrônica/Seg. Tecnológica", linkedStat: "TECH", rank: 6, whyItMatters: "Hackear fechaduras e câmeras — acesso técnico sem entrar na NET." },
      { namePtBr: "Tecnologia de Veículos",      linkedStat: "TECH", rank: 6, whyItMatters: "Manter veículos do grupo funcionando em qualquer terreno." },
      { namePtBr: "Ciência (à escolha)",         linkedStat: "INT",  rank: 6, whyItMatters: "Especialização científica — química, eletrônica ou engenharia avançada." },
      { namePtBr: "Fuzil",                       linkedStat: "REF",  rank: 6, whyItMatters: "Para se defender quando o trabalho atrai problemas sérios." },
      { namePtBr: "Tecnologia de Armas",         linkedStat: "TECH", rank: 6, whyItMatters: "Modificar e reparar armas — serviço valorizado em Night City." },
    ],
    gear: [
      // Weapons
      { name: "Espingarda",                     category: "weapon", damage: "5d6", description: "Devastadora em curto alcance. Funciona melhor a menos de 50m.", cost: 500, icon: "🔫", choiceGroupId: "tech-primary" },
      { name: "Rifle de Assalto",               category: "weapon", damage: "5d6", description: "Versátil. Alcance médio com taxa de fogo confiável.", cost: 500, icon: "🔫", choiceGroupId: "tech-primary" },
      // Armor
      { name: "Armorjack Leve — Corpo (SP 11)", category: "armor",  sp: 11,        description: "Proteção enquanto trabalha. Às vezes as máquinas atiram de volta.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)",     category: "armor",  sp: 11,        description: "Proteção craniana. Essencial quando o trabalho vira combate.", cost: 100, icon: "⛑️" },
      // Gear
      { name: "Munição Espingarda x100",        category: "gear",   description: "Cem cartuchos de espingarda.", cost: 100, icon: "📦", linkedChoice: { group: "tech-primary", when: "Espingarda" } },
      { name: "Munição Rifle x100",             category: "gear",   description: "Cem balas de rifle.", cost: 100, icon: "📦", linkedChoice: { group: "tech-primary", when: "Rifle de Assalto" } },
      { name: "Granada Flashbang",              category: "gear",   description: "Atordoa sem matar — distração ou neutralização não-letal.", cost: 100, icon: "💥" },
      { name: "Tech Bag",                       category: "gear",   description: "Kit profissional para reparos complexos. Sem ela, você é um guerreiro comum.", cost: 500, icon: "🧰" },
      { name: "Máscara Antipoluição",           category: "gear",   description: "Protege de fumaça, gases e toxinas industriais.", cost: 20, icon: "😷" },
      { name: "Telefone Descartável",           category: "gear",   description: "Para comunicações que não devem ser rastreadas. Fácil de descartar.", cost: 50, icon: "📞" },
      { name: "Fita Isolante x5",              category: "gear",   description: "Multiuso. Reparos rápidos, fixação provisória, marcação. Em vários cores.", cost: 100, icon: "🔧" },
      { name: "Lanterna",                      category: "gear",   description: "Feixe de 100m. Dura 10 horas. Indispensável em instalações sem luz.", cost: 20, icon: "🔦" },
      { name: "Sinalizador x6",                category: "gear",   description: "Ilumina área de 100m por 1 hora. Para sinais e emergências.", cost: 60, icon: "🔴" },
      { name: "Agente Pessoal",                 category: "gear",   description: "Smartphone com IA. +2 em Pesquisa em Biblioteca e +2 em Guarda-roupa & Estilo. Manuais, esquemáticos e comunicação.", cost: 100, icon: "📱" },
      { name: "Cama Inflável c/ Saco de Dormir",category: "gear",   description: "Colchão autoinflável com saco de dormir. Dobra em pacote de 15cm×15cm.", cost: 20, icon: "🛏️" },
      { name: "Roupas de Trabalho",             category: "gear",   description: "Generic Chic (calças x8, camisetas x10) + Leisurewear (calçados x2).", cost: 260, icon: "👕" },
    ],
    cyware: [
      { name: "Cybereye",    namePtBr: "Cybereye",          description: "Olho artificial com 3 slots de opções. Para inspeção de componentes e circuitos.", humanityLoss: 7 },
      { name: "MicroOptics", namePtBr: "MicroÓptica",       description: "Microscópio ocular — 400x de aumento. Essencial para trabalho em cyberware. Requer Cybereye.", humanityLoss: 2 },
      { name: "Skinwatch",   namePtBr: "Relogio Subdérmico",description: "Relógio de LED implantado sob a pele. Acompanhe prazos e timers de instalação.", humanityLoss: 0 },
      { name: "Tool Hand",   namePtBr: "Mão Ferramenta",    description: "Dedos com chave de fenda, chave inglesa e mini furadeira integradas. Requer Neural Link.", humanityLoss: 3 },
    ],
    totalHumanityLoss: 12,
    empLoss: 2,
    startingEurobucks: 0,
    survivorTip: "Você é mais valioso vivo e consertando coisas do que morto num tiroteio. Mantenha os aliados equipados, armas em funcionamento e armaduras reparadas entre missões. Isso vale mais que qualquer combate.",
  },

  // ── MEDTECH ───────────────────────────────────────────────────────────────
  {
    roleId: "medtech",
    statTemplates: [
      { label: "Cirurgião de Campo",     stats: { INT: 7, REF: 5, DEX: 6, TECH: 7, COOL: 5, WILL: 3, LUCK: 8, MOVE: 5, BODY: 5, EMP: 7 } },
      { label: "Paramédico de Rua",      stats: { INT: 6, REF: 7, DEX: 7, TECH: 7, COOL: 4, WILL: 4, LUCK: 6, MOVE: 7, BODY: 7, EMP: 7 } },
      { label: "Ripperdoc das Sombras",  stats: { INT: 6, REF: 5, DEX: 5, TECH: 8, COOL: 5, WILL: 3, LUCK: 8, MOVE: 5, BODY: 7, EMP: 8 } },
      { label: "Cirurgião Especialista", stats: { INT: 8, REF: 7, DEX: 6, TECH: 8, COOL: 3, WILL: 5, LUCK: 6, MOVE: 6, BODY: 5, EMP: 7 } },
      { label: "Trauma Medic",           stats: { INT: 6, REF: 7, DEX: 5, TECH: 7, COOL: 5, WILL: 5, LUCK: 8, MOVE: 7, BODY: 6, EMP: 8 } },
      { label: "Médico Corporativo",     stats: { INT: 8, REF: 5, DEX: 5, TECH: 8, COOL: 5, WILL: 5, LUCK: 6, MOVE: 6, BODY: 5, EMP: 6 } },
      { label: "Médico de Combate",      stats: { INT: 8, REF: 6, DEX: 5, TECH: 8, COOL: 5, WILL: 4, LUCK: 8, MOVE: 5, BODY: 7, EMP: 7 } },
      { label: "Ripperdoc das Ruas",     stats: { INT: 6, REF: 5, DEX: 7, TECH: 7, COOL: 3, WILL: 5, LUCK: 8, MOVE: 5, BODY: 5, EMP: 8 } },
      { label: "Clínico do Submundo",    stats: { INT: 6, REF: 6, DEX: 7, TECH: 7, COOL: 5, WILL: 4, LUCK: 6, MOVE: 6, BODY: 5, EMP: 6 } },
      { label: "Médico Reconstrutivo",   stats: { INT: 8, REF: 7, DEX: 6, TECH: 6, COOL: 3, WILL: 4, LUCK: 8, MOVE: 7, BODY: 6, EMP: 7 } },
    ],
    skills: [
      { namePtBr: "Atletismo",               linkedStat: "DEX",  rank: 2, whyItMatters: "Chegar até o paciente em terreno hostil." },
      { namePtBr: "Briga",                   linkedStat: "DEX",  rank: 2, whyItMatters: "Contenção de pacientes agitados ou sob efeito de drogas." },
      { namePtBr: "Concentração",            linkedStat: "WILL", rank: 2, whyItMatters: "Manter a precisão cirúrgica quando tudo ao redor desmorona." },
      { namePtBr: "Conversação",             linkedStat: "EMP",  rank: 6, whyItMatters: "Pacientes com medo falam mais. Confiança faz parte do tratamento." },
      { namePtBr: "Educação",                linkedStat: "INT",  rank: 6, whyItMatters: "Base médica ampla — anatomia, farmacologia e procedimentos cirúrgicos." },
      { namePtBr: "Evasão",                  linkedStat: "DEX",  rank: 6, whyItMatters: "Um Medtech morto não salva ninguém — desviar é sobrevivência." },
      { namePtBr: "Primeiros Socorros",      linkedStat: "TECH", rank: 2, whyItMatters: "Triagem rápida antes da cirurgia ou quando o kit completo não está disponível." },
      { namePtBr: "Percepção Humana",        linkedStat: "EMP",  rank: 6, whyItMatters: "O que o paciente não fala — dor, medo, ocultamento — importa tanto quanto o que fala." },
      { namePtBr: "Idioma das Ruas",         linkedStat: "INT",  rank: 2, whyItMatters: "Comunicar-se com pacientes das ruas e contatos do submundo." },
      { namePtBr: "Especialista Local",      linkedStat: "INT",  rank: 2, whyItMatters: "Conhecer onde estão os ripperdocs, farmácias e zonas de trauma." },
      { namePtBr: "Percepção",               linkedStat: "INT",  rank: 2, whyItMatters: "Diagnosticar sintomas e detectar complicações ocultas." },
      { namePtBr: "Persuasão",               linkedStat: "COOL", rank: 2, whyItMatters: "Negociar pagamentos e acesso a medicamentos restritos." },
      { namePtBr: "Furtividade",             linkedStat: "DEX",  rank: 2, whyItMatters: "Mover-se discretamente em zonas de conflito ativo para resgatar feridos." },
      { namePtBr: "Técnica Básica",          linkedStat: "TECH", rank: 6, whyItMatters: "Manutenção de equipamentos médicos e cirúrgicos em campo." },
      { namePtBr: "Cibertecnologia",         linkedStat: "TECH", rank: 4, whyItMatters: "Instalar e reparar cyberware — menos que um Tech, mais que suficiente." },
      { namePtBr: "Dedução",                 linkedStat: "INT",  rank: 6, whyItMatters: "Diagnóstico preciso — identificar o problema antes de agir salva vidas." },
      { namePtBr: "Paramédico",              linkedStat: "TECH", rank: 6, whyItMatters: "A habilidade médica central — estabilização de trauma e cirurgia de campo." },
      { namePtBr: "Resistir Tortura/Drogas", linkedStat: "WILL", rank: 4, whyItMatters: "Resistir a interrogatórios quando capturado por facções que querem seus pacientes." },
      { namePtBr: "Ciência (à escolha)",     linkedStat: "INT",  rank: 6, whyItMatters: "Farmacologia, biologia ou anatomia avançada — especialização que salva vidas." },
      { namePtBr: "Fuzil",                   linkedStat: "REF",  rank: 6, whyItMatters: "Distância e poder de fogo para operar com segurança em campo de batalha." },
    ],
    gear: [
      // Weapons
      { name: "Espingarda",                      category: "weapon", damage: "5d6", description: "Devastadora em curto alcance. Proteção em campo de batalha.", cost: 500, icon: "🔫", choiceGroupId: "med-primary" },
      { name: "Rifle de Assalto",                category: "weapon", damage: "5d6", description: "Alcance médio. Mantém distância segura para tratar feridos.", cost: 500, icon: "🔫", choiceGroupId: "med-primary" },
      // Armor
      { name: "Armorjack Leve — Corpo (SP 11)",  category: "armor",  sp: 11,        description: "Você precisa chegar até o ferido antes de poder ajudá-lo.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)",      category: "armor",  sp: 11,        description: "Um Medtech morto não salva ninguém.", cost: 100, icon: "⛑️" },
      // Gear
      { name: "Munição Espingarda x100",         category: "gear",   description: "Cem cartuchos de espingarda.", cost: 100, icon: "📦", linkedChoice: { group: "med-primary", when: "Espingarda" } },
      { name: "Munição Rifle x100",              category: "gear",   description: "Cem balas de rifle.", cost: 100, icon: "📦", linkedChoice: { group: "med-primary", when: "Rifle de Assalto" } },
      { name: "Munição Incendiária Esping. x10", category: "gear",   description: "Dez cartuchos incendiários.", cost: 50, icon: "🔥", linkedChoice: { group: "med-primary", when: "Espingarda" } },
      { name: "Munição Incendiária Rifle x10",   category: "gear",   description: "Dez balas incendiárias de rifle.", cost: 50, icon: "🔥", linkedChoice: { group: "med-primary", when: "Rifle de Assalto" } },
      { name: "Granadas de Fumaça x2",           category: "gear",   description: "Cobertura visual para retirar feridos do campo de batalha.", cost: 100, icon: "💨" },
      { name: "Escudo Balístico",                category: "gear",   description: "Cobertura móvel com 10 HP. Interposto entre você e o ataque — o escudo absorve o dano inteiro. Protege enquanto você trabalha em campo hostil.", cost: 100, icon: "🛡️" },
      { name: "Mala Médica (Medtech Bag)",       category: "gear",   description: "Kit completo de trauma — suturas, medicamentos, curativos, desfibrilador.", cost: 100, icon: "🩺" },
      { name: "Airhypo",                         category: "gear",   description: "Seringa pressurizada. Administra medicamentos rapidamente.", cost: 100, icon: "💉" },
      { name: "Algemas",                         category: "gear",   description: "Para pacientes em delírio ou sob efeito de drogas. Requer BODY >10 para quebrar.", cost: 50, icon: "⛓️" },
      { name: "Lanterna",                        category: "gear",   description: "Feixe de 100m. Dura 10 horas. Para procedimentos em ambientes sem luz.", cost: 20, icon: "🔦" },
      { name: "Tinta Luminosa",                  category: "gear",   description: "Sinalização de urgência e marcação de locais de extração.", cost: 20, icon: "🎨" },
      { name: "Agente Pessoal",                  category: "gear",   description: "Smartphone com IA. +2 em Pesquisa em Biblioteca e +2 em Guarda-roupa & Estilo. Banco de dados médicos e registros.", cost: 100, icon: "📱" },
      { name: "Cama Inflável c/ Saco de Dormir",  category: "gear",   description: "Colchão autoinflável com saco de dormir. Dobra em pacote de 15cm×15cm.", cost: 20, icon: "🛏️" },
      { name: "Roupas Casuais",                  category: "gear",   description: "Generic Chic (jaquetas x3) + Leisurewear (calçados, calças x3, camisetas x5).", cost: 250, icon: "👕" },
    ],
    cyware: [
      { name: "Biomonitor",     namePtBr: "Biomonitor",              description: "Monitora sinais vitais — útil para monitorar pacientes.", humanityLoss: 0 },
      { name: "Cybereye",       namePtBr: "Cybereye",                description: "Olho artificial com 3 slots de opções.", humanityLoss: 7 },
      { name: "Nasal Filters",  namePtBr: "Filtros Nasais",          description: "Imune a gases tóxicos e agentes químicos.", humanityLoss: 2, choiceGroupId: "med-nasal" },
      { name: "Toxin Binders",  namePtBr: "Absorvedores de Toxinas", description: "+2 em Resistir Tortura/Drogas.", humanityLoss: 2, choiceGroupId: "med-nasal" },
      { name: "TeleOptics",     namePtBr: "TeleÓptica",              description: "Visão detalhada até 800m. Requer Cybereye.", humanityLoss: 3 },
    ],
    totalHumanityLoss: 12,
    empLoss: 2,
    startingEurobucks: 0,
    survivorTip: "Sua Habilidade Especial (Medicina) tem três especializações: Cirurgia, Farmacêutica e Criossistemas. Cirurgia é a mais versátil — permite instalar cyberware e tratar lesões críticas que outros simplesmente não conseguem curar.",
  },

  // ── MEDIA ─────────────────────────────────────────────────────────────────
  {
    roleId: "media",
    statTemplates: [
      { label: "Repórter de Combate",        stats: { INT: 6, REF: 6, DEX: 5, TECH: 5, COOL: 8, WILL: 7, LUCK: 5, MOVE: 7, BODY: 5, EMP: 7 } },
      { label: "Investigador das Sombras",   stats: { INT: 8, REF: 7, DEX: 7, TECH: 3, COOL: 6, WILL: 6, LUCK: 6, MOVE: 5, BODY: 6, EMP: 8 } },
      { label: "Jornalista de Resistência",  stats: { INT: 6, REF: 7, DEX: 7, TECH: 5, COOL: 6, WILL: 8, LUCK: 5, MOVE: 5, BODY: 5, EMP: 7 } },
      { label: "Repórter de Rua",            stats: { INT: 6, REF: 5, DEX: 7, TECH: 5, COOL: 6, WILL: 7, LUCK: 5, MOVE: 5, BODY: 6, EMP: 6 } },
      { label: "Influenciador Digital",      stats: { INT: 6, REF: 6, DEX: 7, TECH: 4, COOL: 8, WILL: 7, LUCK: 6, MOVE: 7, BODY: 5, EMP: 8 } },
      { label: "Âncora de Notícias",         stats: { INT: 7, REF: 5, DEX: 5, TECH: 4, COOL: 8, WILL: 7, LUCK: 6, MOVE: 7, BODY: 5, EMP: 8 } },
      { label: "Analista Investigativo",     stats: { INT: 8, REF: 5, DEX: 6, TECH: 3, COOL: 7, WILL: 6, LUCK: 6, MOVE: 5, BODY: 6, EMP: 7 } },
      { label: "Documentarista de Combate",  stats: { INT: 6, REF: 5, DEX: 6, TECH: 5, COOL: 6, WILL: 8, LUCK: 6, MOVE: 6, BODY: 7, EMP: 8 } },
      { label: "Correspondente de Guerra",   stats: { INT: 7, REF: 7, DEX: 5, TECH: 4, COOL: 6, WILL: 7, LUCK: 6, MOVE: 5, BODY: 6, EMP: 7 } },
      { label: "Cronista das Ruas",          stats: { INT: 7, REF: 6, DEX: 6, TECH: 3, COOL: 7, WILL: 6, LUCK: 7, MOVE: 6, BODY: 7, EMP: 6 } },
    ],
    skills: [
      { namePtBr: "Atletismo",             linkedStat: "DEX",  rank: 2, whyItMatters: "Mobilidade em campo — fugir de segurança corporativa quando a história esquenta." },
      { namePtBr: "Briga",                 linkedStat: "DEX",  rank: 2, whyItMatters: "Última linha de defesa quando o assédio vira agressão física." },
      { namePtBr: "Concentração",          linkedStat: "WILL", rank: 2, whyItMatters: "Manter o foco sob pressão durante investigações de risco." },
      { namePtBr: "Conversação",           linkedStat: "EMP",  rank: 6, whyItMatters: "Fazer fontes falarem naturalmente — a alma do jornalismo investigativo." },
      { namePtBr: "Educação",              linkedStat: "INT",  rank: 2, whyItMatters: "Conhecimento geral para contextualizar e entender histórias complexas." },
      { namePtBr: "Evasão",                linkedStat: "DEX",  rank: 6, whyItMatters: "Algumas histórias atraem perseguidores. Saber esquivar é vital." },
      { namePtBr: "Primeiros Socorros",    linkedStat: "TECH", rank: 2, whyItMatters: "Jornalistas de combate precisam se tratar no campo." },
      { namePtBr: "Percepção Humana",      linkedStat: "EMP",  rank: 6, whyItMatters: "Detectar quando uma fonte está mentindo, com medo ou sendo manipulada." },
      { namePtBr: "Idioma das Ruas",       linkedStat: "INT",  rank: 2, whyItMatters: "Comunicar-se com fontes do submundo sem levantar suspeita." },
      { namePtBr: "Especialista Local",    linkedStat: "INT",  rank: 6, whyItMatters: "Conhecer profundamente a área que você cobre — bairros, poderes, histórias." },
      { namePtBr: "Percepção",             linkedStat: "INT",  rank: 6, whyItMatters: "Notar detalhes, inconsistências e o que tentam esconder." },
      { namePtBr: "Persuasão",             linkedStat: "COOL", rank: 6, whyItMatters: "Convencer fontes, editores e alvos a cooperar — ou a recuar." },
      { namePtBr: "Furtividade",           linkedStat: "DEX",  rank: 2, whyItMatters: "Aproximar-se de fontes e locais sem ser identificado." },
      { namePtBr: "Suborno",               linkedStat: "COOL", rank: 6, whyItMatters: "Às vezes a história certa tem um preço — e vale pagar." },
      { namePtBr: "Composição",            linkedStat: "INT",  rank: 6, whyItMatters: "Escrever peças que mudam opiniões e derrubam corporações." },
      { namePtBr: "Dedução",               linkedStat: "INT",  rank: 6, whyItMatters: "Conectar pistas e revelar o que está escondido em plain sight." },
      { namePtBr: "Armas Curtas",          linkedStat: "REF",  rank: 6, whyItMatters: "Corporações que não gostam da sua história mandam mais que advogados." },
      { namePtBr: "Pesquisa em Biblioteca",linkedStat: "INT",  rank: 4, whyItMatters: "Pesquisar arquivos, registros e bancos de dados para embasar reportagens." },
      { namePtBr: "Leitura Labial",        linkedStat: "INT",  rank: 4, whyItMatters: "Ler conversas à distância — vital para cobertura discreta de eventos corporativos." },
      { namePtBr: "Fotografia/Filme",      linkedStat: "TECH", rank: 4, whyItMatters: "Registrar provas visuais irrefutáveis — a história mais poderosa é a que tem imagem." },
    ],
    gear: [
      // Weapons
      { name: "Pistola Pesada",                 category: "weapon", damage: "3d6", description: "Arma de defesa pessoal discreta para jornalistas em campo.", cost: 100, icon: "🔫", choiceGroupId: "media-pistol" },
      { name: "Pistola Muito Pesada",           category: "weapon", damage: "4d6", description: "Firepower elevado quando a história atrai inimigos sérios.", cost: 100, icon: "🔫", choiceGroupId: "media-pistol" },
      // Armor
      { name: "Armorjack Leve — Corpo (SP 11)", category: "armor",  sp: 11,        description: "Armadura básica. As corporações preferem que você não volte.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)",     category: "armor",  sp: 11,        description: "Proteção craniana. Jornalistas de combate usam capacete.", cost: 100, icon: "⛑️" },
      // Gear
      { name: "Munição Pistola Pesada x50",     category: "gear",   description: "Cinquenta balas para a Pistola Pesada.", cost: 50, icon: "📦", linkedChoice: { group: "media-pistol", when: "Pistola Pesada" } },
      { name: "Munição Pistola VH x50",         category: "gear",   description: "Cinquenta balas para a Pistola Muito Pesada.", cost: 50, icon: "📦", linkedChoice: { group: "media-pistol", when: "Pistola Muito Pesada" } },
      { name: "Câmera de Vídeo (12h)",          category: "gear",   description: "Grava 12h de áudio/vídeo. Provas visuais não têm preço.", cost: 100, icon: "📹" },
      { name: "Gravador de Áudio",              category: "gear",   description: "24 horas de gravação. Gravar conversas é a vida do Media.", cost: 100, icon: "🎙️" },
      { name: "Computador Laptop",              category: "gear",   description: "Para editar, publicar e transmitir.", cost: 50, icon: "💻" },
      { name: "Binóculos",                      category: "gear",   description: "Magnificação x2 ou x3. Para cobertura de eventos a distância.", cost: 50, icon: "🔭" },
      { name: "Lanterna",                      category: "gear",   description: "Feixe de 100m, 10 horas. Para reportagens em locais sem iluminação.", cost: 20, icon: "🔦" },
      { name: "Rádio Scanner/Player",          category: "gear",   description: "Toca música do Data Pool ou sintoniza rádios num raio de 1 milha.", cost: 50, icon: "📻" },
      { name: "Telefone Descartável x2",       category: "gear",   description: "Comunicação não rastreável com fontes sensíveis.", cost: 100, icon: "📞", choiceGroupId: "media-extra" },
      { name: "Pistola de Gancho",             category: "gear",   description: "Dispara linha de escalada até 30m. Acesso a locais de difícil alcance.", cost: 100, icon: "🪝", choiceGroupId: "media-extra" },
      { name: "Scrambler/Descriptografador",    category: "gear",   description: "Criptografa suas comunicações. Proteção e ferramenta de investigação.", cost: 500, icon: "🔐" },
      { name: "Agente Pessoal",                 category: "gear",   description: "Smartphone com IA. +2 em Pesquisa em Biblioteca e +2 em Guarda-roupa & Estilo. Transmissão ao vivo e banco de contatos.", cost: 100, icon: "📱" },
      { name: "Cama Inflável c/ Saco de Dormir",category: "gear",   description: "Colchão autoinflável com saco de dormir. Dobra em pacote de 15cm×15cm.", cost: 20, icon: "🛏️" },
      { name: "Roupas de Repórter",            category: "gear",   description: "Generic Chic (calçados, calças, camiseta) + Leisurewear (jaqueta) + Urbanflash (óculos).", cost: 240, icon: "👕" },
    ],
    cyware: [
      { name: "Cyberaudio Suite",      namePtBr: "Suite Cyberaudio",     description: "Ouvido cibernético com 3 slots de opções.", humanityLoss: 7 },
      { name: "Amplified Hearing",     namePtBr: "Audição Amplificada",  description: "+2 em Percepção para testes envolvendo audição. Requer Cyberaudio Suite.", humanityLoss: 3, choiceGroupId: "media-audio" },
      { name: "Voice Stress Analyzer", namePtBr: "Analisador de Voz",    description: "+2 em Percepção Humana e Interrogatório. Requer Cyberaudio Suite.", humanityLoss: 3, choiceGroupId: "media-audio" },
      { name: "Light Tattoo",          namePtBr: "Tatuagem de Luz",      description: "Patches subérmicos que projetam tatuagens coloridas.", humanityLoss: 0 },
    ],
    totalHumanityLoss: 10,
    empLoss: 1,
    startingEurobucks: 0,
    survivorTip: "Sua proteção número 1 é fama. Quanto mais conhecido for, mais caro fica te silenciar. Transmita ao vivo sempre que possível — ninguém elimina um repórter enquanto o mundo está assistindo.",
  },

  // ── EXEC ──────────────────────────────────────────────────────────────────
  {
    roleId: "exec",
    statTemplates: [
      { label: "Estrategista Corporativo",   stats: { INT: 8, REF: 5, DEX: 5, TECH: 3, COOL: 8, WILL: 6, LUCK: 6, MOVE: 5, BODY: 5, EMP: 7 } },
      { label: "Diretor de Divisão",         stats: { INT: 8, REF: 6, DEX: 6, TECH: 4, COOL: 7, WILL: 6, LUCK: 7, MOVE: 7, BODY: 5, EMP: 7 } },
      { label: "Negociador de Elite",        stats: { INT: 8, REF: 7, DEX: 6, TECH: 3, COOL: 8, WILL: 6, LUCK: 7, MOVE: 6, BODY: 4, EMP: 5 } },
      { label: "Chefe de Operações",         stats: { INT: 8, REF: 5, DEX: 7, TECH: 5, COOL: 6, WILL: 5, LUCK: 6, MOVE: 5, BODY: 5, EMP: 7 } },
      { label: "Lider de Operações",         stats: { INT: 7, REF: 7, DEX: 6, TECH: 5, COOL: 8, WILL: 5, LUCK: 7, MOVE: 7, BODY: 5, EMP: 6 } },
      { label: "Gerente de Projetos Negros", stats: { INT: 5, REF: 7, DEX: 7, TECH: 3, COOL: 6, WILL: 7, LUCK: 6, MOVE: 5, BODY: 5, EMP: 7 } },
      { label: "Executivo de Fusões",        stats: { INT: 6, REF: 6, DEX: 7, TECH: 5, COOL: 8, WILL: 7, LUCK: 6, MOVE: 7, BODY: 4, EMP: 6 } },
      { label: "Diretor de Inteligência",    stats: { INT: 6, REF: 7, DEX: 7, TECH: 3, COOL: 7, WILL: 5, LUCK: 7, MOVE: 5, BODY: 5, EMP: 7 } },
      { label: "Vice-Presidente Regional",   stats: { INT: 7, REF: 6, DEX: 7, TECH: 5, COOL: 7, WILL: 5, LUCK: 7, MOVE: 6, BODY: 5, EMP: 5 } },
      { label: "CEO em Ascensão",            stats: { INT: 7, REF: 7, DEX: 5, TECH: 5, COOL: 8, WILL: 6, LUCK: 6, MOVE: 7, BODY: 4, EMP: 7 } },
    ],
    skills: [
      { namePtBr: "Atletismo",          linkedStat: "DEX",  rank: 2, whyItMatters: "Mobilidade básica — Execs não costumam correr, mas às vezes precisam." },
      { namePtBr: "Briga",              linkedStat: "DEX",  rank: 2, whyItMatters: "Defesa pessoal quando os seguranças não chegam a tempo." },
      { namePtBr: "Concentração",       linkedStat: "WILL", rank: 2, whyItMatters: "Manter a clareza em negociações longas e de alto risco." },
      { namePtBr: "Conversação",        linkedStat: "EMP",  rank: 6, whyItMatters: "Extrair informações em reuniões sem que o outro perceba que está sendo trabalhado." },
      { namePtBr: "Educação",           linkedStat: "INT",  rank: 6, whyItMatters: "Base acadêmica e corporativa que sustenta todas as decisões estratégicas." },
      { namePtBr: "Evasão",             linkedStat: "DEX",  rank: 6, whyItMatters: "Sobreviver a atentados — Execs são alvos de alto valor." },
      { namePtBr: "Primeiros Socorros", linkedStat: "TECH", rank: 2, whyItMatters: "Estabilização básica antes que a equipe médica chegue." },
      { namePtBr: "Percepção Humana",   linkedStat: "EMP",  rank: 6, whyItMatters: "Detectar lealdade, traição e manipulação antes de assinar qualquer acordo." },
      { namePtBr: "Idioma das Ruas",    linkedStat: "INT",  rank: 2, whyItMatters: "Comunicar-se com os operativos de campo que executam suas ordens." },
      { namePtBr: "Especialista Local", linkedStat: "INT",  rank: 2, whyItMatters: "Conhecer o território corporativo — sede, subsidiárias e rivais." },
      { namePtBr: "Percepção",          linkedStat: "INT",  rank: 2, whyItMatters: "Detectar inconsistências em relatórios e dados manipulados." },
      { namePtBr: "Persuasão",          linkedStat: "COOL", rank: 6, whyItMatters: "Fechar acordos, convencer subordinados e pressionar rivais." },
      { namePtBr: "Furtividade",        linkedStat: "DEX",  rank: 2, whyItMatters: "Mover-se sem chamar atenção em áreas fora do território corporativo." },
      { namePtBr: "Contabilidade",      linkedStat: "INT",  rank: 6, whyItMatters: "Rastrear dinheiro, detectar desvios e criar fluxos financeiros invisíveis." },
      { namePtBr: "Burocracia",         linkedStat: "INT",  rank: 6, whyItMatters: "Navegar sistemas corporativos e criar obstáculos burocráticos para rivais." },
      { namePtBr: "Negócios",           linkedStat: "INT",  rank: 6, whyItMatters: "Contratos, fusões e como as corporações realmente funcionam." },
      { namePtBr: "Dedução",            linkedStat: "INT",  rank: 6, whyItMatters: "Identificar sabotagem, espionagem e manipulação de dados internos." },
      { namePtBr: "Armas Curtas",       linkedStat: "REF",  rank: 6, whyItMatters: "Execs raramente atiram — mas quando precisam, precisam acertar." },
      { namePtBr: "Leitura Labial",     linkedStat: "INT",  rank: 6, whyItMatters: "Ler conversas ao longe em eventos corporativos — informação é poder." },
      { namePtBr: "Aparência Pessoal",  linkedStat: "COOL", rank: 4, whyItMatters: "A imagem corporativa que abre portas e impõe respeito." },
    ],
    gear: [
      // Weapons
      { name: "Pistola Muito Pesada",           category: "weapon", damage: "4d6", description: "Execs usam armas que impressionam tanto quanto intimidam.", cost: 100, icon: "🔫" },
      // Armor
      { name: "Armorjack Leve — Corpo (SP 11)", category: "armor",  sp: 11,        description: "Vestida sob o terno. Ninguém suspeita.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)",     category: "armor",  sp: 11,        description: "Disponível quando necessário. Execs sérios têm proteção à mão.", cost: 100, icon: "⛑️" },
      // Gear
      { name: "Munição Básica VH x50",          category: "gear",   description: "Cinquenta balas. Esperemos que nunca precise de todas.", cost: 50, icon: "📦" },
      { name: "Comunicador de Rádio x4",        category: "gear",   description: "Quatro comunicadores para equipe táticas e reuniões discretas.", cost: 400, icon: "📻" },
      { name: "Scrambler/Descriptografador",    category: "gear",   description: "Criptografa comunicações. Nenhuma reunião confidencial sem isso.", cost: 500, icon: "🔐" },
      { name: "Agente Pessoal",                 category: "gear",   description: "Smartphone com IA. +2 em Pesquisa em Biblioteca e +2 em Guarda-roupa & Estilo. Agenda de contatos e banco de favores.", cost: 100, icon: "📱" },
      { name: "Cama Inflável c/ Saco de Dormir", category: "gear",   description: "Colchão autoinflável com saco de dormir. Dobra em pacote de 15cm×15cm.", cost: 20, icon: "🛏️" },
      { name: "Businesswear",                   category: "gear",   description: "Calçados, jaqueta, calça, óculos, camiseta, joias x2 — abre portas corporativas.", cost: 500, icon: "👔" },
    ],
    cyware: [
      { name: "Biomonitor",         namePtBr: "Biomonitor",              description: "Monitora sinais vitais em tempo real. Pode vincular ao Agente.", humanityLoss: 0, choiceGroupId: "exec-fashion" },
      { name: "Techhair",           namePtBr: "Cabelo Tech",             description: "Cabelo artificial com LEDs coloridos. +2 em Cuidados Pessoais se tiver Chemskin.", humanityLoss: 0, choiceGroupId: "exec-fashion" },
      { name: "Cyberaudio Suite",   namePtBr: "Suite Cyberaudio",        description: "Ouvido cibernético com 3 slots de opções.", humanityLoss: 7 },
      { name: "Internal Agent",     namePtBr: "Agente Interno",          description: "Agente totalmente funcional instalado internamente. Requer Cyberaudio Suite.", humanityLoss: 3 },
      { name: "Nasal Filters",      namePtBr: "Filtros Nasais",          description: "Imune a gases tóxicos e fumaças. Reuniões em ambientes controlados.", humanityLoss: 2, choiceGroupId: "exec-nasal" },
      { name: "Toxin Binders",      namePtBr: "Absorvedores de Toxinas", description: "+2 em Resistir Tortura/Drogas. Proteção contra envenenamento.", humanityLoss: 2, choiceGroupId: "exec-nasal" },
    ],
    totalHumanityLoss: 12,
    empLoss: 2,
    startingEurobucks: 0,
    survivorTip: "Sua Habilidade Especial (Trabalho em Equipe) te dá membros de equipe com funções secretas — guardas corporais, Netrunners, informantes. No nível 3, você ganha o primeiro membro. Invista nisso cedo.",
  },

  // ── LAWMAN ────────────────────────────────────────────────────────────────
  {
    roleId: "lawman",
    statTemplates: [
      { label: "Policial de Patrulha",        stats: { INT: 5, REF: 6, DEX: 7, TECH: 5, COOL: 7, WILL: 8, LUCK: 5, MOVE: 6, BODY: 5, EMP: 6 } },
      { label: "Detetive Urbano",             stats: { INT: 6, REF: 6, DEX: 6, TECH: 5, COOL: 6, WILL: 8, LUCK: 5, MOVE: 7, BODY: 5, EMP: 5 } },
      { label: "Agente Especializado",        stats: { INT: 5, REF: 7, DEX: 7, TECH: 7, COOL: 6, WILL: 7, LUCK: 5, MOVE: 5, BODY: 7, EMP: 6 } },
      { label: "Agente de Elite",             stats: { INT: 6, REF: 6, DEX: 7, TECH: 6, COOL: 6, WILL: 8, LUCK: 5, MOVE: 7, BODY: 7, EMP: 6 } },
      { label: "Investigador da NCPD",        stats: { INT: 6, REF: 6, DEX: 7, TECH: 6, COOL: 7, WILL: 7, LUCK: 6, MOVE: 5, BODY: 5, EMP: 6 } },
      { label: "Tenente de Campo",            stats: { INT: 7, REF: 6, DEX: 5, TECH: 5, COOL: 7, WILL: 8, LUCK: 5, MOVE: 6, BODY: 7, EMP: 4 } },
      { label: "Caçador de Cyberpsicóticos",  stats: { INT: 7, REF: 8, DEX: 7, TECH: 5, COOL: 6, WILL: 8, LUCK: 7, MOVE: 6, BODY: 5, EMP: 4 } },
      { label: "Patrulheiro das Zonas",       stats: { INT: 5, REF: 6, DEX: 6, TECH: 5, COOL: 6, WILL: 8, LUCK: 5, MOVE: 7, BODY: 6, EMP: 4 } },
      { label: "Agente de Controle",          stats: { INT: 7, REF: 7, DEX: 5, TECH: 5, COOL: 7, WILL: 7, LUCK: 6, MOVE: 5, BODY: 5, EMP: 6 } },
      { label: "Comandante de Operações",     stats: { INT: 6, REF: 6, DEX: 5, TECH: 6, COOL: 8, WILL: 7, LUCK: 5, MOVE: 7, BODY: 6, EMP: 6 } },
    ],
    skills: [
      { namePtBr: "Atletismo",          linkedStat: "DEX",  rank: 2, whyItMatters: "Perseguições, escaladas e mobilidade em operações táticas." },
      { namePtBr: "Briga",              linkedStat: "DEX",  rank: 6, whyItMatters: "Controlar suspeitos fisicamente — parte central do treinamento policial." },
      { namePtBr: "Concentração",       linkedStat: "WILL", rank: 2, whyItMatters: "Manter o foco em stakeouts prolongados e situações de alta pressão." },
      { namePtBr: "Conversação",        linkedStat: "EMP",  rank: 6, whyItMatters: "Entrevistar testemunhas e obter cooperação de civis em campo." },
      { namePtBr: "Educação",           linkedStat: "INT",  rank: 2, whyItMatters: "Conhecimento legal e processual para trabalhar dentro do sistema." },
      { namePtBr: "Evasão",             linkedStat: "DEX",  rank: 6, whyItMatters: "Desviar de tiros em combates urbanos — Lawmen são alvos prioritários." },
      { namePtBr: "Primeiros Socorros", linkedStat: "TECH", rank: 2, whyItMatters: "Estabilização básica de civis e aliados feridos durante operações." },
      { namePtBr: "Percepção Humana",   linkedStat: "EMP",  rank: 2, whyItMatters: "Detectar suspeitos mentindo durante interrogatórios." },
      { namePtBr: "Idioma das Ruas",    linkedStat: "INT",  rank: 2, whyItMatters: "Comunicar-se com informantes e navegar o submundo para coletar intel." },
      { namePtBr: "Especialista Local", linkedStat: "INT",  rank: 2, whyItMatters: "Conhecer o território de patrulha — onde o crime acontece e quem o faz." },
      { namePtBr: "Percepção",          linkedStat: "INT",  rank: 2, whyItMatters: "Detectar atividade suspeita e ameaças em cenas de crime." },
      { namePtBr: "Persuasão",          linkedStat: "COOL", rank: 2, whyItMatters: "Convencer suspeitos a se renderem pacificamente quando possível." },
      { namePtBr: "Furtividade",        linkedStat: "DEX",  rank: 2, whyItMatters: "Vigilância encoberta e aproximação silenciosa em operações táticas." },
      { namePtBr: "Fogo Automático",    linkedStat: "REF",  rank: 6, whyItMatters: "Supressão de fogo em combates urbanos de alta intensidade." },
      { namePtBr: "Criminologia",       linkedStat: "INT",  rank: 6, whyItMatters: "Entender padrões criminosos, identificar suspeitos e montar um caso." },
      { namePtBr: "Dedução",            linkedStat: "INT",  rank: 6, whyItMatters: "Conectar evidências e reconstruir o que aconteceu numa cena de crime." },
      { namePtBr: "Armas Curtas",       linkedStat: "REF",  rank: 6, whyItMatters: "Arma secundária sempre disponível para situações de curto alcance." },
      { namePtBr: "Interrogatório",     linkedStat: "COOL", rank: 6, whyItMatters: "Extrair confissões e informações de suspeitos. A pressão certa na hora certa." },
      { namePtBr: "Fuzil",              linkedStat: "REF",  rank: 6, whyItMatters: "Espingardas e rifles para situações táticas de médio e longo alcance." },
      { namePtBr: "Rastreamento",       linkedStat: "INT",  rank: 6, whyItMatters: "Seguir fugitivos pelas ruas de Night City e nas Terras Selvagens." },
    ],
    gear: [
      // Weapons
      { name: "Rifle de Assalto",               category: "weapon", damage: "5d6", description: "Arma padrão de operações táticas. Alcance médio com firepower sólido.", cost: 500, icon: "🔫", choiceGroupId: "law-primary" },
      { name: "Espingarda",                     category: "weapon", damage: "5d6", description: "Devastadora em curto alcance. Ideal para CQB urbano.", cost: 500, icon: "🔫", choiceGroupId: "law-primary" },
      { name: "Pistola Pesada",                 category: "weapon", damage: "3d6", description: "Secundária padrão. Sempre à mão quando o rifle não cabe.", cost: 100, icon: "🔫" },
      // Armor
      { name: "Armorjack Leve — Corpo (SP 11)", category: "armor",  sp: 11,        description: "Proteção padrão. Night City não respeita autoridade.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)",     category: "armor",  sp: 11,        description: "Proteção craniana. Lawmen sem capacete têm vida curta.", cost: 100, icon: "⛑️" },
      // Gear
      { name: "Munição Rifle x100",             category: "gear",   description: "Cem balas de rifle.", cost: 100, icon: "📦", choiceGroupId: "law-ammo" },
      { name: "Munição Espingarda x100",        category: "gear",   description: "Cem cartuchos de espingarda.", cost: 100, icon: "📦", choiceGroupId: "law-ammo" },
      { name: "Munição Slug x100",              category: "gear",   description: "Cem cartuchos slug — perfuração superior.", cost: 100, icon: "📦", choiceGroupId: "law-ammo" },
      { name: "Munição Pistola Pesada x30",     category: "gear",   description: "Trinta balas para a pistola. Sobressalente para emergências.", cost: 30, icon: "📦" },
      { name: "Escudo Balístico",               category: "gear",   description: "Cobertura móvel com 10 HP. Interposto entre você e o ataque — o escudo absorve o dano inteiro. Ocupa uma mão.", cost: 100, icon: "🛡️", choiceGroupId: "law-shield" },
      { name: "Granadas de Fumaça x2",          category: "gear",   description: "Cobertura visual para extrações e criação de zona segura.", cost: 100, icon: "💨", choiceGroupId: "law-shield" },
      { name: "Algemas x2",                     category: "gear",   description: "Para detenções. Suspeitos com cyberware precisam de contenção.", cost: 100, icon: "⛓️" },
      { name: "Comunicador de Rádio",           category: "gear",   description: "Comunicação com equipe e pedido de reforço. Vital para a Habilidade Especial.", cost: 100, icon: "📻" },
      { name: "Lanterna",                       category: "gear",   description: "Feixe de 100m, 10 horas. Operações noturnas e locais sem iluminação.", cost: 20, icon: "🔦" },
      { name: "Sinalizador x10",                category: "gear",   description: "Dez sinalizadores — perímetro de cena de crime e sinalização de extração.", cost: 100, icon: "🔴" },
      { name: "Agente Pessoal",                 category: "gear",   description: "Smartphone com IA. +2 em Pesquisa em Biblioteca e +2 em Guarda-roupa & Estilo. Bancos de dados criminais e identificação.", cost: 100, icon: "📱" },
      { name: "Cama Inflável c/ Saco de Dormir",category: "gear",   description: "Colchão autoinflável com saco de dormir. Dobra em pacote de 15cm×15cm.", cost: 20, icon: "🛏️" },
      { name: "Roupas de Patrulha",             category: "gear",   description: "Generic Chic (jaqueta, calças x2, camisetas x3) + Leisurewear (calçados x2, jaquetas x2, calças x2, óculos, camisetas x2).", cost: 440, icon: "👕" },
    ],
    cyware: [
      { name: "Hidden Holster",  namePtBr: "Coldre Escondido",  description: "Armazena uma arma de porte dentro do corpo. Ninguém vai achar no baculejo.", humanityLoss: 7 },
      { name: "Subdermal Pocket", namePtBr: "Bolso Subdérmico", description: "Compartimento 5cm×10cm sob a pele com fecho RealSkinn. Para provas, chips ou contrabando.", humanityLoss: 3 },
    ],
    totalHumanityLoss: 10,
    empLoss: 1,
    startingEurobucks: 0,
    survivorTip: "Sua Habilidade Especial (Reforço) é mais poderosa quanto maior o nível — de um único parceiro até uma equipe de assalto completa. Use-a estrategicamente: peça Reforço ANTES da situação escalar, não depois.",
  },

  // ── FIXER ─────────────────────────────────────────────────────────────────
  {
    roleId: "fixer",
    statTemplates: [
      { label: "Corretor das Sombras",     stats: { INT: 8, REF: 5, DEX: 7, TECH: 4, COOL: 6, WILL: 5, LUCK: 8, MOVE: 5, BODY: 5, EMP: 8 } },
      { label: "Traficante de Dados",      stats: { INT: 8, REF: 5, DEX: 5, TECH: 5, COOL: 6, WILL: 7, LUCK: 8, MOVE: 7, BODY: 5, EMP: 7 } },
      { label: "Intermediário do Submundo",stats: { INT: 6, REF: 6, DEX: 6, TECH: 4, COOL: 5, WILL: 6, LUCK: 8, MOVE: 6, BODY: 3, EMP: 8 } },
      { label: "Negociador Influente",     stats: { INT: 7, REF: 7, DEX: 5, TECH: 5, COOL: 7, WILL: 6, LUCK: 7, MOVE: 7, BODY: 5, EMP: 8 } },
      { label: "Agente de Recursos",       stats: { INT: 8, REF: 6, DEX: 6, TECH: 3, COOL: 6, WILL: 5, LUCK: 8, MOVE: 7, BODY: 5, EMP: 6 } },
      { label: "Operador das Sombras",     stats: { INT: 8, REF: 7, DEX: 5, TECH: 5, COOL: 6, WILL: 7, LUCK: 7, MOVE: 5, BODY: 3, EMP: 6 } },
      { label: "Traficante de Informação", stats: { INT: 8, REF: 6, DEX: 6, TECH: 5, COOL: 6, WILL: 5, LUCK: 6, MOVE: 7, BODY: 5, EMP: 8 } },
      { label: "Corretor Urbano",          stats: { INT: 6, REF: 6, DEX: 7, TECH: 4, COOL: 7, WILL: 6, LUCK: 7, MOVE: 7, BODY: 4, EMP: 7 } },
      { label: "Mestre dos Contatos",      stats: { INT: 8, REF: 7, DEX: 7, TECH: 5, COOL: 5, WILL: 5, LUCK: 7, MOVE: 6, BODY: 5, EMP: 7 } },
      { label: "Agente de Conexões",       stats: { INT: 6, REF: 5, DEX: 6, TECH: 5, COOL: 5, WILL: 6, LUCK: 8, MOVE: 6, BODY: 4, EMP: 7 } },
    ],
    skills: [
      { namePtBr: "Atletismo",          linkedStat: "DEX",  rank: 2, whyItMatters: "Mobilidade para reuniões em locais incomuns e fugas quando necessário." },
      { namePtBr: "Briga",              linkedStat: "DEX",  rank: 2, whyItMatters: "Defesa pessoal quando a negociação azeda e não há segurança por perto." },
      { namePtBr: "Concentração",       linkedStat: "WILL", rank: 2, whyItMatters: "Manter a cabeça fria em negociações de alto risco." },
      { namePtBr: "Conversação",        linkedStat: "EMP",  rank: 6, whyItMatters: "Construir rapport e obter informações antes de revelar suas cartas." },
      { namePtBr: "Educação",           linkedStat: "INT",  rank: 2, whyItMatters: "Conhecimento suficiente para entender o que está vendendo e comprando." },
      { namePtBr: "Evasão",             linkedStat: "DEX",  rank: 6, whyItMatters: "Negociações que deram errado frequentemente terminam em violência." },
      { namePtBr: "Primeiros Socorros", linkedStat: "TECH", rank: 2, whyItMatters: "Estabilização básica quando o encontro vira emboscada." },
      { namePtBr: "Percepção Humana",   linkedStat: "EMP",  rank: 6, whyItMatters: "Detectar quando alguém está mentindo — vital para não ser enganado." },
      { namePtBr: "Idioma das Ruas",    linkedStat: "INT",  rank: 4, whyItMatters: "Fluência no submundo — cada Fixer vive ou morre por suas conexões." },
      { namePtBr: "Especialista Local", linkedStat: "INT",  rank: 6, whyItMatters: "Conhecer quem é quem, onde estão e o que querem na sua área de operação." },
      { namePtBr: "Percepção",          linkedStat: "INT",  rank: 2, whyItMatters: "Detectar presença hostil em locais de encontro — ambushes são comuns." },
      { namePtBr: "Persuasão",          linkedStat: "COOL", rank: 4, whyItMatters: "Convencer clientes e fornecedores a aceitar seus termos." },
      { namePtBr: "Furtividade",        linkedStat: "DEX",  rank: 2, whyItMatters: "Encontros discretos e movimentação sem atrair atenção indesejada." },
      { namePtBr: "Suborno",            linkedStat: "COOL", rank: 6, whyItMatters: "Às vezes a solução mais rápida é simplesmente pagar — Fixers sabem quanto e quando." },
      { namePtBr: "Negócios",           linkedStat: "INT",  rank: 6, whyItMatters: "Precificar informações, calcular margens e estruturar acordos lucrativos." },
      { namePtBr: "Falsificação",       linkedStat: "TECH", rank: 6, whyItMatters: "Criar documentos e identidades que pareçam legítimas para clientes e parceiros." },
      { namePtBr: "Armas Curtas",       linkedStat: "REF",  rank: 6, whyItMatters: "Quando a negociação falha completamente — e isso acontece." },
      { namePtBr: "Abrir Fechadura",    linkedStat: "TECH", rank: 4, whyItMatters: "Acessar espaços restritos para recuperar mercadoria ou informação." },
      { namePtBr: "Malícia de Rua",     linkedStat: "COOL", rank: 6, whyItMatters: "A perícia que define o Fixer — conhecer o submundo e seus jogadores." },
      { namePtBr: "Comércio",           linkedStat: "COOL", rank: 6, whyItMatters: "Negociar preços de armas, cyberware e favores nas Night Markets." },
    ],
    gear: [
      // Weapons
      { name: "Pistola Pesada (1ª)",            category: "weapon", damage: "3d6", description: "Visível e intimidadora. Concealable.", cost: 100, icon: "🔫", choiceGroupId: "fix-pistol1" },
      { name: "Pistola Muito Pesada (1ª)",      category: "weapon", damage: "4d6", description: "Alta potência. Concealable.", cost: 100, icon: "🔫", choiceGroupId: "fix-pistol1" },
      { name: "Pistola Pesada (2ª)",            category: "weapon", damage: "3d6", description: "Segunda pistola — backup ou segunda opção.", cost: 100, icon: "🔫", choiceGroupId: "fix-pistol2" },
      { name: "Pistola Muito Pesada (2ª)",      category: "weapon", damage: "4d6", description: "Segunda pistola de alta potência.", cost: 100, icon: "🔫", choiceGroupId: "fix-pistol2" },
      { name: "Arma Melee Leve",               category: "weapon", damage: "1d6", description: "Discreta e concealável. Última linha de defesa em situações sociais.", cost: 50, icon: "🔪" },
      // Armor
      { name: "Armorjack Leve — Corpo (SP 11)", category: "armor",  sp: 11,        description: "Vestida sob roupa de negócios. Ninguém suspeita.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)",     category: "armor",  sp: 11,        description: "Para emergências — boa parte das reuniões não exige isso.", cost: 100, icon: "⛑️" },
      // Gear
      { name: "Munição Pistola Pesada x100",    category: "gear",   description: "Cem balas — 1ª pistola.", cost: 100, icon: "📦", linkedChoice: { group: "fix-pistol1", when: "Pistola Pesada (1ª)" } },
      { name: "Munição Pistola VH x100",        category: "gear",   description: "Cem balas — 1ª pistola.", cost: 100, icon: "📦", linkedChoice: { group: "fix-pistol1", when: "Pistola Muito Pesada (1ª)" } },
      { name: "Munição Pistola Pesada x100",    category: "gear",   description: "Cem balas — 2ª pistola.", cost: 100, icon: "📦", linkedChoice: { group: "fix-pistol2", when: "Pistola Pesada (2ª)" } },
      { name: "Munição Pistola VH x100",        category: "gear",   description: "Cem balas — 2ª pistola.", cost: 100, icon: "📦", linkedChoice: { group: "fix-pistol2", when: "Pistola Muito Pesada (2ª)" } },
      { name: "Detector de Microfones",         category: "gear",   description: "Detecta dispositivos de escuta em raio de 2m. Nenhum encontro sem checar.", cost: 500, icon: "🔍" },
      { name: "Computador Laptop",              category: "gear",   description: "Registros, contatos, transferências e comunicação segura.", cost: 50, icon: "💻" },
      { name: "Telefone Descartável x2",        category: "gear",   description: "Para comunicações que não devem ser rastreadas.", cost: 100, icon: "📞" },
      { name: "Agente Pessoal",                 category: "gear",   description: "Smartphone com IA. +2 em Pesquisa em Biblioteca e +2 em Guarda-roupa & Estilo. Agenda de contatos e banco de favores.", cost: 100, icon: "📱" },
      { name: "Cama Inflável c/ Saco de Dormir",category: "gear",   description: "Colchão autoinflável com saco de dormir. Dobra em pacote de 15cm×15cm.", cost: 20, icon: "🛏️" },
      { name: "Roupas da Cena",                 category: "gear",   description: "Generic Chic (lentes, joias) + Leisurewear (óculos) + Urbanflash (calçados, jaqueta, calças, camiseta).", cost: 300, icon: "👕" },
    ],
    cyware: [
      { name: "Cyberaudio Suite",      namePtBr: "Suite Cyberaudio",     description: "Ouvido cibernético com 3 slots de opções. Base para todos os implantes de áudio.", humanityLoss: 7 },
      { name: "Internal Agent",        namePtBr: "Agente Interno",       description: "Agente totalmente funcional instalado internamente. Requer Cyberaudio Suite.", humanityLoss: 3 },
      { name: "Subdermal Pocket",      namePtBr: "Bolso Subdérmico",     description: "Compartimento 5cm×10cm sob a pele com fecho RealSkinn. Para chips, créditos ou provas.", humanityLoss: 3 },
      { name: "Voice Stress Analyzer", namePtBr: "Analisador de Voz",    description: "+2 em Percepção Humana e Interrogatório. Sabe quando estão mentindo. Requer Cyberaudio Suite.", humanityLoss: 3, choiceGroupId: "fix-audio" },
      { name: "Amplified Hearing",     namePtBr: "Audição Amplificada",  description: "+2 em Percepção para testes de audição. Requer Cyberaudio Suite.", humanityLoss: 3, choiceGroupId: "fix-audio" },
    ],
    totalHumanityLoss: 16,
    empLoss: 2,
    startingEurobucks: 0,
    survivorTip: "Informação é sua moeda mais valiosa. Sua Habilidade Especial (Operador) te dá acesso a recursos no mercado negro que outros simplesmente não conseguem encontrar. Construa uma rede diversificada — um contato em cada área.",
  },

  // ── NOMAD ─────────────────────────────────────────────────────────────────
  {
    roleId: "nomad",
    statTemplates: [
      { label: "Batedor das Terras Selvagens", stats: { INT: 6, REF: 6, DEX: 8, TECH: 3, COOL: 6, WILL: 7, LUCK: 6, MOVE: 6, BODY: 6, EMP: 4 } },
      { label: "Guerreiro do Comboio",         stats: { INT: 5, REF: 7, DEX: 6, TECH: 5, COOL: 8, WILL: 8, LUCK: 8, MOVE: 7, BODY: 5, EMP: 4 } },
      { label: "Guerreiro da Estrada",         stats: { INT: 5, REF: 8, DEX: 6, TECH: 3, COOL: 8, WILL: 7, LUCK: 6, MOVE: 5, BODY: 6, EMP: 5 } },
      { label: "Piloto de Combate",            stats: { INT: 5, REF: 8, DEX: 7, TECH: 4, COOL: 8, WILL: 6, LUCK: 7, MOVE: 7, BODY: 7, EMP: 5 } },
      { label: "Loadmaster Nômade",            stats: { INT: 6, REF: 6, DEX: 6, TECH: 3, COOL: 6, WILL: 7, LUCK: 6, MOVE: 7, BODY: 7, EMP: 4 } },
      { label: "Outrider do Clã",              stats: { INT: 7, REF: 6, DEX: 8, TECH: 4, COOL: 6, WILL: 7, LUCK: 6, MOVE: 5, BODY: 6, EMP: 5 } },
      { label: "Contrabandista das Rotas",     stats: { INT: 6, REF: 7, DEX: 8, TECH: 4, COOL: 6, WILL: 6, LUCK: 7, MOVE: 5, BODY: 7, EMP: 5 } },
      { label: "Protetor do Bando",            stats: { INT: 5, REF: 7, DEX: 8, TECH: 3, COOL: 8, WILL: 6, LUCK: 7, MOVE: 5, BODY: 5, EMP: 5 } },
      { label: "Rastreador Nômade",            stats: { INT: 6, REF: 7, DEX: 6, TECH: 4, COOL: 8, WILL: 6, LUCK: 6, MOVE: 6, BODY: 6, EMP: 6 } },
      { label: "Guardião das Rotas",           stats: { INT: 5, REF: 6, DEX: 7, TECH: 4, COOL: 7, WILL: 8, LUCK: 7, MOVE: 7, BODY: 7, EMP: 4 } },
    ],
    skills: [
      { namePtBr: "Atletismo",                    linkedStat: "DEX",  rank: 2, whyItMatters: "Mobilidade fora do veículo — escalar, correr e atravessar terreno inóspito." },
      { namePtBr: "Briga",                        linkedStat: "DEX",  rank: 6, whyItMatters: "Combate corpo a corpo quando os tiros param e as facas entram." },
      { namePtBr: "Concentração",                 linkedStat: "WILL", rank: 2, whyItMatters: "Manter o foco em longas travessias e situações extremas de sobrevivência." },
      { namePtBr: "Conversação",                  linkedStat: "EMP",  rank: 2, whyItMatters: "Negociar passagens, alianças e comércio com outras tribos e cidades." },
      { namePtBr: "Educação",                     linkedStat: "INT",  rank: 2, whyItMatters: "Conhecimento básico de mecânica, navegação e recursos das Terras Selvagens." },
      { namePtBr: "Evasão",                       linkedStat: "DEX",  rank: 6, whyItMatters: "Desviar de projéteis e ataques tanto dentro quanto fora do veículo." },
      { namePtBr: "Primeiros Socorros",           linkedStat: "TECH", rank: 6, whyItMatters: "Nas Terras Selvagens não há hospital. Você é o médico do bando." },
      { namePtBr: "Percepção Humana",             linkedStat: "EMP",  rank: 2, whyItMatters: "Julgar a intenção de estranhos em encontros nas estradas." },
      { namePtBr: "Idioma das Ruas",              linkedStat: "INT",  rank: 2, whyItMatters: "Comunicar-se com população urbana quando o bando entra na cidade." },
      { namePtBr: "Especialista Local",           linkedStat: "INT",  rank: 2, whyItMatters: "Conhecer as rotas, postos e territórios ao longo das estradas que seu bando usa." },
      { namePtBr: "Percepção",                    linkedStat: "INT",  rank: 4, whyItMatters: "Detectar emboscadas nas estradas e sinais de perigo no horizonte." },
      { namePtBr: "Persuasão",                    linkedStat: "COOL", rank: 2, whyItMatters: "Convencer outras tribos e comerciantes a negociar em vez de lutar." },
      { namePtBr: "Furtividade",                  linkedStat: "DEX",  rank: 6, whyItMatters: "Aproximação silenciosa em reconhecimento e emboscadas noturnas." },
      { namePtBr: "Lidar com Animais",            linkedStat: "INT",  rank: 6, whyItMatters: "Nas Terras Selvagens, animais são aliados, transporte e recurso." },
      { namePtBr: "Dirigir Veículo Terrestre",    linkedStat: "REF",  rank: 6, whyItMatters: "Perseguições, combate em movimento e fuga — o coração do papel Nomad." },
      { namePtBr: "Armas Curtas",                 linkedStat: "REF",  rank: 6, whyItMatters: "Arma pessoal padrão — usável dentro do veículo ou a pé." },
      { namePtBr: "Armas Brancas",                linkedStat: "DEX",  rank: 6, whyItMatters: "Combate silencioso e de curto alcance essencial nas Terras Selvagens." },
      { namePtBr: "Rastreamento",                 linkedStat: "INT",  rank: 6, whyItMatters: "Seguir rastros e localizar alvos no território que você conhece como ninguém." },
      { namePtBr: "Comércio",                     linkedStat: "COOL", rank: 6, whyItMatters: "Negociar suprimentos, passagens e favores entre bandos e cidades." },
      { namePtBr: "Sobrevivência em Terras Selvagens", linkedStat: "INT", rank: 6, whyItMatters: "Comida, água, abrigo — sobreviver sem reabastecimento é sua especialidade." },
    ],
    gear: [
      // Weapons
      { name: "Pistola Pesada (1ª)",            category: "weapon", damage: "3d6", description: "Arma pessoal do Nomad — usada a pé e dentro de veículos.", cost: 100, icon: "🔫", choiceGroupId: "nom-pistol1" },
      { name: "Pistola Muito Pesada (1ª)",      category: "weapon", damage: "4d6", description: "Alta potência para a vida nas Terras Selvagens.", cost: 100, icon: "🔫", choiceGroupId: "nom-pistol1" },
      { name: "Arma Melee Pesada",              category: "weapon", damage: "3d6", description: "Para combate corpo a corpo quando fora do veículo.", cost: 100, icon: "🔪", choiceGroupId: "nom-pistol2" },
      { name: "Pistola Pesada (2ª)",            category: "weapon", damage: "3d6", description: "Segunda pistola para backup de combate.", cost: 100, icon: "🔫", choiceGroupId: "nom-pistol2" },
      // Armor
      { name: "Armorjack Leve — Corpo (SP 11)", category: "armor",  sp: 11,        description: "Couro nômade com proteção balística. Parece roupa, protege como armadura.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)",     category: "armor",  sp: 11,        description: "Proteção craniana. Acidentes de veículo são comuns nas Terras Selvagens.", cost: 100, icon: "⛑️" },
      // Gear
      { name: "Munição Pistola Pesada x100",    category: "gear",   description: "Cem balas — 1ª pistola.", cost: 100, icon: "📦", linkedChoice: { group: "nom-pistol1", when: "Pistola Pesada (1ª)" } },
      { name: "Munição Pistola VH x100",        category: "gear",   description: "Cem balas — 1ª pistola.", cost: 100, icon: "📦", linkedChoice: { group: "nom-pistol1", when: "Pistola Muito Pesada (1ª)" } },
      { name: "Munição Pistola Pesada x100",    category: "gear",   description: "Cem balas — 2ª pistola.", cost: 100, icon: "📦", linkedChoice: { group: "nom-pistol2", when: "Pistola Pesada (2ª)" } },
      { name: "Comunicador de Rádio x2",            category: "gear",   description: "Um para você, um para o bando. Coordenação em comboio é vital.", cost: 200, icon: "📻" },
      { name: "Mala Médica (Medtech Bag)",          category: "gear",   description: "O bando nem sempre tem um Medtech. Cuidados básicos salvam vidas.", cost: 100, icon: "🩺" },
      { name: "Tenda e Equipamento de Camping",     category: "gear",   description: "Para acampar no campo.", cost: 50, icon: "⛺" },
      { name: "Pistola de Gancho",                  category: "gear",   description: "Dispara linha de escalada até 30m. Essencial para acessar elevações.", cost: 100, icon: "🪝" },
      { name: "Corda (60m)",                        category: "gear",   description: "Corda de nylon. Para escaladas, amarrações e travessias.", cost: 20, icon: "🪢" },
      { name: "Ferramenta Multifuncional (Techtool)",category: "gear",  description: "Tudo-em-um para reparos básicos. +1 em rolagens de reparo simples.", cost: 100, icon: "🔧" },
      { name: "Fita Isolante",                      category: "gear",   description: "Multiuso. Reparos provisórios, fixação e marcação.", cost: 20, icon: "🔧" },
      { name: "Lanterna",                           category: "gear",   description: "Feixe de 100m, 10 horas. Para navegação noturna nas estradas.", cost: 20, icon: "🔦" },
      { name: "Máscara Antipoluição",               category: "gear",   description: "Zonas industriais e regiões contaminadas são comuns nas Terras Selvagens.", cost: 20, icon: "😷" },
      { name: "Agente Pessoal",                     category: "gear",   description: "Smartphone com IA. +2 em Pesquisa em Biblioteca e +2 em Guarda-roupa & Estilo. GPS, clima e comunicação.", cost: 100, icon: "📱" },
      { name: "Cama Inflável c/ Saco de Dormir",   category: "gear",   description: "Colchão autoinflável com saco de dormir. Dobra em pacote de 15cm×15cm.", cost: 20, icon: "🛏️" },
      { name: "Couro Nômade",                       category: "gear",   description: "Top x4, calças x2, calçados x2, jaqueta, chapéu + Bohemian (joias). Western e tribal.", cost: 600, icon: "🧥" },
    ],
    cyware: [
      { name: "Neural Link",    namePtBr: "Neural Link",          description: "Sistema nervoso artificial. 5 slots. Base para cyberware neural.", humanityLoss: 7 },
      { name: "Interface Plugs",namePtBr: "Plugues de Interface", description: "Conectores para máquinas e veículos — essencial para pilotagem neural.", humanityLoss: 7, choiceGroupId: "nom-neural" },
      { name: "Wolvers",        namePtBr: "Wolvers",              description: "Garras retráteis nos nós dos dedos. Arma Pesada de Melee. Concealable.", humanityLoss: 7, choiceGroupId: "nom-neural" },
    ],
    totalHumanityLoss: 14,
    empLoss: 2,
    startingEurobucks: 0,
    survivorTip: "Sua Habilidade Especial (Moto) expande o pool de veículos da Família e aumenta sua expertise em dirigir qualquer tipo de veículo. Use mobilidade como vantagem tática — flanqueie inimigos e crie rotas de fuga que outros não conseguem seguir.",
  },
];

// ─── Cultural Origins ─────────────────────────────────────────────────────────
// 10 exatas regiões do livro (p.46). Role 1d10 ou escolha.
// O jogador escolhe UM idioma da lista de sua região — começa com Nível 4 nesse idioma.
// O livro permite escolher qualquer idioma não listado se fizer sentido para o personagem.

export interface CulturalOrigin {
  id: string;
  roll: number;           // 1–10 (resultado do d10 no livro)
  name: string;           // Nome em PT-BR
  nameOriginal: string;   // Nome original em inglês
  description: string;
  languages: string[];    // Idiomas disponíveis para escolha
  flavor: string;
}

export const culturalOrigins: CulturalOrigin[] = [
  {
    roll: 1,
    id: "norte-americano",
    name: "Norte-Americano/a",
    nameOriginal: "North American",
    description:
      "Criado nos fragmentos dos antigos EUA — megacidades corporativas, zonas de guerra, subúrbios em decadência ou regiões tribais. Uma terra de extremos: torres de vidro ao lado de ruínas pós-colapso.",
    languages: ["Chinês", "Cree", "Crioulo", "Inglês", "Francês", "Navajo", "Espanhol"],
    flavor: "Você cresceu no epicentro das guerras corporativas. Ninguém conhece as regras do jogo melhor que você.",
  },
  {
    roll: 2,
    id: "sul-central-americano",
    name: "Sul/Centro-Americano/a",
    nameOriginal: "South/Central American",
    description:
      "Das favelas do Brasil, das selvas da América Central ou das metrópoles andinas. Uma região de biodiversidade imensa e desigualdade brutal, onde comunidades aprenderam a sobreviver sem ajuda do Estado.",
    languages: ["Crioulo", "Inglês", "Alemão", "Guaraní", "Maia", "Português", "Quéchua", "Espanhol"],
    flavor: "Família e comunidade são tudo. Você aprendeu que unidos somos mais fortes do que qualquer corporação.",
  },
  {
    roll: 3,
    id: "europeu-ocidental",
    name: "Europeu/a Ocidental",
    nameOriginal: "Western European",
    description:
      "Da Europa fragmentada pós-guerras corporativas — de Amsterdam a Lisboa, de Berlim a Madrid. Uma região que mistura tradição milenar com tecnologia de ponta e cicatrizes de conflitos recentes.",
    languages: ["Holandês", "Inglês", "Francês", "Alemão", "Italiano", "Norueguês", "Português", "Espanhol"],
    flavor: "Você cresceu sob a sombra de impérios que caíram e corporações que os substituíram. A história ensina paciência.",
  },
  {
    roll: 4,
    id: "europeu-oriental",
    name: "Europeu/a Oriental",
    nameOriginal: "Eastern European",
    description:
      "Do leste europeu — Polônia, Rússia, Ucrânia, países bálticos. Uma região forjada por décadas de conflito ideológico e agora dominada por oligarcas corporativos que substituíram os antigos regimes.",
    languages: ["Inglês", "Finlandês", "Polonês", "Romeno", "Russo", "Ucraniano"],
    flavor: "Sobrevivência é uma arte refinada onde você veio. O frio forja o caráter — e o ceticismo salva vidas.",
  },
  {
    roll: 5,
    id: "oriente-medio-norte-africa",
    name: "Oriente Médio/Norte da África",
    nameOriginal: "Middle Eastern/North African",
    description:
      "Dos desertos do Irã às costas do Marrocos, do Levante ao Golfo Pérsico. Uma região de culturas milenares, recursos naturais disputados e conflitos que definiram o mundo moderno.",
    languages: ["Árabe", "Berbere", "Inglês", "Farsi", "Francês", "Hebraico", "Turco"],
    flavor: "Você vem de um povo que sobreviveu a impérios, colonizações e guerras corporativas. A resiliência está no seu DNA.",
  },
  {
    roll: 6,
    id: "africa-subsaariana",
    name: "África Subsaariana",
    nameOriginal: "Sub-Saharan African",
    description:
      "Da Africa subsaariana — do boom tecnológico da África Oriental às metrópoles do oeste e sul. Uma região em plena expansão, com forte associação com os Highriders em órbita e tecnologia inovadora nascida da necessidade.",
    languages: ["Árabe", "Inglês", "Francês", "Hauçá", "Lingala", "Oromo", "Português", "Suaíli", "Twi", "Iorubá"],
    flavor: "O mundo finalmente percebeu o que a África sempre soube: inovação nasce da necessidade. Você leva isso aonde for.",
  },
  {
    roll: 7,
    id: "sul-da-asia",
    name: "Sul da Ásia",
    nameOriginal: "South Asian",
    description:
      "Da Índia ao Paquistão, do Bangladesh ao Sri Lanka. Uma região de bilhões de pessoas, culturas milenares e centros tecnológicos que rivalizam com qualquer megacidade do mundo.",
    languages: ["Bengali", "Dari", "Inglês", "Hindi", "Nepali", "Cingalês", "Tâmil", "Urdu"],
    flavor: "Você cresceu rodeado de diversidade absoluta. Adaptar-se a qualquer ambiente e qualquer pessoa é sua segunda natureza.",
  },
  {
    roll: 8,
    id: "sudeste-asiatico",
    name: "Sudeste Asiático",
    nameOriginal: "South East Asian",
    description:
      "De Singapura ao Vietnã, da Indonésia às Filipinas. Uma região de arquipélagos e selvas, megacidades flutuantes e rotas comerciais que o mundo inteiro depende para funcionar.",
    languages: ["Árabe", "Birmanês", "Inglês", "Filipino", "Hindi", "Indonésio", "Khmer", "Malaio", "Vietnamita"],
    flavor: "Você conhece as rotas entre os mundos — tanto as marítimas quanto as da NET. Conexões são seu maior ativo.",
  },
  {
    roll: 9,
    id: "leste-asiatico",
    name: "Leste Asiático",
    nameOriginal: "East Asian",
    description:
      "Do Japão corporativo à China das megacidades, da Coreia à Mongólia. Uma região que definiu a estética cyberpunk muito antes do resto do mundo entender o que isso significava.",
    languages: ["Cantonês", "Inglês", "Japonês", "Coreano", "Mandarim", "Mongol"],
    flavor: "Você vem de onde o futuro chegou primeiro. Hierarquia, tecnologia e tradição coexistem de formas que o ocidente ainda não compreende.",
  },
  {
    roll: 10,
    id: "oceania-pacifico",
    name: "Oceania/Ilhas do Pacífico",
    nameOriginal: "Oceania/Pacific Islander",
    description:
      "Da Austrália à Nova Zelândia, do Havaí à Polinésia. Uma região de vastidão oceânica onde comunidades insulares mantiveram culturas únicas enquanto o resto do mundo entrava em colapso.",
    languages: ["Inglês", "Francês", "Havaiano", "Maori", "Pama-Nyungan", "Taitiano"],
    flavor: "O oceano não é uma barreira — é uma estrada. Você nasceu sabendo que o horizonte é sempre o próximo destino.",
  },
];
