// Role-based lifepath tables from Cyberpunk RED p.54-70
// Each role has its own set of 1d6/1d10 tables + binary choices.
// "choose" die = binary/ternary selection (no dice, just buttons).
// showIf: only render the table when another table's current value matches.

export interface RoleLifepathTable {
  id: string;
  title: string;
  subtitle?: string;
  die: "1d6" | "1d10" | "choose";
  options: string[];
  showIf?: { id: string; value: string };
  formatFluxo?: (value: string) => string;
}

export interface RoleLifepath {
  roleId: string;
  flavor: string;
  tables: RoleLifepathTable[];
}

// ─── Rockerboy ────────────────────────────────────────────────────────────────

const rockerboy: RoleLifepath = {
  roleId: "rockerboy",
  flavor: "A música é sua arma. Sua voz é um grito de guerra.",
  tables: [
    {
      id: "rb-type",
      title: "Que Tipo de Rockerboy Você É?",
      subtitle: "Seu formato artístico — como você se expressa e alcança o público.",
      die: "1d10",
      options: [
        "Músico/a",
        "Poeta de Slam",
        "Artista de Rua",
        "Artista de Performance",
        "Comediante",
        "Orador/a",
        "Político/a",
        "Rapper",
        "DJ",
        "Ídoru",
      ],
    },
    {
      id: "rb-style",
      title: "Você Está em Grupo ou é Solo?",
      subtitle: "Sua situação atual — se toca em banda ou age por conta própria.",
      die: "choose",
      options: ["Em Grupo", "Solo"],
      formatFluxo: (v) => v === "Solo" ? "Age solo." : "Age em grupo.",
    },
    {
      id: "rb-venue",
      title: "Onde Você se Apresenta?",
      subtitle: "O tipo de palco onde sua arte acontece.",
      die: "1d6",
      options: [
        "Cafés alternativos",
        "Clubes privados",
        "Bares sórdidos",
        "Performances guerrilha (sem palco, surpresa)",
        "Boates espalhadas pela cidade",
        "Na Data Pool",
      ],
      formatFluxo: (v) => `Apresenta-se em ${v.toLowerCase()}.`,
    },
    {
      id: "rb-enemy",
      title: "Quem Está Atrás de Você?",
      subtitle: "Alguém não gosta do seu sucesso ou da sua mensagem.",
      die: "1d6",
      options: [
        "Ex-membro do grupo que acha que você fez algo errado com ele/ela.",
        "Grupo rival ou artista tentando roubar sua fatia de mercado.",
        "Inimigos corporativos que não gostam da sua mensagem.",
        "Crítico ou 'influencer' tentando te destruir.",
        "Estrela veterana ameaçada pela sua ascensão.",
        "Interesse romântico ou figura da mídia que quer vingança pessoal.",
      ],
    },
    {
      id: "rb-once-group",
      title: "Já Foi Parte de um Grupo?",
      subtitle: "Antes de ser solo, você já tocou ou performou com outros?",
      die: "choose",
      showIf: { id: "rb-style", value: "Solo" },
      options: ["Sim, já fui de um grupo", "Sempre fui solo"],
    },
    {
      id: "rb-left-why",
      title: "Por Que Você Saiu do Grupo?",
      subtitle: "O que te levou a agir por conta própria — ou a ser expulso/a.",
      die: "1d6",
      showIf: { id: "rb-once-group", value: "Sim, já fui de um grupo" },
      options: [
        "Você foi um idiota e o grupo te votou para fora.",
        "Te pegaram dormindo com o/a parceiro/a de outro membro.",
        "O resto do grupo foi morto em um 'acidente' trágico.",
        "O grupo foi assassinado ou desfeito por inimigos externos.",
        "O grupo se desfez por 'diferenças criativas'.",
        "Você decidiu ir solo.",
      ],
    },
  ],
};

// ─── Solo ─────────────────────────────────────────────────────────────────────

