import type { Role } from "@/lib/types";

// All 10 Roles as listed in Cyberpunk RED (p.30): Rockerboys, Solos, Netrunners,
// Techs, Medtechs, Medias, Execs, Lawmen, Fixers, and Nomads.

export const roles: Role[] = [
  {
    id: "rockerboy",
    name: "Rockerboy",
    namePtBr: "Artista Rebelde",
    tagline: "Música como revolução. Palco como campo de batalha.",
    description:
      "Rockerboys são músicos, artistas e agitadores culturais que usam a arte como arma política. Não precisam ser músicos — podem ser poetas, bailarinos, atores ou simplesmente figuras carismáticas. Johnny Silverhand foi o mais famoso de todos: provou que três acordes e a verdade podem abalar impérios corporativos.",
    abilityName: "Impacto Carismático",
    specialAbility:
      "Influencia outros pela força da personalidade — através de música, poesia, dança ou apenas presença física. Pode transformar desconhecidos em fãs e leais em devotos. Quanto maior o nível, maior o grupo afetado e mais profundo o impacto. Poderia ser um Rockerboy — ou um líder de culto.",
    keyStats: ["EMP", "COOL", "WILL"],
    typicalGear: [
      "Instrumento Musical Elétrico",
      "Amplificador Portátil",
      "Pistola Muito Pesada",
      "Arma Melee Pesada",
      "Armorjack Leve (SP 11)",
      "Agente Pessoal",
    ],
    pageRef: 31,
  },
  {
    id: "solo",
    name: "Solo",
    namePtBr: "Combatente Especialista",
    tagline: "Soldado de aluguel. Máquina de matar. O último recurso.",
    description:
      "Solos são guerreiros treinados — mercenários, guarda-costas e assassinos que venderam suas habilidades de combate ao maior ofertante. Nasceram com uma arma na mão. Em Night City, são a força policial dos ricos e o braço armado das corporações. Um Solo experiente conhece todos os ângulos de um tiroteio e sai vivo de situações que matariam qualquer outro.",
    abilityName: "Consciência de Combate",
    specialAbility:
      "Evoca treinamento especializado para uma consciência situacional aprimorada do campo de batalha. Adiciona pontos ao nível de Consciência de Combate à Iniciativa e a rolagens de Percepção durante o combate. No nível máximo, virtualmente impossível de ser surpreendido.",
    keyStats: ["REF", "DEX", "BODY"],
    typicalGear: [
      "Rifle de Assalto",
      "Pistola Muito Pesada",
      "Arma Melee Pesada",
      "Armorjack Leve — Corpo e Cabeça (SP 11)",
      "Agente Pessoal",
    ],
    pageRef: 32,
  },
  {
    id: "netrunner",
    name: "Netrunner",
    namePtBr: "Hacker de Redes",
    tagline: "A guerra invisível. Código contra ICE. Mente contra máquina.",
    description:
      "Netrunners são os mestres hackers cibernéticos do mundo pós-NET — ladrões de segredos e devoradores de cérebro. Navegam o espaço cibernético onde dados se tornam arquiteturas físicas e ICE pode te matar. Invadem sistemas corporativos, roubam dados e sabotam infraestruturas enquanto seu corpo fica imóvel e vulnerável no mundo real.",
    abilityName: "Interface",
    specialAbility:
      "Permite controlar um Cyberdeck e usar Programas em batalha NET. Além disso, dá acesso a todos os comandos especiais usados durante um Netrun, incluindo ataques, defesas e funções de suporte. Quanto maior o nível, mais programas podem ser carregados e executados simultaneamente.",
    keyStats: ["INT", "REF"],
    typicalGear: [
      "Cyberdeck Básico (7 slots)",
      "Óculos de Realidade Virtual",
      "Programas: Armor, Sword, See Ya/Eraser, Worm",
      "Pistola Muito Pesada",
      "Armorjack Leve — Corpo e Cabeça (SP 11)",
      "Agente Pessoal",
    ],
    pageRef: 33,
  },
  {
    id: "tech",
    name: "Tech",
    namePtBr: "Tecno-Inventor",
    tagline: "Se está quebrado, conserta. Se não existe, cria.",
    description:
      "Techs são mecânicos renegados e inventores supertecnológicos — as pessoas que fazem o Futuro Negro funcionar. Eles podem consertar quase qualquer coisa, construir dispositivos do zero, modificar armas e instalar cyberware. Em um mundo onde tudo falha e o melhor equipamento custa fortunas, ter um Tech no grupo é essencial.",
    abilityName: "Criador",
    specialAbility:
      "Pode consertar, melhorar, modificar, fabricar e inventar novos itens. Ao aumentar o nível, o Tech ganha especialidades em Reparos, Upgrades, Fabricação e Invenção. A capacidade de inventar é única — pode criar itens que simplesmente não existem ainda.",
    keyStats: ["TECH", "INT"],
    typicalGear: [
      "Tech Bag (ferramentas completas)",
      "Espingarda ou Rifle de Assalto",
      "Granada Flashbang",
      "Armorjack Leve — Corpo e Cabeça (SP 11)",
      "Máscara Antipoluição",
      "Agente Pessoal",
    ],
    pageRef: 34,
  },
  {
    id: "medtech",
    name: "Medtech",
    namePtBr: "Médico de Campo",
    tagline: "O corpo humano é sua tela. E ele está sempre precisando de reparos.",
    description:
      "Medtechs são os médicos do Futuro Negro — tanto mecânicos quanto doutores, cuidando de pessoas que muitas vezes são mais máquina do que humano. Podem ser cirurgiões, ripperdocs, paramédicos da Trauma Team ou farmacêuticos de rua. Em Night City, quem sabe manter alguém vivo tem poder.",
    abilityName: "Medicina",
    specialAbility:
      "Mantém pessoas vivas que deveriam estar mortas através de conhecimento e treinamento. Ao aumentar o nível, o Medtech escolhe especialidades: Cirurgia (tratar lesões críticas e instalar cyberware), Farmacêutica (criar medicamentos especiais) ou Operação de Criosistema. A Cirurgia é exclusiva ao Medtech.",
    keyStats: ["TECH", "INT", "EMP"],
    typicalGear: [
      "Mala Médica Completa (Medtech Bag)",
      "Espingarda ou Rifle de Assalto",
      "Escudo Balístico",
      "Granadas de Fumaça x2",
      "Armorjack Leve — Corpo e Cabeça (SP 11)",
      "Agente Pessoal",
    ],
    pageRef: 35,
  },
  {
    id: "media",
    name: "Media",
    namePtBr: "Jornalista de Combate",
    tagline: "A verdade é a arma mais perigosa de Night City.",
    description:
      "Medias são os jornalistas que expõem as mentiras que as corporações tentam enterrar. Com uma câmera e uma credencial de imprensa, são figuras públicas conhecidas em Night City — o que é tanto proteção quanto alvo. Uma reportagem pode derrubar corporações; um escândalo pode salvar vidas ou destruir carreiras.",
    abilityName: "Credibilidade",
    specialAbility:
      "Pode não só convencer uma audiência da verdade do que publica, mas também tem uma audiência maior quanto mais credível for. Medias têm acesso privilegiado a fontes e informações, sempre com os ouvidos abertos para rumores e informações passivamente. Quanto maior o nível, mais amplo o alcance e mais profundo o acesso.",
    keyStats: ["EMP", "COOL", "INT"],
    typicalGear: [
      "Câmera de Vídeo (12h)",
      "Gravador de Áudio",
      "Computador Laptop",
      "Scrambler/Descriptografador",
      "Pistola Pesada ou Muito Pesada",
      "Armorjack Leve — Corpo e Cabeça (SP 11)",
      "Agente Pessoal",
    ],
    pageRef: 36,
  },
  {
    id: "exec",
    name: "Exec",
    namePtBr: "Executivo Corporativo",
    tagline: "O poder não é quem tem a arma maior. É quem controla quem tem.",
    description:
      "Execs são executivos corporativos que constroem equipes para realizar seus objetivos — legais ou não. Em um mundo onde corporações governam, eles são os que alavancam esse poder. Cada Exec tem Solos, Netrunners e Techs trabalhando para eles, com funções visíveis (secretário, motorista) e papéis secretos (assassino, espião). O poder corrupta — mas é muito conveniente.",
    abilityName: "Trabalho em Equipe",
    specialAbility:
      "Constrói e lidera uma equipe cujos membros têm funções públicas e papéis secretos. Membros da equipe recebem moradia e roupas. O nível determina quantos membros e de qual nível — do assistente simples ao operativo de combate de alto nível. No nível 3, ganha o primeiro membro; nos níveis 5 e 9, ganha mais um cada.",
    keyStats: ["INT", "COOL", "EMP"],
    typicalGear: [
      "Pistola Muito Pesada",
      "Armorjack Leve — Corpo e Cabeça (SP 11)",
      "Detector de Microfones",
      "Computador Laptop",
      "Telefones Descartáveis x2",
      "Roupa de Negócios (Businesswear)",
      "Agente Pessoal",
    ],
    pageRef: 37,
  },
  {
    id: "lawman",
    name: "Lawman",
    namePtBr: "Agente da Lei",
    tagline: "Alguém tem que manter as ruas seguras. Por que não você?",
    description:
      "Lawmen são agentes da lei em um mundo que pouco respeita leis. NCPD, forças de segurança privadas ou qualquer autoridade que ainda tenta manter alguma ordem. As ruas estão cheias de gangues cibernéticas, psicopatas com cyberware militar e ex-mercenários da guerra corporativa. Um Lawman sempre está armado até os dentes — e sempre em desvantagem numérica.",
    abilityName: "Reforço",
    specialAbility:
      "Pode pedir a ajuda de um grupo de oficiais aliados, baseado no nível da habilidade e nas condições do pedido. O Reforço chega armado e com armadura de acordo com o nível — desde um único parceiro até uma equipe de assalto completa. É a habilidade de nunca estar verdadeiramente sozinho.",
    keyStats: ["REF", "WILL", "COOL"],
    typicalGear: [
      "Rifle de Assalto ou Espingarda",
      "Pistola Pesada",
      "Escudo Balístico",
      "Armorjack Leve — Corpo e Cabeça (SP 11)",
      "Algemas x2",
      "Comunicador de Rádio",
      "Agente Pessoal",
    ],
    pageRef: 38,
  },
  {
    id: "fixer",
    name: "Fixer",
    namePtBr: "Corretor das Ruas",
    tagline: "Precisa de algo impossível? Conheço alguém. Por um preço.",
    description:
      "Fixers são os intermediários de Night City — corretores de informação, organizadores de jobs, traficantes de favores. Se há armas militares nas ruas, foi um Fixer que as contrabandeou. Se há uma guerra de facções, um Fixer está negociando entre os lados. Parte Robin Hood, parte Al Capone. No Futuro Negro, eles são chamados de Fixers.",
    abilityName: "Operador",
    specialAbility:
      "Sabe como conseguir coisas no mercado negro e navega os complexos costumes sociais da Rua. Mantém redes extensas de contatos e clientes que pode acionar para encontrar produtos, favores ou informações. Pode também negociar acordos favoráveis e acessar recursos desejáveis que outros simplesmente não conseguem.",
    keyStats: ["COOL", "INT", "EMP"],
    typicalGear: [
      "Pistola Pesada ou Muito Pesada (x2)",
      "Arma Melee Leve",
      "Armorjack Leve — Corpo e Cabeça (SP 11)",
      "Agente Pessoal",
      "Rádio Comunicador x2",
      "Scrambler/Descriptografador",
    ],
    pageRef: 39,
  },
  {
    id: "nomad",
    name: "Nomad",
    namePtBr: "Nômade das Terras Selvagens",
    tagline: "A família é tudo. As estradas são o lar.",
    description:
      "Nômades vivem nas Terras Selvagens além das cidades, em bandos familiares que percorrem as estradas em comboios blindados. Contrabandistas, batedores e guerreiros da estrada que conhecem as rotas entre as safezones. No Tempo do Vermelho, tornaram-se mestres em transportar pessoas e suprimentos num mundo que desesperadamente precisa deles.",
    abilityName: "Moto",
    specialAbility:
      "Ao aumentar o nível, pode adicionar veículos ao pool de veículos da Família ou fazer upgrades nos veículos existentes. Graças a crescer entre veículos desde o nascimento, pode dirigir qualquer tipo de veículo com habilidade extraordinária — incluindo tipos raramente vistos como aerodynes e barcos.",
    keyStats: ["MOVE", "DEX", "COOL"],
    typicalGear: [
      "Pistola Pesada ou Muito Pesada",
      "Arma Melee Pesada",
      "Armorjack Leve — Corpo e Cabeça (SP 11)",
      "Rádio Comunicador x2",
      "Kit de Camping (Tenda, Corda, Cama Inflável)",
      "Mala Médica",
      "Agente Pessoal",
    ],
    pageRef: 40,
  },
];
