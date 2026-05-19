import type { Skill } from "@/lib/types";

export const skills: Skill[] = [
  // Atletismo
  { name: "Athletics", namePtBr: "Atletismo", linkedStat: "DEX", category: "Físico", description: "Correr, saltar, nadar e escalar" },
  { name: "Contortionist", namePtBr: "Contorcionismo", linkedStat: "DEX", category: "Físico", description: "Escorregar de restrições e mover-se em espaços pequenos" },
  { name: "Dance", namePtBr: "Dança", linkedStat: "DEX", category: "Físico", description: "Executar danças formais e de rua" },
  { name: "Endurance", namePtBr: "Resistência", linkedStat: "WILL", category: "Físico", description: "Aguentar dor, frio, calor e fadiga extrema" },
  { name: "Resist Torture/Drugs", namePtBr: "Resistir Tortura/Drogas", linkedStat: "WILL", category: "Físico", description: "Manter o controle sob pressão extrema" },
  { name: "Stealth", namePtBr: "Furtividade", linkedStat: "DEX", category: "Físico", description: "Mover-se sem ser detectado" },
  // Combate
  { name: "Brawling", namePtBr: "Briga", linkedStat: "DEX", category: "Combate", description: "Soco, chute, luta livre e defesa pessoal" },
  { name: "Evasion", namePtBr: "Evasão", linkedStat: "DEX", category: "Combate", description: "Esquivar de ataques físicos" },
  { name: "Martial Arts", namePtBr: "Artes Marciais", linkedStat: "DEX", category: "Combate", description: "Estilo de luta específico com técnicas avançadas" },
  { name: "Melee Weapon", namePtBr: "Arma de Melee", linkedStat: "DEX", category: "Combate", description: "Usar efetivamente armas de combate corpo a corpo" },
  // Armas de Fogo
  { name: "Autofire", namePtBr: "Rajada Automática", linkedStat: "REF", category: "Armas", description: "Disparar em modo automático" },
  { name: "Handgun", namePtBr: "Pistola", linkedStat: "REF", category: "Armas", description: "Pistolas e revólveres" },
  { name: "Heavy Weapons", namePtBr: "Armas Pesadas", linkedStat: "REF", category: "Armas", description: "Metralhadoras, lançadores e armas de grande porte" },
  { name: "Shoulder Arms", namePtBr: "Armas de Ombro", linkedStat: "REF", category: "Armas", description: "Rifles, escopetas e submetralhadoras" },
  // Veículos
  { name: "Air Vehicle", namePtBr: "Veículo Aéreo", linkedStat: "REF", category: "Veículos", description: "Aerodynes, helicópteros e similares" },
  { name: "Land Vehicle", namePtBr: "Veículo Terrestre", linkedStat: "REF", category: "Veículos", description: "Carros, motos e outros veículos terrestres" },
  { name: "Sea Vehicle", namePtBr: "Veículo Aquático", linkedStat: "REF", category: "Veículos", description: "Barcos e embarcações" },
  // Técnico
  { name: "Basic Tech", namePtBr: "Técnica Básica", linkedStat: "TECH", category: "Tecnologia", description: "Reparar e entender tecnologia do dia-a-dia" },
  { name: "Cybertech", namePtBr: "Cibertecnologia", linkedStat: "TECH", category: "Tecnologia", description: "Instalar, reparar e modificar cyberware" },
  { name: "Electronics/Security Tech", namePtBr: "Eletrônica/Tecnologia de Segurança", linkedStat: "TECH", category: "Tecnologia", description: "Sistemas eletrônicos e de segurança" },
  { name: "First Aid", namePtBr: "Primeiros Socorros", linkedStat: "TECH", category: "Tecnologia", description: "Estabilizar feridos e tratar lesões básicas" },
  { name: "Forgery", namePtBr: "Falsificação", linkedStat: "TECH", category: "Tecnologia", description: "Criar documentos e itens falsificados" },
  { name: "Weaponstech", namePtBr: "Tecnologia de Armas", linkedStat: "TECH", category: "Tecnologia", description: "Modificar, reparar e criar armas" },
  // Social
  { name: "Bribery", namePtBr: "Suborno", linkedStat: "COOL", category: "Social", description: "Usar dinheiro para conseguir cooperação" },
  { name: "Conversation", namePtBr: "Conversação", linkedStat: "EMP", category: "Social", description: "Conversa casual e coleta de informações" },
  { name: "Human Perception", namePtBr: "Percepção Humana", linkedStat: "EMP", category: "Social", description: "Detectar mentiras e intenções ocultas" },
  { name: "Interrogation", namePtBr: "Interrogação", linkedStat: "COOL", category: "Social", description: "Extrair informações sob pressão" },
  { name: "Persuasion", namePtBr: "Persuasão", linkedStat: "COOL", category: "Social", description: "Convencer, seduzir ou negociar" },
  { name: "Streetwise", namePtBr: "Malícia de Rua", linkedStat: "COOL", category: "Social", description: "Navegar pelo submundo e obter informações da rua" },
  { name: "Trading", namePtBr: "Comércio", linkedStat: "COOL", category: "Social", description: "Negociar preços e fazer bons negócios" },
  // Conhecimento
  { name: "Accounting", namePtBr: "Contabilidade", linkedStat: "INT", category: "Conhecimento", description: "Finanças, orçamentos e rastros de dinheiro" },
  { name: "Bureaucracy", namePtBr: "Burocracia", linkedStat: "INT", category: "Conhecimento", description: "Navegar sistemas governamentais e corporativos" },
  { name: "Business", namePtBr: "Negócios", linkedStat: "INT", category: "Conhecimento", description: "Operações comerciais e empreendedorismo" },
  { name: "Criminology", namePtBr: "Criminologia", linkedStat: "INT", category: "Conhecimento", description: "Entender comportamento criminal e investigação" },
  { name: "Deduction", namePtBr: "Dedução", linkedStat: "INT", category: "Conhecimento", description: "Conectar pistas e resolver problemas lógicos" },
  { name: "Education", namePtBr: "Educação", linkedStat: "INT", category: "Conhecimento", description: "Conhecimento acadêmico geral" },
  { name: "Language", namePtBr: "Idioma", linkedStat: "INT", category: "Conhecimento", description: "Falar e escrever em línguas estrangeiras" },
  { name: "Local Expert", namePtBr: "Especialista Local", linkedStat: "INT", category: "Conhecimento", description: "Conhecimento profundo de uma área ou comunidade específica" },
  { name: "Science", namePtBr: "Ciência", linkedStat: "INT", category: "Conhecimento", description: "Disciplina científica específica" },
  // Percepção
  { name: "Concentration", namePtBr: "Concentração", linkedStat: "WILL", category: "Percepção", description: "Manter o foco sob pressão" },
  { name: "Lip Reading", namePtBr: "Leitura Labial", linkedStat: "INT", category: "Percepção", description: "Entender conversas à distância" },
  { name: "Perception", namePtBr: "Percepção", linkedStat: "INT", category: "Percepção", description: "Notar detalhes, ameaças e itens escondidos" },
  { name: "Tracking", namePtBr: "Rastreamento", linkedStat: "INT", category: "Percepção", description: "Seguir rastros e localizar alvos" },
  // Performance
  { name: "Acting", namePtBr: "Atuação", linkedStat: "COOL", category: "Performance", description: "Interpretar personagens e enganar audiências" },
  { name: "Play Instrument", namePtBr: "Tocar Instrumento", linkedStat: "TECH", category: "Performance", description: "Tocar um instrumento musical" },
];