const solo: RoleLifepath = {
  roleId: "solo",
  flavor: "Armas são seu idioma. Violência, seu vocabulário.",
  tables: [
    {
      id: "solo-type",
      title: "Que Tipo de Solo Você É?",
      subtitle: "Sua especialidade no mercado de violência.",
      die: "1d6",
      options: [
        "Guarda-costas",
        "Músculo de rua para alugar",
        "Agente executivo corporativo que aceita jobs extras",
        "Agente Black Ops corporativo ou freelancer",
        "Vigilante local para alugar",
        "Assassino/a para alugar",
      ],
    },
    {
      id: "solo-territory",
      title: "Qual é Seu Território Operacional?",
      subtitle: "Onde você trabalha e é conhecido/a.",
      die: "1d6",
      options: [
        "Uma Zona Corporativa",
        "Zonas de Combate",
        "A cidade inteira",
        "O território de uma corporação específica",
        "O território de um Fixer ou contato específico",
        "Onde o dinheiro mandar",
      ],
      formatFluxo: (v) => `Opera em: ${v.toLowerCase()}.`,
    },
    {
      id: "solo-enemy",
      title: "Quem Está Atrás de Você?",
      subtitle: "Alguém com um problema sério com você.",
      die: "1d6",
      options: [
        "Uma corporação que você pode ter irritado.",
        "Um bando booster que você enfrentou antes.",
        "Lawmen corruptos ou que erroneamente te consideram culpado/a de algo.",
        "Um Solo rival de outra Corp.",
        "Um Fixer que te vê como ameaça.",
        "Um Solo rival que te vê como seu nemesis.",
      ],
    },
    {
      id: "solo-moral",
      title: "Como é Sua Bússola Moral?",
      subtitle: "Onde você traça a linha — se é que traça.",
      die: "1d6",
      options: [
        "Sempre trabalhando pelo bem, tentando eliminar os 'vilões'.",
        "Sempre poupa inocentes (idosos, mulheres, crianças, animais).",
        "Ocasionalmente escorrega em coisas antiéticas, mas é raro. Você tem alguns padrões.",
        "Implacável e centrado/a no lucro — trabalha para qualquer um, qualquer job, pelo dinheiro.",
        "Disposto/a a dobrar as regras (e a lei) para fazer o trabalho.",
        "Totalmente mau/má. Faz trabalho ilegal e antiético o tempo todo — e gosta.",
      ],
    },
  ],
};

// ─── Netrunner ────────────────────────────────────────────────────────────────

const netrunner: RoleLifepath = {
  roleId: "netrunner",
  flavor: "Sua mente é a arma mais perigosa da NET.",
  tables: [
    {
      id: "net-partner",
      title: "Tem Parceiro/a ou Trabalha Sozinho/a?",
      subtitle: "Como você opera no dia a dia.",
      die: "choose",
      options: ["Com Parceiro/a", "Sozinho/a"],
      formatFluxo: (v) => v === "Com Parceiro/a" ? "Opera com parceiro/a." : "Opera sozinho/a.",
    },
    {
      id: "net-partner-who",
      title: "Quem é Seu/Sua Parceiro/a?",
      subtitle: "A natureza do vínculo.",
      die: "1d6",
      showIf: { id: "net-partner", value: "Com Parceiro/a" },
      options: [
        "Familiar",
        "Velho/a amigo/a",
        "Possível parceiro/a romântico/a também",
        "Parceiro/a secreto/a que pode ser uma IA rogue. Talvez.",
        "Parceiro/a secreto/a com conexões na máfia/gangues",
        "Parceiro/a secreto/a com conexões corporativas",
      ],
      formatFluxo: (v) => `Parceiro/a: ${v.toLowerCase()}.`,
    },
    {
      id: "net-type",
      title: "Que Tipo de Runner Você É?",
      subtitle: "Sua especialidade e motivação na NET.",
      die: "1d6",
      options: [
        "Freelancer que hackeía por dinheiro.",
        "Clone runner corporativo que hackeía para a Corp.",
        "Hacktivist interessado em invadir sistemas e expor os vilões.",
        "Gosta de invadir sistemas pelo prazer.",
        "Parte de uma equipe regular de freelancers.",
        "Hackeía para um Media, político ou Lawman que te contrata quando precisa.",
      ],
    },
    {
      id: "net-workspace",
      title: "Como é Seu Espaço de Trabalho?",
      subtitle: "O ambiente onde você passa a maior parte do tempo conectado/a.",
      die: "1d6",
      options: [
        "Há telas em todo lugar.",
        "Parece melhor em Virtualidade, você jura.",
        "Uma cama suja coberta de cabos.",
        "Corporativo, modular e utilitário.",
        "Minimalista, limpo e organizado.",
        "Tomou todo o seu espaço de vida.",
      ],
    },
    {
      id: "net-clients",
      title: "Quem São Seus Outros Clientes?",
      subtitle: "Quem mais paga pelos seus serviços.",
      die: "1d6",
      options: [
        "Fixers locais que te mandam clientes.",
        "Gangsters locais que também protegem sua área de trabalho enquanto você varre ameaças da NET.",
        "Execs corporativos que te usam para trabalho de 'projeto negro'.",
        "Solos ou outros combatentes que te usam para manter seus sistemas pessoais seguros.",
        "Nomads e Fixers locais que te usam para manter seus sistemas familiares seguros.",
        "Você trabalha para si mesmo/a e vende os dados que encontra na NET.",
      ],
    },
    {
      id: "net-programs",
      title: "Onde Você Consegue Seus Programas?",
      subtitle: "A fonte dos seus programas e ferramentas de hacking.",
      die: "1d6",
      options: [
        "Vasculha velhas Zonas abandonadas da cidade.",
        "Rouba de outros Netrunners que você elimina.",
        "Tem um Fixer local que fornece programas em troca de trabalho de hacking.",
        "Execs corporativos fornecem programas em troca dos seus serviços.",
        "Tem acesso a backdoors em alguns armazéns corporativos.",
        "Frequenta os Mercados Noturnos e compra programas quando pode.",
      ],
    },
    {
      id: "net-enemy",
      title: "Quem Está Atrás de Você?",
      subtitle: "Uma ameaça persistente que te persegue na NET ou fora dela.",
      die: "1d6",
      options: [
        "Pode ser uma IA rogue ou um NET Ghost. De qualquer forma, é péssimo.",
        "Netrunners rivais que simplesmente não gostam de você.",
        "Corporativos que querem que você trabalhe exclusivamente para eles.",
        "Lawmen que te consideram um 'chapéu preto' ilegal e querem te prender.",
        "Clientes antigos que acham que você os traiu.",
        "Fixer ou outro cliente que quer seus serviços exclusivos.",
      ],
    },
  ],
};

