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
  isImplant?: boolean;
  humanityLoss?: string;
  cost: number;
  icon: string;
}

export interface StreetratPackage {
  roleId: string;
  statTemplates: StatTemplate[];
  skills: StreetratSkill[];
  gear: StreetratGearItem[];
  startingEurobucks: number;
  survivorTip: string;
}

export const streetratPackages: StreetratPackage[] = [
  // ── ROCKERBOY ─────────────────────────────────────────────────────────────
  {
    roleId: "rockerboy",
    statTemplates: [
      {
        label: "Voz das Ruas",
        // Book row 3: INT 4, REF 5, DEX 7, TECH 7, COOL 6, WILL 6, LUCK 7, MOVE 7, BODY 5, EMP 8
        stats: { INT: 4, REF: 5, DEX: 7, TECH: 7, COOL: 6, WILL: 6, LUCK: 7, MOVE: 7, BODY: 5, EMP: 8 },
      },
      {
        label: "Ícone Carismático",
        // Book row 1: INT 7, REF 6, DEX 6, TECH 5, COOL 6, WILL 8, LUCK 7, MOVE 7, BODY 3, EMP 8
        stats: { INT: 7, REF: 6, DEX: 6, TECH: 5, COOL: 6, WILL: 8, LUCK: 7, MOVE: 7, BODY: 3, EMP: 8 },
      },
      {
        label: "Agitador Cultural",
        // Book row 8: INT 5, REF 7, DEX 7, TECH 5, COOL 6, WILL 6, LUCK 6, MOVE 6, BODY 4, EMP 8
        stats: { INT: 5, REF: 7, DEX: 7, TECH: 5, COOL: 6, WILL: 6, LUCK: 6, MOVE: 6, BODY: 4, EMP: 8 },
      },
    ],
    skills: [
      { namePtBr: "Tocar Instrumento", linkedStat: "TECH", rank: 6, whyItMatters: "Sua arte é sua arma. A performance que move multidões." },
      { namePtBr: "Persuasão", linkedStat: "COOL", rank: 6, whyItMatters: "Convencer pessoas a agir — seja um fã, um patrono ou um rival." },
      { namePtBr: "Percepção Humana", linkedStat: "EMP", rank: 6, whyItMatters: "Entender o que o público sente e o que os poderosos querem esconder." },
      { namePtBr: "Composição", linkedStat: "INT", rank: 6, whyItMatters: "Criar músicas, letras e peças que ressoam além do palco." },
      { namePtBr: "Briga", linkedStat: "DEX", rank: 6, whyItMatters: "Shows de Rockerboy frequentemente terminam em conflito físico." },
      { namePtBr: "Evasão", linkedStat: "DEX", rank: 6, whyItMatters: "Sobreviver à violência corporativa que inevitavelmente chega." },
      { namePtBr: "Malícia de Rua", linkedStat: "COOL", rank: 6, whyItMatters: "Navegar as ruas, saber com quem falar e o que evitar." },
    ],
    gear: [
      { name: "Pistola Muito Pesada", description: "4d6 de dano. A arma de Johnny Silverhand. Quando o show terminar mal, isso resolve.", cost: 100, icon: "🔫" },
      { name: "Munição Básica x50", description: "Cinquenta balas. Esperemos que você não precise de todas.", cost: 50, icon: "📦" },
      { name: "Arma Melee Pesada", description: "3d6 de dano corpo a corpo. Mais pessoal do que uma pistola e funciona quando acaba a munição.", cost: 100, icon: "🔪" },
      { name: "Armorjack Leve — Corpo (SP 11)", description: "Pode parecer roupa de palco. Ninguém precisa saber que é à prova de balas.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)", description: "Proteção para a cabeça. Acertos na cabeça sem proteção são devastadores.", cost: 100, icon: "⛑️" },
      { name: "Instrumento Elétrico (guitarra, baixo ou sintetizador)", description: "Sua razão de existir. Precisa de amplificador.", cost: 500, icon: "🎸" },
      { name: "Amplificador de Bolso", description: "Suporta até dois instrumentos. 6 horas de carga. Para shows improvisados nas ruas.", cost: 50, icon: "🔊" },
      { name: "Agente Pessoal", description: "Transmissão ao vivo, agenda de shows e comunicação com fãs.", cost: 100, icon: "📱" },
    ],
    startingEurobucks: 500,
    survivorTip: "Sua Habilidade Especial (Impacto Carismático) só funciona em fãs — mas você pode criar fãs de estranhos com uma rolagem. Quanto maior sua audiência, maior seu poder. Construa fama e use-a como escudo.",
  },

  // ── SOLO ──────────────────────────────────────────────────────────────────
  {
    roleId: "solo",
    statTemplates: [
      {
        label: "Atirador Preciso",
        // Book row 5: INT 6, REF 6, DEX 7, TECH 5, COOL 7, WILL 6, LUCK 7, MOVE 6, BODY 8, EMP 4
        stats: { INT: 6, REF: 6, DEX: 7, TECH: 5, COOL: 7, WILL: 6, LUCK: 7, MOVE: 6, BODY: 8, EMP: 4 },
      },
      {
        label: "Máquina de Combate",
        // Book row 3: INT 5, REF 8, DEX 7, TECH 4, COOL 7, WILL 7, LUCK 6, MOVE 7, BODY 8, EMP 5
        stats: { INT: 5, REF: 8, DEX: 7, TECH: 4, COOL: 7, WILL: 7, LUCK: 6, MOVE: 7, BODY: 8, EMP: 5 },
      },
      {
        label: "Operativo Equilibrado",
        // Book row 7: INT 7, REF 7, DEX 6, TECH 5, COOL 6, WILL 7, LUCK 7, MOVE 6, BODY 6, EMP 6
        stats: { INT: 7, REF: 7, DEX: 6, TECH: 5, COOL: 6, WILL: 7, LUCK: 7, MOVE: 6, BODY: 6, EMP: 6 },
      },
    ],
    skills: [
      { namePtBr: "Pistola", linkedStat: "REF", rank: 6, whyItMatters: "Sua arma primária. Precisão com pistolas define um bom Solo." },
      { namePtBr: "Armas Longas (Rifles)", linkedStat: "REF", rank: 6, whyItMatters: "Rifles e escopetas para alcance médio e longo." },
      { namePtBr: "Tiro Automático", linkedStat: "REF", rank: 6, whyItMatters: "Disparar em rajada, suprimir inimigos — essencial em combates abertos." },
      { namePtBr: "Evasão", linkedStat: "DEX", rank: 6, whyItMatters: "Sobreviver em campo de batalha. Desviar de tiros é tão vital quanto acertar." },
      { namePtBr: "Percepção", linkedStat: "INT", rank: 6, whyItMatters: "Notar emboscadas, detectar inimigos ocultos, avaliar ameaças antes que te vejam." },
      { namePtBr: "Táticas", linkedStat: "INT", rank: 6, whyItMatters: "Planejar movimentos, usar o terreno e coordenar ataques eficientes." },
      { namePtBr: "Resistir Tortura/Drogas", linkedStat: "WILL", rank: 6, whyItMatters: "Manter o controle sob pressão extrema. Solos são capturados às vezes." },
    ],
    gear: [
      { name: "Rifle de Assalto", description: "5d6 de dano. A arma de guerra padrão — alcance, poder e confiabilidade.", cost: 500, icon: "🔫" },
      { name: "Pistola Muito Pesada", description: "4d6 de dano. Secundária de alta potência para situações de curto alcance.", cost: 100, icon: "🔫" },
      { name: "Arma Melee Pesada", description: "3d6 corpo a corpo. Para quando não há espaço para atirar.", cost: 100, icon: "🔪" },
      { name: "Munição Básica — Rifle x70", description: "Setenta balas de rifle. Suficiente para um combate sério.", cost: 70, icon: "📦" },
      { name: "Munição Básica — Pistola x30", description: "Trinta balas para a pistola. Reserve para emergências.", cost: 30, icon: "📦" },
      { name: "Armorjack Leve — Corpo (SP 11)", description: "Proteção balística discreta. SP 11 resiste à maioria das armas comuns.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)", description: "Proteção craniana. Um headshot sem capacete pode ser fatal com qualquer arma.", cost: 100, icon: "⛑️" },
      { name: "Agente Pessoal", description: "Comunicação segura, mapas de terreno e identificação de alvos.", cost: 100, icon: "📱" },
    ],
    startingEurobucks: 500,
    survivorTip: "Solos vivem por posicionamento e Consciência de Combate. Nunca fique em campo aberto. Use cobertura, flanqueie, e recue para estabilizar quando estiver ferido.",
  },

  // ── NETRUNNER ─────────────────────────────────────────────────────────────
  {
    roleId: "netrunner",
    statTemplates: [
      {
        label: "Fantasma Digital",
        // Book row 1: INT 5, REF 8, DEX 7, TECH 7, COOL 7, WILL 4, LUCK 8, MOVE 7, BODY 7, EMP 4
        stats: { INT: 5, REF: 8, DEX: 7, TECH: 7, COOL: 7, WILL: 4, LUCK: 8, MOVE: 7, BODY: 7, EMP: 4 },
      },
      {
        label: "Invasor Técnico",
        // Book row 4: INT 5, REF 7, DEX 7, TECH 7, COOL 7, WILL 5, LUCK 8, MOVE 6, BODY 5, EMP 5
        stats: { INT: 5, REF: 7, DEX: 7, TECH: 7, COOL: 7, WILL: 5, LUCK: 8, MOVE: 6, BODY: 5, EMP: 5 },
      },
      {
        label: "Netrunner Estratégico",
        // Book row 7: INT 6, REF 6, DEX 6, TECH 7, COOL 6, WILL 5, LUCK 7, MOVE 7, BODY 7, EMP 6
        stats: { INT: 6, REF: 6, DEX: 6, TECH: 7, COOL: 6, WILL: 5, LUCK: 7, MOVE: 7, BODY: 7, EMP: 6 },
      },
    ],
    skills: [
      { namePtBr: "Eletrônica e Segurança", linkedStat: "TECH", rank: 6, whyItMatters: "Identificar e invadir sistemas eletrônicos — sua expertise fundamental." },
      { namePtBr: "Técnica Básica", linkedStat: "TECH", rank: 6, whyItMatters: "Manter o Cyberdeck e reparar equipamentos tecnológicos no campo." },
      { namePtBr: "Cibertecnologia", linkedStat: "TECH", rank: 6, whyItMatters: "Instalar e manter cyberware — o seu e o dos aliados." },
      { namePtBr: "Criptografia", linkedStat: "INT", rank: 6, whyItMatters: "Decifrar comunicações corporativas e proteger as suas." },
      { namePtBr: "Evasão", linkedStat: "DEX", rank: 6, whyItMatters: "No mundo real, você é vulnerável. Saber se esquivar é sobrevivência." },
      { namePtBr: "Furtividade", linkedStat: "DEX", rank: 6, whyItMatters: "Mover-se sem ser visto enquanto faz o trabalho físico de setup." },
      { namePtBr: "Pistola", linkedStat: "REF", rank: 6, whyItMatters: "Quando saem da NET para te matar, você precisa se defender." },
    ],
    gear: [
      { name: "Cyberdeck Básico (7 slots)", description: "Seu computador de batalha para invadir a NET. 7 slots para programas.", cost: 500, icon: "💻" },
      { name: "Óculos de Realidade Virtual", description: "Projetam imagens do ciberespaço sobre o mundo real. Essenciais para netrunning completo.", cost: 100, icon: "🥽" },
      { name: "Programa: Armor (DEF 4)", description: "Escudo digital. Protege de ataques de ICE. SEMPRE carregue este programa.", cost: 250, icon: "🛡️" },
      { name: "Programa: Sword (ATK 4)", description: "Ataque padrão. Usado para destruir ICE e atacar Netrunners inimigos.", cost: 250, icon: "⚡" },
      { name: "Programa: See Ya (stealth)", description: "Camufla sua presença na NET. Essencial para infiltrações silenciosas.", cost: 250, icon: "👻" },
      { name: "Programa: Worm (intrusão)", description: "Abre caminhos em sistemas protegidos — ignora uma camada de segurança.", cost: 250, icon: "🪱" },
      { name: "Pistola Muito Pesada", description: "4d6 de dano. Enquanto o grupo atira lá fora, você pode precisar disso.", cost: 100, icon: "🔫" },
      { name: "Munição Básica x30", description: "Trinta balas. Para emergências — você não deveria estar no tiroteio.", cost: 30, icon: "📦" },
      { name: "Armorjack Leve — Corpo (SP 11)", description: "Enquanto conectado à NET, seu corpo fica imóvel e vulnerável. Armadura ajuda.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)", description: "Proteção craniana durante o netrunning.", cost: 100, icon: "⛑️" },
      { name: "Agente Pessoal", description: "Comunicação, pesquisa e suporte fora da NET.", cost: 100, icon: "📱" },
    ],
    startingEurobucks: 500,
    survivorTip: "NUNCA conecte na NET sem um aliado guardando seu corpo. Seu corpo fica inconsciente e indefeso. Posicione-se em cobertura antes de conectar.",
  },

  // ── TECH ──────────────────────────────────────────────────────────────────
  {
    roleId: "tech",
    statTemplates: [
      {
        label: "Engenheiro Criativo",
        // Book row 1: INT 6, REF 7, DEX 7, TECH 8, COOL 4, WILL 4, LUCK 5, MOVE 5, BODY 7, EMP 6
        stats: { INT: 6, REF: 7, DEX: 7, TECH: 8, COOL: 4, WILL: 4, LUCK: 5, MOVE: 5, BODY: 7, EMP: 6 },
      },
      {
        label: "Especialista em Cyberware",
        // Book row 4: INT 7, REF 8, DEX 7, TECH 8, COOL 4, WILL 4, LUCK 6, MOVE 5, BODY 6, EMP 7
        stats: { INT: 7, REF: 8, DEX: 7, TECH: 8, COOL: 4, WILL: 4, LUCK: 6, MOVE: 5, BODY: 6, EMP: 7 },
      },
      {
        label: "MacGyver das Ruas",
        // Book row 7: INT 8, REF 6, DEX 7, TECH 8, COOL 4, WILL 4, LUCK 7, MOVE 6, BODY 7, EMP 6
        stats: { INT: 8, REF: 6, DEX: 7, TECH: 8, COOL: 4, WILL: 4, LUCK: 7, MOVE: 6, BODY: 7, EMP: 6 },
      },
    ],
    skills: [
      { namePtBr: "Técnica Básica", linkedStat: "TECH", rank: 6, whyItMatters: "A base de tudo. Consertar, construir e modificar qualquer equipamento." },
      { namePtBr: "Cibertecnologia", linkedStat: "TECH", rank: 6, whyItMatters: "Instalar e reparar cyberware. Ganhar eb extra como Ripperdoc improvisado." },
      { namePtBr: "Eletrônica e Segurança", linkedStat: "TECH", rank: 6, whyItMatters: "Hackear fechaduras, câmeras e sistemas de segurança sem entrar na NET." },
      { namePtBr: "Tecnologia de Veículos Terrestres", linkedStat: "TECH", rank: 6, whyItMatters: "Manter os veículos do grupo funcionando no meio do nada." },
      { namePtBr: "Tecnologia de Armas", linkedStat: "TECH", rank: 6, whyItMatters: "Modificar armas para mais dano, silenciadores, miras — recursos que valem muito." },
      { namePtBr: "Ciência (à escolha)", linkedStat: "INT", rank: 6, whyItMatters: "Conhecimento científico especializado — química, biologia, eletrônica avançada." },
      { namePtBr: "Armas Longas (Rifles)", linkedStat: "REF", rank: 6, whyItMatters: "Para se defender no campo. Techs têm rifles de assalto ou escopetas." },
    ],
    gear: [
      { name: "Espingarda ou Rifle de Assalto", description: "Escolha uma. 5d6 de dano (escopeta em curto alcance ou rifle em médio). Para se defender no campo.", cost: 500, icon: "🔫" },
      { name: "Munição x100", description: "Cem balas do tipo adequado. Você precisará delas menos que um Solo, mas quando precisar vai precisar.", cost: 100, icon: "📦" },
      { name: "Granada Flashbang", description: "Atordoa sem matar — útil para criar distrações ou neutralizar grupos sem usar lethal.", cost: 100, icon: "💥" },
      { name: "Armorjack Leve — Corpo (SP 11)", description: "Proteção enquanto trabalha em máquinas. Às vezes as máquinas atiram de volta.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)", description: "Proteção craniana. Essencial quando o trabalho de reparo vira combate.", cost: 100, icon: "⛑️" },
      { name: "Tech Bag (ferramentas completas)", description: "Kit profissional com tudo para reparos complexos. Sem ela você é um guerreiro comum.", cost: 500, icon: "🧰" },
      { name: "Máscara Antipoluição", description: "Protege de fumaça, gases e poluição. Reparos em ambientes industriais exigem isso.", cost: 20, icon: "😷" },
      { name: "Agente Pessoal", description: "Manuais, esquemáticos e comunicação. Seu assistente de pesquisa no campo.", cost: 100, icon: "📱" },
    ],
    startingEurobucks: 500,
    survivorTip: "Você é mais valioso vivo e consertando coisas do que morto num tiroteio. Mantenha os aliados equipados, armas em funcionamento e armaduras reparadas entre missões. Isso vale mais que qualquer combate.",
  },

  // ── MEDTECH ───────────────────────────────────────────────────────────────
  {
    roleId: "medtech",
    statTemplates: [
      {
        label: "Cirurgião de Campo",
        // Book row 1: INT 7, REF 5, DEX 6, TECH 7, COOL 5, WILL 3, LUCK 8, MOVE 5, BODY 5, EMP 7
        stats: { INT: 7, REF: 5, DEX: 6, TECH: 7, COOL: 5, WILL: 3, LUCK: 8, MOVE: 5, BODY: 5, EMP: 7 },
      },
      {
        label: "Trauma Medic",
        // Book row 5: INT 6, REF 7, DEX 5, TECH 7, COOL 5, WILL 5, LUCK 8, MOVE 7, BODY 6, EMP 8
        stats: { INT: 6, REF: 7, DEX: 5, TECH: 7, COOL: 5, WILL: 5, LUCK: 8, MOVE: 7, BODY: 6, EMP: 8 },
      },
      {
        label: "Ripperdoc das Ruas",
        // Book row 8: INT 6, REF 5, DEX 7, TECH 7, COOL 3, WILL 5, LUCK 8, MOVE 5, BODY 5, EMP 8
        stats: { INT: 6, REF: 5, DEX: 7, TECH: 7, COOL: 3, WILL: 5, LUCK: 8, MOVE: 5, BODY: 5, EMP: 8 },
      },
    ],
    skills: [
      { namePtBr: "Paramedic", linkedStat: "TECH", rank: 6, whyItMatters: "Estabilizar feridos em campo — a habilidade médica central do Medtech fora da cirurgia." },
      { namePtBr: "Técnica Básica", linkedStat: "TECH", rank: 6, whyItMatters: "A base para manutenção de equipamentos médicos e cyberware." },
      { namePtBr: "Conversação", linkedStat: "EMP", rank: 6, whyItMatters: "Pacientes com medo falam mais. Construir confiança é parte do tratamento." },
      { namePtBr: "Percepção Humana", linkedStat: "EMP", rank: 6, whyItMatters: "Avaliar o estado emocional e físico de um paciente — o que eles não te dizem importa." },
      { namePtBr: "Dedução", linkedStat: "INT", rank: 6, whyItMatters: "Diagnóstico preciso. Identificar o problema antes de agir." },
      { namePtBr: "Ciência (à escolha)", linkedStat: "INT", rank: 6, whyItMatters: "Farmacologia, biologia ou anatomia — conhecimento científico que salva vidas." },
      { namePtBr: "Armas Longas (Rifles)", linkedStat: "REF", rank: 6, whyItMatters: "Medtechs precisam de alcance para operar em campo de batalha com segurança." },
    ],
    gear: [
      { name: "Espingarda ou Rifle de Assalto", description: "Escolha um. Médicos em campo de batalha precisam de firepower para se proteger enquanto tratam os feridos.", cost: 500, icon: "🔫" },
      { name: "Munição x100 + Incendiária x10", description: "Cem balas padrão e dez balas incendiárias. Para situações extremas.", cost: 120, icon: "📦" },
      { name: "Granadas de Fumaça x2", description: "Criam cobertura visual para retirar feridos do campo de batalha.", cost: 100, icon: "💨" },
      { name: "Escudo Balístico", description: "Proteção adicional. Usado para cobrir pacientes enquanto trabalha num ambiente hostil.", cost: 100, icon: "🛡️" },
      { name: "Armorjack Leve — Corpo (SP 11)", description: "Armadura básica. Você precisa chegar até o ferido antes de poder ajudá-lo.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)", description: "Proteção craniana. Um Medtech morto não salva ninguém.", cost: 100, icon: "⛑️" },
      { name: "Mala Médica Completa (Medtech Bag)", description: "Kit completo de trauma — suturas, medicamentos básicos, curativos, desfibrilador manual. Essencial.", cost: 100, icon: "🩺" },
      { name: "Airhypo (seringa pressurizada)", description: "Administra doses de medicamento rapidamente — até em alvos resistentes.", cost: 100, icon: "💉" },
      { name: "Algemas", description: "Para pacientes em delírio ou sob efeito de drogas. Cyberpsicóticos precisam de contenção.", cost: 50, icon: "⛓️" },
      { name: "Agente Pessoal", description: "Banco de dados médicos, comunicação com Trauma Team e registros de pacientes.", cost: 100, icon: "📱" },
    ],
    startingEurobucks: 500,
    survivorTip: "Sua Habilidade Especial (Medicina) tem três especializações: Cirurgia, Farmacêutica e Criossistemas. Cirurgia é a mais versátil — permite instalar cyberware e tratar lesões críticas que outros simplesmente não conseguem curar.",
  },

  // ── MEDIA ─────────────────────────────────────────────────────────────────
  {
    roleId: "media",
    statTemplates: [
      {
        label: "Repórter de Combate",
        // Book row 1: INT 6, REF 6, DEX 5, TECH 5, COOL 8, WILL 7, LUCK 5, MOVE 7, BODY 5, EMP 7
        stats: { INT: 6, REF: 6, DEX: 5, TECH: 5, COOL: 8, WILL: 7, LUCK: 5, MOVE: 7, BODY: 5, EMP: 7 },
      },
      {
        label: "Investigador das Sombras",
        // Book row 2: INT 8, REF 7, DEX 7, TECH 3, COOL 6, WILL 6, LUCK 6, MOVE 5, BODY 6, EMP 8
        stats: { INT: 8, REF: 7, DEX: 7, TECH: 3, COOL: 6, WILL: 6, LUCK: 6, MOVE: 5, BODY: 6, EMP: 8 },
      },
      {
        label: "Influenciador Digital",
        // Book row 5: INT 6, REF 6, DEX 7, TECH 4, COOL 8, WILL 7, LUCK 6, MOVE 7, BODY 5, EMP 8
        stats: { INT: 6, REF: 6, DEX: 7, TECH: 4, COOL: 8, WILL: 7, LUCK: 6, MOVE: 7, BODY: 5, EMP: 8 },
      },
    ],
    skills: [
      { namePtBr: "Conversação", linkedStat: "EMP", rank: 6, whyItMatters: "Fazer pessoas falarem naturalmente — a essência do jornalismo investigativo." },
      { namePtBr: "Persuasão", linkedStat: "COOL", rank: 6, whyItMatters: "Convencer fontes, editores e alvos a cooperar — ou recuar." },
      { namePtBr: "Percepção", linkedStat: "INT", rank: 6, whyItMatters: "Notar detalhes, inconsistências e mentiras. A base da investigação." },
      { namePtBr: "Percepção Humana", linkedStat: "EMP", rank: 6, whyItMatters: "Saber quando uma fonte está mentindo, com medo ou sendo manipulada." },
      { namePtBr: "Suborno", linkedStat: "COOL", rank: 6, whyItMatters: "Às vezes a história certa custa dinheiro para acessar." },
      { namePtBr: "Dedução", linkedStat: "INT", rank: 6, whyItMatters: "Conectar pistas, identificar padrões e revelar o que está escondido." },
      { namePtBr: "Pistola", linkedStat: "REF", rank: 6, whyItMatters: "Algumas histórias atraem pessoas que prefeririam que você não as contasse." },
    ],
    gear: [
      { name: "Pistola Pesada ou Muito Pesada", description: "Escolha uma. Jornalistas de combate estão em campo perigoso. Defesa é necessidade.", cost: 100, icon: "🔫" },
      { name: "Munição Básica x50", description: "Cinquenta balas. Para um Media, isso deveria durar muito tempo.", cost: 50, icon: "📦" },
      { name: "Armorjack Leve — Corpo (SP 11)", description: "Armadura básica. As corporações preferem que você não volte.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)", description: "Proteção craniana. Jornalistas de combate usam capacete.", cost: 100, icon: "⛑️" },
      { name: "Câmera de Vídeo (12h)", description: "Grava 12 horas de áudio/vídeo. Sua testemunha ocular. Provas visuais valem mais que qualquer palavra.", cost: 100, icon: "📹" },
      { name: "Gravador de Áudio", description: "24 horas de gravação. Gravar conversas é a vida do Media.", cost: 100, icon: "🎙️" },
      { name: "Computador Laptop", description: "Para editar, publicar e transmitir. Uma história publicada não pode ser silenciada.", cost: 50, icon: "💻" },
      { name: "Scrambler/Descriptografador", description: "Criptografa suas comunicações e descriptografa as dos outros. Proteção e ferramenta.", cost: 500, icon: "🔐" },
      { name: "Agente Pessoal", description: "Transmissão ao vivo, banco de dados de contatos e publicação instantânea.", cost: 100, icon: "📱" },
    ],
    startingEurobucks: 500,
    survivorTip: "Sua proteção número 1 é fama. Quanto mais conhecido for, mais caro fica te silenciar. Transmita ao vivo sempre que possível — ninguém elimina um repórter enquanto o mundo está assistindo.",
  },

  // ── EXEC ──────────────────────────────────────────────────────────────────
  {
    roleId: "exec",
    statTemplates: [
      {
        label: "Estrategista Corporativo",
        // Book row 1: INT 8, REF 5, DEX 5, TECH 3, COOL 8, WILL 6, LUCK 6, MOVE 5, BODY 5, EMP 7
        stats: { INT: 8, REF: 5, DEX: 5, TECH: 3, COOL: 8, WILL: 6, LUCK: 6, MOVE: 5, BODY: 5, EMP: 7 },
      },
      {
        label: "Negociador de Elite",
        // Book row 3: INT 8, REF 7, DEX 6, TECH 3, COOL 8, WILL 6, LUCK 7, MOVE 6, BODY 4, EMP 5
        stats: { INT: 8, REF: 7, DEX: 6, TECH: 3, COOL: 8, WILL: 6, LUCK: 7, MOVE: 6, BODY: 4, EMP: 5 },
      },
      {
        label: "Lider de Operações",
        // Book row 5: INT 7, REF 7, DEX 6, TECH 5, COOL 8, WILL 5, LUCK 7, MOVE 7, BODY 5, EMP 6
        stats: { INT: 7, REF: 7, DEX: 6, TECH: 5, COOL: 8, WILL: 5, LUCK: 7, MOVE: 7, BODY: 5, EMP: 6 },
      },
    ],
    skills: [
      { namePtBr: "Contabilidade", linkedStat: "INT", rank: 6, whyItMatters: "Rastrear dinheiro, orçamentos e fluxo financeiro corporativo e ilegal." },
      { namePtBr: "Burocracia", linkedStat: "INT", rank: 6, whyItMatters: "Navegar sistemas corporativos e governamentais para conseguir o que precisa." },
      { namePtBr: "Negócios", linkedStat: "INT", rank: 6, whyItMatters: "Operações comerciais, contratos e como as corporações realmente funcionam." },
      { namePtBr: "Conversação", linkedStat: "EMP", rank: 6, whyItMatters: "Extrair informações em reuniões de negócios sem que o outro perceba." },
      { namePtBr: "Persuasão", linkedStat: "COOL", rank: 6, whyItMatters: "Fechar acordos, convencer subordinados e manipular rivais." },
      { namePtBr: "Leitura Labial", linkedStat: "INT", rank: 6, whyItMatters: "Ler conversas ao longe. Em reuniões corporativas, informação vale poder." },
      { namePtBr: "Pistola", linkedStat: "REF", rank: 6, whyItMatters: "Execs raramente atiram eles mesmos — mas quando precisam, precisam ser letais." },
    ],
    gear: [
      { name: "Pistola Muito Pesada", description: "4d6 de dano. Execs usam armas que impressionam tanto quanto intimidam.", cost: 100, icon: "🔫" },
      { name: "Munição Básica x50", description: "Cinquenta balas. Para um Exec, esperamos que nunca precise de todas.", cost: 50, icon: "📦" },
      { name: "Armorjack Leve — Corpo (SP 11)", description: "Vestida sob o terno. Ninguém suspeita — todos os Execs sérios usam.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)", description: "Disponível quando necessário. Execs sérios têm proteção sempre à mão.", cost: 100, icon: "⛑️" },
      { name: "Roupa de Negócios (Businesswear)", description: "Abre portas corporativas. A aparência certa na reunião certa vale mais que qualquer arma.", cost: 500, icon: "👔" },
      { name: "Detector de Microfones", description: "Raio de 2m. Nenhuma reunião confidencial sem checar primeiro.", cost: 500, icon: "🔍" },
      { name: "Computador Laptop", description: "Acesso a databases, comunicação segura e coordenação da equipe.", cost: 50, icon: "💻" },
      { name: "Telefones Descartáveis x2", description: "Para comunicações que não devem ser rastreadas.", cost: 100, icon: "📞" },
      { name: "Agente Pessoal", description: "Sua agenda de contatos, banco de dados de favores e ferramenta de negociação número 1.", cost: 100, icon: "📱" },
    ],
    startingEurobucks: 500,
    survivorTip: "Sua Habilidade Especial (Trabalho em Equipe) te dá membros de equipe com funções secretas — guardas corporais, Netrunners, informantes. No nível 3, você ganha o primeiro membro. Invista nisso cedo.",
  },

  // ── LAWMAN ────────────────────────────────────────────────────────────────
  {
    roleId: "lawman",
    statTemplates: [
      {
        label: "Policial de Patrulha",
        // Book row 1: INT 5, REF 6, DEX 7, TECH 5, COOL 7, WILL 8, LUCK 5, MOVE 6, BODY 5, EMP 6
        stats: { INT: 5, REF: 6, DEX: 7, TECH: 5, COOL: 7, WILL: 8, LUCK: 5, MOVE: 6, BODY: 5, EMP: 6 },
      },
      {
        label: "Agente de Elite",
        // Book row 4: INT 6, REF 6, DEX 7, TECH 6, COOL 6, WILL 8, LUCK 5, MOVE 7, BODY 7, EMP 6
        stats: { INT: 6, REF: 6, DEX: 7, TECH: 6, COOL: 6, WILL: 8, LUCK: 5, MOVE: 7, BODY: 7, EMP: 6 },
      },
      {
        label: "Caçador de Cyberpsicóticos",
        // Book row 7: INT 7, REF 8, DEX 7, TECH 5, COOL 6, WILL 8, LUCK 7, MOVE 6, BODY: 5, EMP: 4
        stats: { INT: 7, REF: 8, DEX: 7, TECH: 5, COOL: 6, WILL: 8, LUCK: 7, MOVE: 6, BODY: 5, EMP: 4 },
      },
    ],
    skills: [
      { namePtBr: "Briga", linkedStat: "DEX", rank: 6, whyItMatters: "Controlar suspeitos fisicamente sem necessariamente atirar. Parte do treinamento policial." },
      { namePtBr: "Tiro Automático", linkedStat: "REF", rank: 6, whyItMatters: "Armas automáticas em combates urbanos — o pão e manteiga do Lawman." },
      { namePtBr: "Pistola", linkedStat: "REF", rank: 6, whyItMatters: "Arma secundária sempre disponível quando o rifle não tem espaço." },
      { namePtBr: "Armas Longas (Rifles)", linkedStat: "REF", rank: 6, whyItMatters: "Espingardas e rifles para situações de maior distância ou poder de fogo." },
      { namePtBr: "Criminologia", linkedStat: "INT", rank: 6, whyItMatters: "Entender padrões criminosos, identificar suspeitos e montar um caso." },
      { namePtBr: "Interrogação", linkedStat: "COOL", rank: 6, whyItMatters: "Extrair informações de suspeitos. A pressão certa na hora certa." },
      { namePtBr: "Rastreamento", linkedStat: "INT", rank: 6, whyItMatters: "Seguir alvos e localizar fugitivos nas ruas e nas Terras Selvagens." },
    ],
    gear: [
      { name: "Rifle de Assalto ou Espingarda", description: "Escolha um. 5d6 de dano. Lawmen carregam armas pesadas — eles estão sempre em desvantagem numérica.", cost: 500, icon: "🔫" },
      { name: "Pistola Pesada", description: "3d6 de dano. Secundária padrão. Sempre à mão quando o rifle não dá.", cost: 100, icon: "🔫" },
      { name: "Munição — Rifle x100", description: "Cem balas de rifle. Operações policiais consomem munição rapidamente.", cost: 100, icon: "📦" },
      { name: "Munição — Pistola x30", description: "Trinta balas para a pistola. Sobressalente para emergências.", cost: 30, icon: "📦" },
      { name: "Escudo Balístico ou Granadas de Fumaça x2", description: "Escudo para operações táticas ou fumaça para extrações e criação de cobertura.", cost: 100, icon: "🛡️" },
      { name: "Armorjack Leve — Corpo (SP 11)", description: "Proteção padrão. Mesmo com toda a lei do lado, Night City não respeita autoridade.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)", description: "Proteção craniana. Lawmen que não usam capacete têm vida curta.", cost: 100, icon: "⛑️" },
      { name: "Algemas x2", description: "Para detenções. Em Night City, suspeitos com cyberware precisam de contenção séria.", cost: 100, icon: "⛓️" },
      { name: "Comunicador de Rádio", description: "Comunicação com a equipe e pedido de reforço. Vital para acionar a Habilidade Especial.", cost: 100, icon: "📻" },
      { name: "Agente Pessoal", description: "Bancos de dados criminais, identificação de suspeitos e comunicação segura.", cost: 100, icon: "📱" },
    ],
    startingEurobucks: 500,
    survivorTip: "Sua Habilidade Especial (Reforço) é mais poderosa quanto maior o nível — de um único parceiro até uma equipe de assalto completa. Use-a estrategicamente: peça Reforço ANTES da situação escalar, não depois.",
  },

  // ── FIXER ─────────────────────────────────────────────────────────────────
  {
    roleId: "fixer",
    statTemplates: [
      {
        label: "Corretor das Sombras",
        // Book row 1: INT 8, REF 5, DEX 7, TECH 4, COOL 6, WILL 5, LUCK 8, MOVE 5, BODY 5, EMP 8
        stats: { INT: 8, REF: 5, DEX: 7, TECH: 4, COOL: 6, WILL: 5, LUCK: 8, MOVE: 5, BODY: 5, EMP: 8 },
      },
      {
        label: "Negociador Influente",
        // Book row 4: INT 7, REF 7, DEX 5, TECH 5, COOL 7, WILL 6, LUCK 7, MOVE 7, BODY 5, EMP 8
        stats: { INT: 7, REF: 7, DEX: 5, TECH: 5, COOL: 7, WILL: 6, LUCK: 7, MOVE: 7, BODY: 5, EMP: 8 },
      },
      {
        label: "Traficante de Informação",
        // Book row 7: INT 8, REF 6, DEX 6, TECH 5, COOL 6, WILL 5, LUCK 6, MOVE 7, BODY 5, EMP: 8
        stats: { INT: 8, REF: 6, DEX: 6, TECH: 5, COOL: 6, WILL: 5, LUCK: 6, MOVE: 7, BODY: 5, EMP: 8 },
      },
    ],
    skills: [
      { namePtBr: "Malícia de Rua", linkedStat: "COOL", rank: 6, whyItMatters: "A habilidade que define o Fixer. Conhecer o submundo, seus jogadores e suas regras." },
      { namePtBr: "Suborno", linkedStat: "COOL", rank: 6, whyItMatters: "Às vezes a solução mais rápida é simplesmente pagar. Fixers sabem quanto e quando." },
      { namePtBr: "Negócios", linkedStat: "INT", rank: 6, whyItMatters: "Fazer negócios lucrativos, precificar informações e calcular favorecimentos." },
      { namePtBr: "Falsificação", linkedStat: "TECH", rank: 6, whyItMatters: "Criar documentos, identidades e transferências que pareçam legítimos." },
      { namePtBr: "Comércio", linkedStat: "COOL", rank: 6, whyItMatters: "Negociar preços de armas, cyberware e favores nas Night Markets." },
      { namePtBr: "Percepção Humana", linkedStat: "EMP", rank: 6, whyItMatters: "Detectar quando alguém está mentindo — crítico para não ser enganado em negociações." },
      { namePtBr: "Pistola", linkedStat: "REF", rank: 6, whyItMatters: "Para quando a negociação falha completamente." },
    ],
    gear: [
      { name: "Pistola Pesada ou Muito Pesada (x2)", description: "Duas pistolas. Fixers geralmente carregam backup — uma visível para impressionar e uma escondida.", cost: 200, icon: "🔫" },
      { name: "Arma Melee Leve", description: "1d6 de dano. Discreta e concealável. Última linha de defesa em situações sociais.", cost: 50, icon: "🔪" },
      { name: "Munição Básica x100", description: "Cem balas divididas entre as duas pistolas. Fixers raramente usam tanto — mas têm.", cost: 100, icon: "📦" },
      { name: "Armorjack Leve — Corpo (SP 11)", description: "Vestida sob roupa de negócios. Ninguém suspeita que o Fixer usa armadura.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)", description: "Disponível em emergências. Boa parte das reuniões de Fixer não exige isso.", cost: 100, icon: "⛑️" },
      { name: "Comunicador de Rádio x2", description: "Um para você, um para dar ao contato. Comunicação sem rastreamento.", cost: 200, icon: "📻" },
      { name: "Scrambler/Descriptografador", description: "Criptografa suas comunicações. Fixers não conversam sem proteção.", cost: 500, icon: "🔐" },
      { name: "Agente Pessoal", description: "Sua agenda de contatos, banco de dados de favores e ferramenta de negociação número 1.", cost: 100, icon: "📱" },
    ],
    startingEurobucks: 500,
    survivorTip: "Informação é sua moeda mais valiosa. Sua Habilidade Especial (Operador) te dá acesso a recursos no mercado negro que outros simplesmente não conseguem encontrar. Construa uma rede diversificada — um contato em cada área.",
  },

  // ── NOMAD ─────────────────────────────────────────────────────────────────
  {
    roleId: "nomad",
    statTemplates: [
      {
        label: "Guerreiro da Estrada",
        // Book row 3: INT 5, REF 8, DEX 6, TECH 3, COOL 8, WILL 7, LUCK 6, MOVE 5, BODY 6, EMP 5
        stats: { INT: 5, REF: 8, DEX: 6, TECH: 3, COOL: 8, WILL: 7, LUCK: 6, MOVE: 5, BODY: 6, EMP: 5 },
      },
      {
        label: "Piloto de Combate",
        // Book row 4: INT 5, REF 8, DEX 7, TECH 4, COOL 8, WILL 6, LUCK 7, MOVE 7, BODY 7, EMP 5
        stats: { INT: 5, REF: 8, DEX: 7, TECH: 4, COOL: 8, WILL: 6, LUCK: 7, MOVE: 7, BODY: 7, EMP: 5 },
      },
      {
        label: "Rastreador Nômade",
        // Book row 9: INT 6, REF 7, DEX 6, TECH 4, COOL 8, WILL 6, LUCK 6, MOVE 6, BODY 6, EMP 6
        stats: { INT: 6, REF: 7, DEX: 6, TECH: 4, COOL: 8, WILL: 6, LUCK: 6, MOVE: 6, BODY: 6, EMP: 6 },
      },
    ],
    skills: [
      { namePtBr: "Conduzir Veículo Terrestre", linkedStat: "REF", rank: 6, whyItMatters: "Perseguições, manobras de combate e fuga — o coração do papel Nomad." },
      { namePtBr: "Manejo Animal", linkedStat: "INT", rank: 6, whyItMatters: "Nas Terras Selvagens, animais podem ser aliados, transporte e recursos." },
      { namePtBr: "Pistola", linkedStat: "REF", rank: 6, whyItMatters: "Arma de sidearm padrão, usável em veículos e a pé." },
      { namePtBr: "Arma Melee Pesada", linkedStat: "DEX", rank: 6, whyItMatters: "Combate corpo a corpo para quando os tiros param de funcionar." },
      { namePtBr: "Rastreamento", linkedStat: "INT", rank: 6, whyItMatters: "Seguir rastros e localizar alvos em territórios que você conhece melhor que ninguém." },
      { namePtBr: "Sobrevivência em Terreno Selvagem", linkedStat: "INT", rank: 6, whyItMatters: "Sobreviver nas Terras Selvagens sem reabastecimento. Comida, água, abrigo." },
      { namePtBr: "Comércio", linkedStat: "COOL", rank: 6, whyItMatters: "Negociar suprimentos, passagens e favores entre bandos e cidades." },
    ],
    gear: [
      { name: "Pistola Pesada ou Muito Pesada", description: "Escolha uma. A arma pessoal do Nomad — usada tanto a pé quanto de dentro de veículos.", cost: 100, icon: "🔫" },
      { name: "Arma Melee Pesada", description: "3d6 de dano. Para combate corpo a corpo quando fora do veículo.", cost: 100, icon: "🔪" },
      { name: "Munição Básica x100", description: "Cem balas. Nas Terras Selvagens não há loja de munição a 300km.", cost: 100, icon: "📦" },
      { name: "Armorjack Leve — Corpo (SP 11)", description: "Couro nômade com proteção balística. Parece roupa comum, protege como armadura.", cost: 100, icon: "🛡️" },
      { name: "Capacete Armorjack (SP 11)", description: "Proteção craniana. Acidentes de veículos são comuns nas Terras Selvagens.", cost: 100, icon: "⛑️" },
      { name: "Comunicador de Rádio x2", description: "Um para você, um para o bando. Coordenação em comboio é vital.", cost: 200, icon: "📻" },
      { name: "Mala Médica (Medtech Bag)", description: "O bando não tem sempre um Medtech. Cuidados básicos salvam vidas nas estradas.", cost: 100, icon: "🩺" },
      { name: "Kit de Camping Completo", description: "Tenda, corda (60m), cama inflável, equipamento de camping. Casa nas estradas.", cost: 120, icon: "⛺" },
      { name: "Máscara Antipoluição", description: "As Terras Selvagens têm zonas industriais e regiões contaminadas pela guerra.", cost: 20, icon: "😷" },
      { name: "Agente Pessoal", description: "GPS, clima e comunicação. Indispensável quando a cidade mais próxima fica a horas.", cost: 100, icon: "📱" },
    ],
    startingEurobucks: 500,
    survivorTip: "Sua Habilidade Especial (Moto) expande o pool de veículos da Família e aumenta sua expertise em dirigir qualquer tipo de veículo. Use mobilidade como vantagem tática — flanqueie inimigos e crie rotas de fuga que outros não conseguem seguir.",
  },
];

