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