// ─── Tech ─────────────────────────────────────────────────────────────────────

const tech: RoleLifepath = {
  roleId: "tech",
  flavor: "Se está quebrado, você conserta. Se não está, você melhora.",
  tables: [
    {
      id: "tech-type",
      title: "Que Tipo de Tech Você É?",
      subtitle: "Sua especialidade técnica.",
      die: "1d10",
      options: [
        "Técnico/a de Cyberware",
        "Mecânico/a de Veículos",
        "Faz Tudo",
        "Técnico/a de Eletrônica",
        "Armeiro/a",
        "Inventor/a Maluco/a",
        "Mecânico/a de Robôs e Drones",
        "Mecânico/a de Maquinário Pesado",
        "Catador/a",
        "Mecânico/a Naval",
      ],
    },
    {
      id: "tech-partner",
      title: "Tem Parceiro/a ou Trabalha Sozinho/a?",
      subtitle: "Como você opera.",
      die: "choose",
      options: ["Com Parceiro/a", "Sozinho/a"],
      formatFluxo: (v) => v === "Com Parceiro/a" ? "Opera com parceiro/a." : "Opera sozinho/a.",
    },
    {
      id: "tech-partner-who",
      title: "Quem é Seu/Sua Parceiro/a?",
      subtitle: "A natureza do vínculo.",
      die: "1d6",
      showIf: { id: "tech-partner", value: "Com Parceiro/a" },
      options: [
        "Familiar",
        "Velho/a amigo/a",
        "Possível parceiro/a romântico/a também",
        "Mentor/a",
        "Parceiro/a secreto/a com conexões na máfia/gangues",
        "Parceiro/a secreto/a com conexões corporativas",
      ],
      formatFluxo: (v) => `Parceiro/a: ${v.toLowerCase()}.`,
    },
    {
      id: "tech-workspace",
      title: "Como é Seu Espaço de Trabalho?",
      subtitle: "O ambiente onde você cria e conserta.",
      die: "1d6",
      options: [
        "Uma bagunça cheia de papel de planta.",
        "Tudo é codificado por cores, mas ainda é um pesadelo.",
        "Totalmente digital e obsessivamente salvo todo dia.",
        "Você projeta tudo no seu Agente.",
        "Você guarda tudo — vai que precisa depois.",
        "Só você entende o seu sistema de organização.",
      ],
    },
    {
      id: "tech-clients",
      title: "Quem São Seus Principais Clientes?",
      subtitle: "Quem paga suas contas.",
      die: "1d6",
      options: [
        "Fixers locais que te mandam clientes.",
        "Gangsters locais que também protegem sua área ou casa.",
        "Execs corporativos que te usam para trabalho de 'projeto negro'.",
        "Solos ou outros combatentes que te usam para manutenção de armas.",
        "Nomads e Fixers que trazem tecnologia 'encontrada' para consertar.",
        "Você trabalha para si mesmo/a e vende o que inventa/conserta.",
      ],
    },
    {
      id: "tech-supplies",
      title: "Onde Você Consegue Seus Materiais?",
      subtitle: "A fonte das peças e componentes que você usa.",
      die: "1d6",
      options: [
        "Vasculha destroços em Zonas abandonadas.",
        "Retira equipamentos de corpos após tiroteios.",
        "Tem um Fixer local que traz suprimentos em troca de trabalho de reparo.",
        "Execs corporativos fornecem material em troca dos seus serviços.",
        "Tem backdoor para alguns armazéns corporativos.",
        "Frequenta os Mercados Noturnos e encontra boas ofertas.",
      ],
    },
    {
      id: "tech-enemy",
      title: "Quem Está Atrás de Você?",
      subtitle: "Uma ameaça que não some.",
      die: "1d6",
      options: [
        "Gangsters da Zona de Combate que querem que você trabalhe exclusivamente para eles.",
        "Tech rival tentando roubar seus clientes.",
        "Corporativos que querem que você trabalhe exclusivamente para eles.",
        "Fabricante maior tentando te derrubar porque seus mods são uma ameaça.",
        "Antigo cliente que acha que você o traiu.",
        "Tech rival tentando te superar na disputa por recursos e peças.",
      ],
    },
  ],
};

