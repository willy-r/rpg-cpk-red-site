import type { District } from "@/lib/types";

export const districts: District[] = [
  {
    name: "Corporate Center",
    namePtBr: "Centro Corporativo",
    type: "corporate",
    description:
      "Fortalezas das megacorporações — arranha-céus blindados onde as regras são feitas. Segurança máxima, acesso restrito. O coração frio do poder em Night City.",
    safetyLevel: 5,
    notableLocations: ["Torres Arasaka", "Sede da Militech", "Centro de Negócios Petrochem"],
  },
  {
    name: "City Center",
    namePtBr: "Centro da Cidade",
    type: "corporate",
    description:
      "Hub governamental e corporativo central. Onde políticos e executivos fazem seus negócios sujos em salas de reunião de luxo.",
    safetyLevel: 4,
    notableLocations: ["Prefeitura de Night City", "Tribunal Municipal", "Plazas Corporativas"],
  },
  {
    name: "Japantown",
    namePtBr: "Cidade Japonesa",
    type: "entertainment",
    description:
      "Bairro cultural japonês com restaurantes, lojas de eletrônicos e clubes. Forte presença da Yakuza. Neons em kanji iluminam a noite.",
    safetyLevel: 3,
    notableLocations: ["Mercado de Eletrônicos Kabukicho", "Restaurante Konpeki Plaza", "Dojo Shinji"],
  },
  {
    name: "Little China",
    namePtBr: "Pequena China",
    type: "residential",
    description:
      "Chinatown com comida autêntica, curandeiros tradicionais e mercados de segunda mão. A Tríade tem grande influência aqui.",
    safetyLevel: 2,
    notableLocations: ["Mercado Noturno da Dragon Street", "Templo Budista", "Clínica Dr. Chen"],
  },
  {
    name: "Watson",
    namePtBr: "Watson",
    type: "combat-zone",
    description:
      "Bairro industrial decadente, outrora próspero. Gangues controlam o território. Barato para viver, caro para sobreviver.",
    safetyLevel: 1,
    notableLocations: ["Megaedifício H4", "Kabuki Market", "Zona de Influência Maelstrom"],
  },
  {
    name: "Heywood",
    namePtBr: "Heywood",
    type: "residential",
    description:
      "Bairro residencial com setor industrial leve. Mistura de famílias trabalhadoras e gangues locais. Os Valentinos têm forte presença.",
    safetyLevel: 2,
    notableLocations: ["Estação de Pesquisa Biotechnica", "Parque Memorial", "Território Valentinos"],
  },
  {
    name: "Pacifica",
    namePtBr: "Pacífica",
    type: "combat-zone",
    description:
      "Ex-resort de praia abandonado pelas corporações. Agora zona de combate controlada pelos Animais e outros grupos. Playland by the Sea em ruínas.",
    safetyLevel: 1,
    notableLocations: ["Playland by the Sea (ruínas)", "Grand Imperial Mall (ocupado)", "Fortim dos Animais"],
  },
  {
    name: "Westbrook",
    namePtBr: "Westbrook",
    type: "entertainment",
    description:
      "Território dos ricos e poderosos. Entretenimento de luxo, moda de alta costura e apartamentos que custam mais que a vida de um edgerunner.",
    safetyLevel: 4,
    notableLocations: ["Japantown (polo fashion)", "North Oak (villas privadas)", "Charter Hill Casino"],
  },
  {
    name: "Santo Domingo",
    namePtBr: "Santo Domingo",
    type: "industrial",
    description:
      "Distrito industrial pesado. Usinas de energia, fábricas automatizadas e trabalhadores que mal ganham para sobreviver.",
    safetyLevel: 2,
    notableLocations: ["Planta de Energia Dynergy", "Complexo Industrial Arroyo", "Favelas Rodillers"],
  },
  {
    name: "Rancho Coronado",
    namePtBr: "Rancho Coronado",
    type: "residential",
    description:
      "Subúrbio corporativo estéril — 'ultimate beaverville'. Casas padronizadas, vigilância 24h e moradores que fingem que o mundo lá fora não existe.",
    safetyLevel: 4,
    notableLocations: ["Centro Comercial RC", "Escola Corporativa Arasaka", "Campo de Golf Privado"],
  },
  {
    name: "North Oak",
    namePtBr: "North Oak",
    type: "residential",
    description:
      "Cidade militar — Base Militar NorCal adjacente ao bairro. Área residencial de militares e contratados de defesa.",
    safetyLevel: 4,
    notableLocations: ["Base Militar NorCal", "Memorial de Guerra", "Bares de Veteranos"],
  },
  {
    name: "Med Center",
    namePtBr: "Centro Médico",
    type: "corporate",
    description:
      "Distrito médico da cidade. Sede da Trauma Team e dos melhores (e mais caros) hospitais. Se você pode pagar, eles podem consertar.",
    safetyLevel: 5,
    notableLocations: ["QG da Trauma Team", "Hospital Gentek", "Clínicas de Cyberware"],
  },
];
