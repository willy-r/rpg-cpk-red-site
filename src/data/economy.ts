import type { EconomyItem, LifestyleTier } from "@/lib/types";

export const lifestyleTiers: LifestyleTier[] = [
  {
    name: "Kibble",
    costPerMonth: 0,
    description: "Subsistência nas ruas. Comida de qualidade zero, sem moradia fixa.",
    includes: [
      "Rações de combate processadas",
      "Abrigo improvisado",
      "Sem serviços médicos",
      "Roupas de catação",
    ],
  },
  {
    name: "Rua",
    costPerMonth: 500,
    description: "A vida do Edgerunner iniciante. Cubículo compartilhado, comida básica.",
    includes: [
      "Cubículo ou quarto compartilhado",
      "Comida processada básica",
      "Acesso a clínicas de rua",
      "Roupas genéricas",
    ],
  },
  {
    name: "Aluguel",
    costPerMonth: 1000,
    description: "Estabilidade mínima. Apartamento próprio, refeições decentes.",
    includes: [
      "Apartamento individual",
      "Comida fresca ocasional",
      "Plano de saúde básico",
      "Roupas funcionais",
    ],
  },
  {
    name: "Corporativo",
    costPerMonth: 3000,
    description: "Conforto corporativo. Segurança, serviços e aparências mantidas.",
    includes: [
      "Apartamento de qualidade em área segura",
      "Alimentação variada e de qualidade",
      "Seguro médico completo",
      "Guarda-roupa profissional",
      "Acesso a entretenimento premium",
    ],
  },
];

export const commonGear: EconomyItem[] = [
  // Comunicação
  {
    name: "Personal Agent",
    namePtBr: "Agente Pessoal",
    category: "comunicação",
    cost: 100,
    notes: "IA smartphone — indispensável em Night City",
  },
  {
    name: "Disposable Phone",
    namePtBr: "Telefone Descartável",
    category: "comunicação",
    cost: 50,
    notes: "Para operações que exigem anonimato",
  },
  {
    name: "Radio Communicator",
    namePtBr: "Comunicador de Rádio",
    category: "comunicação",
    cost: 100,
    notes: "Alcance de 1,5km — criptografado",
  },
  // Tecnologia
  {
    name: "Cyberdeck",
    namePtBr: "Cyberdeck",
    category: "tecnologia",
    cost: 500,
    notes: "7 slots de programa — essencial para Netrunners",
  },
  {
    name: "Computer (Laptop)",
    namePtBr: "Computador (Laptop)",
    category: "tecnologia",
    cost: 50,
  },
  {
    name: "Techtool",
    namePtBr: "Ferramenta Multifuncional",
    category: "tecnologia",
    cost: 100,
    notes: "Kit completo de reparo para Techs",
  },
  {
    name: "Tech Bag",
    namePtBr: "Mala de Ferramentas",
    category: "tecnologia",
    cost: 500,
    notes: "Kit profissional completo",
  },
  // Vigilância
  {
    name: "Video Camera",
    namePtBr: "Câmera de Vídeo",
    category: "vigilância",
    cost: 100,
    notes: "12 horas de gravação",
  },
  {
    name: "Audio Recorder",
    namePtBr: "Gravador de Áudio",
    category: "vigilância",
    cost: 100,
    notes: "24 horas de gravação",
  },
  {
    name: "Bug Detector",
    namePtBr: "Detector de Microfones",
    category: "vigilância",
    cost: 500,
    notes: "Raio de 2m",
  },
  {
    name: "Binoculars",
    namePtBr: "Binóculos",
    category: "vigilância",
    cost: 50,
  },
  {
    name: "Homing Tracer",
    namePtBr: "Rastreador",
    category: "vigilância",
    cost: 500,
    notes: "Raio de 1,5km",
  },
  // Médico
  {
    name: "Medtech Bag",
    namePtBr: "Mala Médica",
    category: "médico",
    cost: 100,
    notes: "Kit básico de primeiros socorros",
  },
  {
    name: "Medscanner",
    namePtBr: "Scanner Médico",
    category: "médico",
    cost: 1000,
    notes: "+2 em rolagens de Primeiros Socorros",
  },
  // Utilidade
  {
    name: "Grapple Gun",
    namePtBr: "Gancho de Escalar",
    category: "utilidade",
    cost: 100,
    notes: "30m de corda",
  },
  {
    name: "Lock Pick Set",
    namePtBr: "Kit de Arrombamento",
    category: "utilidade",
    cost: 20,
  },
  {
    name: "Duct Tape",
    namePtBr: "Fita Adesiva",
    category: "utilidade",
    cost: 20,
    notes: "A ferramenta universal",
  },
  {
    name: "Rope (60m)",
    namePtBr: "Corda (60m)",
    category: "utilidade",
    cost: 20,
  },
  {
    name: "Flashlight",
    namePtBr: "Lanterna",
    category: "utilidade",
    cost: 20,
    notes: "Feixe de 100m, 10 horas de bateria",
  },
];

export const fashionStyles: EconomyItem[] = [
  {
    name: "Bag Lady Chic",
    namePtBr: "Vagabundo Chic",
    category: "moda",
    cost: 20,
    notes: "Roupas de catação — estilo sem-teto intencional",
  },
  {
    name: "Gang Colors",
    namePtBr: "Cores de Gangue",
    category: "moda",
    cost: 50,
    notes: "Afiliação de gangue — pode ser perigoso fora do território",
  },
  {
    name: "Generic Chic",
    namePtBr: "Básico Genérico",
    category: "moda",
    cost: 50,
    notes: "Padrão sem personalidade — passa despercebido",
  },
  {
    name: "Nomad Leathers",
    namePtBr: "Couro Nômade",
    category: "moda",
    cost: 100,
    notes: "Robusto, funcional, intimidador nas estradas",
  },
  {
    name: "Asia Pop",
    namePtBr: "Estilo Pop Asiático",
    category: "moda",
    cost: 100,
    notes: "Cores vibrantes, influência japonesa e coreana",
  },
  {
    name: "Urban Flash",
    namePtBr: "Flash Urbano",
    category: "moda",
    cost: 100,
    notes: "Tecnológico e chamativo — o visual padrão dos Edgerunners",
  },
  {
    name: "Businesswear",
    namePtBr: "Visual Corporativo",
    category: "moda",
    cost: 500,
    notes: "Autoridade e discrição — abre portas corporativas",
  },
  {
    name: "High Fashion",
    namePtBr: "Alta Costura",
    category: "moda",
    cost: 5000,
    notes: "Designer, exclusivo, sinaliza riqueza extrema",
  },
];