// ─── Medtech ──────────────────────────────────────────────────────────────────

const medtech: RoleLifepath = {
  roleId: "medtech",
  flavor: "Na Night City, a diferença entre vivo e morto é você.",
  tables: [
    {
      id: "med-type",
      title: "Que Tipo de Medtech Você É?",
      subtitle: "Sua especialidade médica.",
      die: "1d10",
      options: [
        "Cirurgião/ã",
        "Clínico/a Geral",
        "Médico/a de Trauma",
        "Psiquiatra",
        "Terapeuta de Ciberpsicóticos",
        "Ripperdoc",
        "Operador/a de Criosistemas",
        "Farmacêutico/a",
        "Bodysculptor (Escultor/a Corporal)",
        "Patologista Forense",
      ],
    },
    {
      id: "med-workspace",
      title: "Como é Seu Espaço de Trabalho?",
      subtitle: "O ambiente onde você trata seus pacientes.",
      die: "1d6",
      options: [
        "Esterilizado todo dia de manhã, como um relógio.",
        "Não é mais de última geração, mas é confortável para você.",
        "Seu equipamento de criopreservação também é usado para resfriar bebidas.",
        "Tudo que é possível é de uso único e guardado compactado até ser necessário.",
        "Não tão limpo quanto muitos pacientes teriam esperado.",
        "Meticulosamente organizado, afiado e esterilizado.",
      ],
    },
    {
      id: "med-partner",
      title: "Tem Parceiro/a ou Trabalha Sozinho/a?",
      subtitle: "Como você opera.",
      die: "choose",
      options: ["Com Parceiro/a", "Sozinho/a"],
      formatFluxo: (v) => v === "Com Parceiro/a" ? "Opera com parceiro/a." : "Opera sozinho/a.",
    },
    {
      id: "med-partner-who",
      title: "Quem é Seu/Sua Parceiro/a?",
      subtitle: "A natureza do vínculo.",
      die: "1d6",
      showIf: { id: "med-partner", value: "Com Parceiro/a" },
      options: [
        "Grupo da Trauma Team",
        "Velho/a amigo/a",
        "Possível parceiro/a romântico/a também",
        "Familiar",
        "Parceiro/a secreto/a com conexões na máfia/gangues",
        "Parceiro/a secreto/a com conexões corporativas",
      ],
      formatFluxo: (v) => `Parceiro/a: ${v.toLowerCase()}.`,
    },
    {
      id: "med-clients",
      title: "Quem São Seus Principais Clientes?",
      subtitle: "Quem busca seus serviços médicos.",
      die: "1d6",
      options: [
        "Fixers locais que te mandam clientes.",
        "Gangsters locais que também protegem sua área ou casa em troca de ajuda médica.",
        "Execs corporativos que te usam para trabalho médico de 'projeto negro'.",
        "Solos ou outros combatentes que precisam de auxílio médico.",
        "Nomads e Fixers que trazem clientes feridos.",
        "Trabalho paramédico da Trauma Team.",
      ],
    },
    {
      id: "med-supplies",
      title: "Onde Você Consegue Seus Suprimentos?",
      subtitle: "A fonte dos seus materiais médicos.",
      die: "1d6",
      options: [
        "Vasculha estoques de suprimentos médicos em Zonas abandonadas.",
        "Retira peças de corpos após tiroteios.",
        "Tem um Fixer local que traz suprimentos em troca de trabalho médico.",
        "Execs corporativos ou a Trauma Team fornecem material em troca dos seus serviços.",
        "Tem backdoor para alguns armazéns corporativos ou hospitalares.",
        "Frequenta os Mercados Noturnos e encontra boas ofertas.",
      ],
    },
  ],
};

