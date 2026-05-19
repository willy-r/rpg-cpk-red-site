import type { Corporation } from "@/lib/types";

export const corporations: Corporation[] = [
  {
    name: "Arasaka",
    focus: "Segurança Corporativa & Tecnologia Militar",
    description:
      "A megacorporação japonesa mais poderosa do mundo. Contratos de segurança em todas as cidades, assassinos de programas negros e o infame Soulkiller — software que aprisiona consciências digitalmente. Johnny Silverhand dedicou sua vida a destruí-la.",
    role: "O grande antagonista corporativo",
    keyFigures: ["Saburo Arasaka", "Yorinobu Arasaka", "Morgan Blackhand"],
    pageRef: 234,
  },
  {
    name: "Militech",
    focus: "Contratante Militar & Equipamentos de Guerra",
    description:
      "A maior empresa de equipamentos militares e forças paramilitares do mundo ocidental. Fornece exércitos privados para governos e corporações. Rival direta da Arasaka pelo domínio global.",
    role: "Poder militar do hemisfério ocidental",
    keyFigures: ["General Donald Lundee"],
    pageRef: 236,
  },
  {
    name: "Petrochem",
    focus: "Energia & Petroquímica",
    description:
      "Gigante da energia que controla os maiores recursos de hidrocarbonetos restantes. Co-fundadora de Night City com Richard Night. Responsável por parte significativa da poluição industrial da cidade.",
    role: "Parceiro fundador de Night City",
    pageRef: 238,
  },
  {
    name: "Biotechnica",
    focus: "Biotecnologia & Pesquisa Genética",
    description:
      "Corporação de biotech que pesquisa nos limites da vida humana. Opera estações de pesquisa em Heywood. Suas investigações em modificação genética e engenharia biológica preocupam até os padrões cyberpunk.",
    role: "Pesquisa biotecnológica avançada",
    pageRef: 240,
  },
  {
    name: "Zhirafa",
    focus: "Tecnologia Acessível & Robótica de Construção",
    description:
      "Fundada pelo ex-Edgerunner Artyom Sokolov, a Zhirafa criou o GRAF3 — robô de construção acessível que acelerou a reconstrução pós-guerra. Liderança excêntrica e casual, patrocina artistas radicais. Missão: tecnologia para as massas, não para os ricos.",
    role: "A corporação 'boa' — tecnologia para todos",
    keyFigures: ["Artyom Sokolov (fundador)"],
    pageRef: 243,
  },
  {
    name: "EBM",
    focus: "Armazenamento de Dados & Pesquisa de Sistemas",
    description:
      "Especialista em infraestrutura de dados e sistemas de armazenamento de grande escala. Menos agressiva militarmente, mas controla volumes imensos de informação corporativa e governamental.",
    role: "Infraestrutura de dados global",
    pageRef: 241,
  },
];
