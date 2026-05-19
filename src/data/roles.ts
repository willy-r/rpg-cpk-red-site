import type { Role } from "@/lib/types";

export const roles: Role[] = [
  {
    id: "solo",
    name: "Solo",
    namePtBr: "Combatente Especialista",
    tagline: "Soldado de aluguel. Máquina de matar. O último recurso.",
    description:
      "Solos são guerreiros treinados — mercenários, guarda-costas e assassinos que venderam suas habilidades de combate ao maior ofertante. Em Night City, são a força policial dos ricos e o braço armado das corporações. Um Solo experiente conhece todos os ângulos de um tiroteio e sai vivo de situações que matariam qualquer outro.",
    abilityName: "Consciência de Combate",
    specialAbility:
      "Adiciona metade do nível da Habilidade Especial (arredondado para cima) à Iniciativa e a todas as rolagens de percepção durante combate. No nível máximo, virtualmente impossível de ser surpreendido.",
    keyStats: ["REF", "DEX", "BODY"],
    typicalGear: [
      "Rifle de Assalto",
      "Pistola Muito Pesada",
      "Armadura de Corpo Inteiro",
      "Cyberbraço com Wolvers",
      "Interface Neural",
      "Speedware",
    ],
    pageRef: 60,
  },
  {
    id: "netrunner",
    name: "Netrunner",
    namePtBr: "Hacker de Redes",
    tagline: "A guerra invisível. Código contra ICE. Mente contra máquina.",
    description:
      "Netrunners navegam o espaço cibernético — um mundo digital de dados, sistemas e defesas letais chamadas Black ICE. Eles invadem sistemas corporativos, roubam dados, sabotam infraestruturas e travam guerra nas profundezas da NET. Exigem um Cyberdeck e Interface Neural para acessar a realidade digital.",
    abilityName: "Interface",
    specialAbility:
      "Permite controlar um Cyberdeck e usar Programas durante um Netrun. O nível da habilidade determina quantos Programas podem ser carregados e executados simultaneamente no Cyberdeck.",
    keyStats: ["INT", "REF"],
    typicalGear: [
      "Cyberdeck (7 slots)",
      "Interface Neural",
      "Chips de Memória",
      "Programas: Armor, Sword, See Ya",
      "Pistola Leve (backup)",
    ],
    pageRef: 56,
  },
  {
    id: "tech",
    name: "Tech",
    namePtBr: "Engenheiro Tecno",
    tagline: "Se está quebrado, conserta. Se não existe, cria.",
    description:
      "Techs são os construtores, mecânicos e engenheiros do mundo cyberpunk. Eles podem consertar quase qualquer coisa — veículos, armas, cyberware, ou construir dispositivos do zero. Em um mundo onde tudo falha e o melhor equipamento custa fortunas, ter um Tech no grupo é essencial.",
    abilityName: "Criador",
    specialAbility:
      "Pode construir, modificar e reparar itens com as ferramentas certas. O nível da habilidade determina a complexidade do que pode ser fabricado — desde munição básica até cyberware avançado.",
    keyStats: ["TECH", "INT"],
    typicalGear: [
      "Tech Bag",
      "Techtool",
      "Ferramentas de Diagnóstico",
      "Componentes de Reparo",
      "Pistola Pesada",
    ],
    pageRef: 62,
  },
  {
    id: "nomad",
    name: "Nomad",
    namePtBr: "Nômade das Terras Selvagens",
    tagline: "A família é tudo. As estradas são o lar.",
    description:
      "Nômades vivem nas Terras Selvagens além das cidades, em bandos familiares que percorrem as estradas em comboios blindados. São contrabandistas, batedores e guerreiros da estrada. Leais acima de tudo ao seu bando, um Nômade em Night City está longe de casa — mas nunca longe dos seus.",
    abilityName: "Moto",
    specialAbility:
      "Especialista em veículos e contrabando. Recebe bônus em perseguições, pilotagem e ações com veículos. O bando do Nômade pode fornecer contatos, rotas de fuga e apoio logístico.",
    keyStats: ["MOVE", "DEX", "COOL"],
    typicalGear: [
      "Veículo Blindado",
      "Rifle de Assalto",
      "Couro Nômade (SP 11)",
      "Rádio Comunicador",
      "Kit de Sobrevivência",
    ],
    pageRef: 64,
  },
  {
    id: "fixer",
    name: "Fixer",
    namePtBr: "Corretor de Negócios",
    tagline: "Precisa de algo? Conhece alguém. Por um preço.",
    description:
      "Fixers são os intermediários de Night City — corretores de informação, organizadores de jobs, traficantes de favores. Eles conhecem todo mundo e sabem o que cada um precisa. Em um mundo onde conexões valem mais que habilidades, o Fixer é indispensável.",
    abilityName: "Conexão",
    specialAbility:
      "Mantém uma extensa rede de contatos. O nível da habilidade determina quantos contatos especializados estão disponíveis e a qualidade da informação e serviços que podem ser obtidos.",
    keyStats: ["COOL", "INT", "EMP"],
    typicalGear: [
      "Agente Pessoal (IA smartphone)",
      "Pistola Concealável",
      "Roupas de Negócios",
      "Cartões de Crédito",
      "Dispositivos de Gravação",
    ],
    pageRef: 58,
  },
  {
    id: "media",
    name: "Media",
    namePtBr: "Jornalista de Combate",
    tagline: "A verdade é a arma mais perigosa de Night City.",
    description:
      "Medias são jornalistas, documentaristas e propagandistas. Em um mundo controlado pelas megacorporações, eles são os únicos que ainda perseguem a verdade — ou pelo menos sua versão dela. Uma exposição pode derrubar corporações; um escândalo pode salvar vidas.",
    abilityName: "Credibilidade",
    specialAbility:
      "Influência pública e capacidade de amplificar histórias. O nível da habilidade determina o alcance das reportagens e a proteção que a cobertura midiática oferece — corporações pensam duas vezes antes de eliminar alguém famoso.",
    keyStats: ["EMP", "COOL", "INT"],
    typicalGear: [
      "Câmera de Vídeo",
      "Gravador de Áudio",
      "Agente Pessoal",
      "Microfone Direcional",
      "Pistola Leve (defesa)",
    ],
    pageRef: 56,
  },
  {
    id: "rockerboy",
    name: "Rockerboy",
    namePtBr: "Artista Rebelde",
    tagline: "Música como revolução. Palco como campo de batalha.",
    description:
      "Rockerboys são músicos, artistas e agitadores culturais. Em um mundo dominado por corporações, eles usam a arte como arma política. Johnny Silverhand foi o mais famoso de todos — provou que três acordes e a verdade podem abalar impérios.",
    abilityName: "Rocker",
    specialAbility:
      "Performances podem inspirar multidões, elevar moral ou incitar rebeliões. O nível da habilidade determina o tamanho da audiência afetada e a intensidade do efeito emocional e social.",
    keyStats: ["EMP", "COOL", "WILL"],
    typicalGear: [
      "Instrumento Musical",
      "Equipamento de Amplificação",
      "Gravador Portátil",
      "Roupas Icônicas",
      "Pistola (para quando o show acaba mal)",
    ],
    pageRef: 54,
  },
];