// ─── Media ────────────────────────────────────────────────────────────────────

const media: RoleLifepath = {
  roleId: "media",
  flavor: "A verdade é uma arma. Você decide como atirar.",
  tables: [
    {
      id: "media-type",
      title: "Que Tipo de Media Você É?",
      subtitle: "Seu formato e estilo de comunicação.",
      die: "1d6",
      options: [
        "Blogger",
        "Escritor/a (livros)",
        "Videografista",
        "Documentarista",
        "Repórter investigativo/a",
        "Cronista de Rua",
      ],
    },
    {
      id: "media-ethics",
      title: "Quão Ético/a Você É?",
      subtitle: "Onde você traça a linha entre informar e manipular.",
      die: "1d6",
      options: [
        "Reportagem justa e honesta, práticas éticas rígidas. Só o que é verificável.",
        "Justo/a e honesto/a, mas disposto/a a usar boatos se for necessário.",
        "Ocasionalmente escorrega em coisas antiéticas, mas é raro. Você tem alguns padrões.",
        "Disposto/a a dobrar qualquer regra para pegar os vilões. Só os vilões.",
        "Implacável e determinado/a a fazer sucesso, mesmo que quebre a lei.",
        "Totalmente corrupto/a. Aceita subornos, faz reportagens ilegais. Sua pena tem preço.",
      ],
    },
    {
      id: "media-reach",
      title: "Como Seu Trabalho Chega ao Público?",
      subtitle: "O canal pelo qual você distribui seu conteúdo.",
      die: "1d6",
      options: [
        "Revista mensal",
        "Blog",
        "Feed de vídeo convencional",
        "Canal de notícias",
        "Vendas de 'livro'",
        "Screamsheets (panfletos/noticiários de rua)",
      ],
      formatFluxo: (v) => `Distribui via ${v.toLowerCase()}.`,
    },
    {
      id: "media-stories",
      title: "Que Tipo de Histórias Você Quer Contar?",
      subtitle: "O tema central do seu trabalho jornalístico.",
      die: "1d6",
      options: [
        "Intrigas políticas",
        "Impacto ecológico",
        "Notícias de celebridades",
        "Denúncias corporativas",
        "Editoriais",
        "Propaganda",
      ],
      formatFluxo: (v) => `Foco em ${v.toLowerCase()}.`,
    },
  ],
};

// ─── Exec ─────────────────────────────────────────────────────────────────────