// ─── Cultural Origins ─────────────────────────────────────────────────────────

export interface CulturalOrigin {
  id: string;
  name: string;
  description: string;
  bonusLanguage: string;
  flavor: string;
}

export const culturalOrigins: CulturalOrigin[] = [
  { id: "norte-americano", name: "Norte-Americano/a", description: "Criado nos fragmentos dos antigos EUA — cidades corporativas, zonas de guerra ou subúrbios em decadência.", bonusLanguage: "Inglês (Nível 4)", flavor: "Você conhece os EUA divididos como a palma da sua mão." },
  { id: "latino", name: "Latino-Americano/a", description: "Das favelas da América do Sul ou dos bairros latinos de Night City. Família e lealdade são tudo.", bonusLanguage: "Espanhol (Nível 4)", flavor: "Você entende o poder das comunidades unidas contra os poderosos." },
  { id: "europeu", name: "Europeu/a", description: "Da Europa fragmentada pós-guerras corporativas. Pragmatismo e adaptação são marcas da sua criação.", bonusLanguage: "Francês ou Alemão (Nível 4)", flavor: "Você cresceu sob a sombra de impérios que caíram e outros que subiram." },
  { id: "asiatico", name: "Asiático/a", description: "Do Japão corporativo, das metrópoles chinesas ou das ilhas do Sudeste Asiático. Tradição e tecnologia em equilíbrio.", bonusLanguage: "Japonês ou Mandarim (Nível 4)", flavor: "Você entende hierarquia, paciência e o peso de séculos de história." },
  { id: "africano", name: "Africano/a", description: "Do continente africano pós-colapso, onde comunidades resistiram com criatividade frente à escassez corporativa.", bonusLanguage: "Swahili ou Árabe (Nível 4)", flavor: "Você carrega resiliência e adaptabilidade que poucos têm." },
  { id: "nomad", name: "Nômade das Terras Selvagens", description: "Criado em bando, nas estradas entre as cidades. Família de sangue ou escolha — lealdade acima de tudo.", bonusLanguage: "Língua do Bando (Nível 4)", flavor: "Você nunca precisou de uma cidade para ser completo." },
  { id: "corporativo", name: "Zona Corporativa", description: "Criado nos enclaves protegidos das megacorporações. Você sabe como o outro lado vive — e por que fugiu.", bonusLanguage: "Inglês Corporativo (Nível 4)", flavor: "Você conhece os bastidores do poder. Isso pode salvar sua vida." },
  { id: "zona-combate", name: "Zona de Combate", description: "Sobrevivente das áreas mais perigosas de Night City. Você aprendeu a ser duro da pior forma possível.", bonusLanguage: "Gíria de Rua (Nível 4)", flavor: "O que não te mata te dá experiência de combate." },
];