const exec: RoleLifepath = {
  roleId: "exec",
  flavor: "O poder é o único idioma que importa. Você é fluente.",
  tables: [
    {
      id: "exec-corp-type",
      title: "Que Tipo de Corporação Você Trabalha?",
      subtitle: "Role 1d6 para as opções principais, ou escolha qualquer uma manualmente (opções 7-10 exigem acordo com o Narrador).",
      die: "1d6",
      options: [
        "Financeiro",
        "Mídia e Comunicações",
        "Cybertech e Tecnologias Médicas",
        "Farmacêutico e Biotecnologia",
        "Alimentos, Roupas ou Consumíveis em Geral",
        "Produção de Energia",
        "Eletrônicos Pessoais e Robótica",
        "Serviços Corporativos",
        "Serviços ao Consumidor",
        "Imóveis e Construção",
      ],
      formatFluxo: (v) => `Setor: ${v}.`,
    },
    {
      id: "exec-division",
      title: "Em Qual Divisão Você Trabalha?",
      subtitle: "Sua área dentro da estrutura corporativa.",
      die: "1d6",
      options: [
        "Compras e Suprimentos",
        "Manufatura e Produção",
        "Pesquisa e Desenvolvimento",
        "Recursos Humanos",
        "Relações Públicas / Publicidade",
        "Fusões e Aquisições",
      ],
      formatFluxo: (v) => `Divisão de ${v}.`,
    },
    {
      id: "exec-corp-ethics",
      title: "Quão Boa/Ruim É Sua Corp?",
      subtitle: "O caráter ético da organização para qual você trabalha.",
      die: "1d6",
      options: [
        "Sempre trabalha pelo bem, com práticas éticas rígidas.",
        "Opera de forma justa e honesta o tempo todo.",
        "Ocasionalmente escorrega em coisas antiéticas, mas é raro.",
        "Disposta a dobrar as regras quando precisa.",
        "Implacável e centrada em lucro, disposta a fazer coisas ruins.",
        "Totalmente maléfica. Envolve-se em negócios ilegais e antiéticos o tempo todo.",
      ],
    },
    {
      id: "exec-boss",
      title: "Como É Sua Relação com Seu Chefe?",
      subtitle: "A dinâmica de poder entre você e quem está acima.",
      die: "1d6",
      options: [
        "Seu chefe te orienta, mas cuidado com os inimigos dele.",
        "Seu chefe te dá liberdade total e não quer saber o que você está aprontando.",
        "Seu chefe é microgerenciador e tenta se meter no seu trabalho.",
        "Seu chefe é um psicopata com explosões imprevisíveis e paranoia silenciosa.",
        "Seu chefe é legal e te protege contra rivais.",
        "Seu chefe se sente ameaçado pela sua ascensão meteórica e está planejando te apunhalar.",
      ],
    },
    {
      id: "exec-location",
      title: "Onde Sua Corp Está Sediada?",
      subtitle: "O alcance geográfico da sua corporação.",
      die: "1d6",
      options: [
        "Uma cidade",
        "Várias cidades",
        "Um estado inteiro",
        "Nacional",
        "Internacional, escritórios em algumas cidades principais",
        "Internacional, escritórios em todo lugar",
      ],
      formatFluxo: (v) => `Alcance da corp: ${v.toLowerCase()}.`,
    },
    {
      id: "exec-enemy",
      title: "Quem Está de Olho no Seu Grupo?",
      subtitle: "A ameaça que sua Corp ou divisão enfrenta.",
      die: "1d6",
      options: [
        "Corp rival no mesmo setor.",
        "Autoridades policiais estão de olho em você.",
        "A mídia local quer te derrubar.",
        "Divisões diferentes dentro da sua própria empresa estão em conflito.",
        "O governo local não gosta da sua Corp.",
        "Corporações internacionais estão de olho em você para uma aquisição hostil.",
      ],
    },
  ],
};

// ─── Lawman ───────────────────────────────────────────────────────────────────

const lawman: RoleLifepath = {
  roleId: "lawman",
  flavor: "A lei é você. O que você decidir que é a lei.",
  tables: [
    {
      id: "law-position",
      title: "Qual é Sua Posição na Força?",
      subtitle: "Sua função dentro da estrutura policial.",
      die: "1d6",
      options: [
        "Guarda",
        "Patrulha ou Ronda Padrão",
        "Investigação Criminal",
        "Operações Táticas (SWAT)",
        "Patrulha Motorizada",
        "Assuntos Internos",
      ],
    },
    {
      id: "law-jurisdiction",
      title: "Qual é a Jurisdição do Seu Grupo?",
      subtitle: "O território sob responsabilidade da sua unidade.",
      die: "1d6",
      options: [
        "Zonas Corporativas",
        "Zona de Patrulha Urbana Padrão",
        "Zonas de Combate",
        "Periferia da Cidade",
        "Zonas de Recuperação",
        "Rodovias Abertas",
      ],
      formatFluxo: (v) => `Jurisdição: ${v}.`,
    },
    {
      id: "law-corruption",
      title: "Quão Corrupto É Seu Grupo?",
      subtitle: "O nível de integridade — ou a falta dela — na sua unidade.",
      die: "1d6",
      options: [
        "Policiamento justo e honesto, práticas éticas rígidas.",
        "Justo e honesto, mas severo com infratores.",
        "Ocasionalmente escorrega em coisas antiéticas, mas é raro.",
        "Disposto a dobrar qualquer regra para pegar os bandidos.",
        "Implacável e determinado a controlar as ruas, mesmo que quebre a lei.",
        "Totalmente corrupto. Aceita subornos e age de forma ilegal o tempo todo.",
      ],
    },
    {
      id: "law-enemy",
      title: "Quem Está Perseguindo Seu Grupo?",
      subtitle: "A ameaça principal que a sua unidade enfrenta.",
      die: "1d6",
      options: [
        "Crime organizado",
        "Boostergangues",
        "Grupo de Responsabilidade Policial",
        "Políticos corruptos",
        "Contrabandistas",
        "Criminosos de rua",
      ],
      formatFluxo: (v) => `Ameaça: ${v.toLowerCase()}.`,
    },
    {
      id: "law-target",
      title: "Qual é o Principal Alvo do Seu Grupo?",
      subtitle: "O foco das operações da sua unidade.",
      die: "1d6",
      options: [
        "Crime organizado",
        "Boostergangues",
        "Traficantes de drogas",
        "Políticos corruptos",
        "Contrabandistas",
        "Crimes de rua em geral",
      ],
      formatFluxo: (v) => `Alvo: ${v.toLowerCase()}.`,
    },
  ],
};

// ─── Fixer ────────────────────────────────────────────────────────────────────

const fixer: RoleLifepath = {
  roleId: "fixer",
  flavor: "Tudo tem preço. Você só sabe onde encontrar.",
  tables: [
    {
      id: "fix-type",
      title: "Que Tipo de Fixer Você É?",
      subtitle: "Sua especialidade no mundo dos negócios obscuros.",
      die: "1d10",
      options: [
        "Negocia acordos entre gangues rivais.",
        "Consegue recursos raros para clientela exclusiva.",
        "Especializado/a em agenciar serviços de Solos ou Techs.",
        "Fornece um recurso regular para Mercados Noturnos — comida, remédios, drogas.",
        "Consegue recursos altamente ilegais — drogas de rua ou armas milspec.",
        "Fornece recursos para Techs e Medtechs — peças e suprimentos médicos.",
        "Opera vários Mercados Noturnos de sucesso, mas não como dono/a.",
        "Negocia contratos de uso de maquinário pesado, veículos militares e aeronaves.",
        "Negocia como receptador/a para catadores que saqueiam Corps ou Zonas de Combate.",
        "Age como agente exclusivo/a de um Media, Rockerboy ou Bando Nômade.",
      ],
    },
    {
      id: "fix-office",
      title: "Como é Seu 'Escritório'?",
      subtitle: "Onde você conduz seus negócios.",
      die: "1d6",
      options: [
        "Você não tem um. Prefere manter mobilidade.",
        "Um booth em um bar local.",
        "Tudo via mensagens na Data Pool e pontos de entrega anônimos.",
        "Um quarto extra em um armazém, loja ou clínica.",
        "Um prédio abandonado que só você conhece.",
        "O lobby de um cube hotel.",
      ],
    },
    {
      id: "fix-partner",
      title: "Tem Parceiro/a ou Trabalha Sozinho/a?",
      subtitle: "Como você opera.",
      die: "choose",
      options: ["Com Parceiro/a", "Sozinho/a"],
      formatFluxo: (v) => v === "Com Parceiro/a" ? "Opera com parceiro/a." : "Opera sozinho/a.",
    },
    {
      id: "fix-partner-who",
      title: "Quem é Seu/Sua Parceiro/a?",
      subtitle: "A natureza do vínculo.",
      die: "1d6",
      showIf: { id: "fix-partner", value: "Com Parceiro/a" },
      options: [
        "Familiar",
        "Velho/a amigo/a",
        "Possível parceiro/a romântico/a também",
        "Mentor/a",
        "Parceiro/a secreto/a com conexões na máfia/gangues",
        "Parceiro/a secreto/a com conexões corporativas",
      ],
      formatFluxo: (v) => `Parceiro/a: ${v.toLowerCase()}.`,
    },
    {
      id: "fix-clients",
      title: "Quem São Seus Clientes Secundários?",
      subtitle: "Outras pessoas que dependem dos seus serviços.",
      die: "1d6",
      options: [
        "Rockerboys ou Medias locais que usam você para conseguir gigs ou contatos.",
        "Gangsters locais que também protegem sua área ou casa.",
        "Execs corporativos que te usam para compras de 'projeto negro'.",
        "Solos ou outros combatentes que te usam para conseguir jobs ou contatos.",
        "Nomads e Fixers locais que usam você para fechar transações.",
        "Políticos locais ou Execs que dependem de você para informações.",
      ],
    },
    {
      id: "fix-enemy",
      title: "Quem Está Atrás de Você?",
      subtitle: "Uma ameaça que não some.",
      die: "1d6",
      options: [
        "Gangsters da Zona de Combate que querem que você trabalhe exclusivamente para eles.",
        "Fixers rivais tentando roubar seus clientes.",
        "Execs que querem que você trabalhe exclusivamente para eles.",
        "Inimigo de um antigo cliente querendo eliminar 'pontas soltas' — como você.",
        "Antigo cliente que acha que você o traiu.",
        "Fixer rival tentando te superar na disputa por recursos.",
      ],
    },
  ],
};

// ─── Nomad ────────────────────────────────────────────────────────────────────

const nomad: RoleLifepath = {
  roleId: "nomad",
  flavor: "A estrada é sua casa. O bando é sua família.",
  tables: [
    {
      id: "nom-size",
      title: "Qual é o Tamanho do Seu Bando?",
      subtitle: "A escala do grupo ao qual você pertence.",
      die: "1d6",
      options: [
        "Uma única família estendida",
        "Algumas dezenas de membros",
        "Quarenta ou cinquenta membros",
        "Cem ou mais membros",
        "Uma Família de Sangue (centenas de membros)",
        "Uma Família Afiliada (composta por várias Famílias de Sangue)",
      ],
    },
    {
      id: "nom-base",
      title: "Seu Bando Opera em Terra, Ar ou Mar?",
      subtitle: "O domínio principal de operação do bando.",
      die: "choose",
      options: ["Terra", "Ar", "Mar"],
      formatFluxo: (v) =>
        v === "Terra" ? "Opera nas estradas." : v === "Ar" ? "Opera no ar." : "Opera no mar.",
    },
    {
      id: "nom-land-type",
      title: "O Que Fazem na Terra?",
      subtitle: "A atividade principal do bando nas estradas.",
      die: "1d10",
      showIf: { id: "nom-base", value: "Terra" },
      options: [
        "Gogang (gangue de motoqueiros)",
        "Transporte de passageiros",
        "Chautauqua / escola itinerante",
        "Show / carnaval itinerante",
        "Agricultores migrantes",
        "Transporte de carga",
        "Proteção de carregamentos",
        "Contrabando",
        "Exército mercenário",
        "Equipe de construção",
      ],
    },
    {
      id: "nom-air-type",
      title: "O Que Fazem no Ar?",
      subtitle: "A atividade principal do bando nos céus.",
      die: "1d6",
      showIf: { id: "nom-base", value: "Ar" },
      options: [
        "Pirataria aérea",
        "Transporte de carga",
        "Transporte de passageiros",
        "Proteção de aeronaves",
        "Contrabando",
        "Suporte de combate",
      ],
    },
    {
      id: "nom-sea-type",
      title: "O Que Fazem no Mar?",
      subtitle: "A atividade principal do bando nas águas.",
      die: "1d6",
      showIf: { id: "nom-base", value: "Mar" },
      options: [
        "Pirataria",
        "Transporte de carga",
        "Transporte de passageiros",
        "Contrabando",
        "Suporte de combate",
        "Guerra submarina",
      ],
    },
    {
      id: "nom-role",
      title: "O Que Você Faz Para o Bando?",
      subtitle: "Sua função e especialidade dentro do grupo.",
      die: "1d6",
      options: [
        "Explorador/a (negociador/a)",
        "Outrider (proteção, armas)",
        "Piloto / motorista de transporte",
        "Loadmaster (movimentador de carga pesada, caminhoneiro/a)",
        "Contrabandista solo",
        "Suprimentos (combustível, veículos, etc.)",
      ],
    },
    {
      id: "nom-enemy",
      title: "Quem Está Perseguindo Seu Bando?",
      subtitle: "A ameaça principal que o bando enfrenta nas estradas.",
      die: "1d6",
      options: [
        "Crime organizado",
        "Boostergangues",
        "Traficantes de drogas",
        "Políticos corruptos",
        "Bandos rivais nos mesmos negócios",
        "Policiais corruptos",
      ],
    },
    {
      id: "nom-philosophy",
      title: "Qual é a Filosofia Geral do Seu Bando?",
      subtitle: "O código moral que guia o grupo.",
      die: "1d6",
      options: [
        "Sempre trabalhando pelo bem — o bando acolhe outros e só quer sobreviver.",
        "É mais como um negócio familiar. Funciona de forma justa e honesta.",
        "Ocasionalmente escorrega em coisas antiéticas, mas é raro.",
        "Disposto a dobrar as regras quando atrapalham o que o bando precisa.",
        "Implacável e centrado em si mesmo — disposto a fazer coisas ruins se avança o bando.",
        "Totalmente malévolo. Aterroriza as estradas — matando, saqueando e aterrorizando todos.",
      ],
    },
  ],
};

// ─── Export ───────────────────────────────────────────────────────────────────

export const roleLifepaths: RoleLifepath[] = [
  rockerboy,
  solo,
  netrunner,
  tech,
  medtech,
  media,
  exec,
  lawman,
  fixer,
  nomad,
];

export function getRoleLifepath(roleId: string): RoleLifepath | undefined {
  return roleLifepaths.find((r) => r.roleId === roleId);
}
