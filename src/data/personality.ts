// Personality / Lifepath tables from Cyberpunk RED p.47-52
// "Tales from the Street" — each table uses 1d10 (roll or choose)
// Note: "How Do You Feel About People?" has two "neutral" results in the book (rolls 1 and 2).
// Wording was differentiated to avoid exact duplicates in the UI.

export interface PersonalityTable {
  id: string;
  title: string;
  subtitle: string;
  options: string[]; // index 0 = roll 1, index 9 = roll 10
}

// ─── Temperamento ─────────────────────────────────────────────────────────────

export const personalityTraits: PersonalityTable = {
  id: "personality",
  title: "Como Você É?",
  subtitle:
    "O temperamento básico do seu personagem — como ele age com outras pessoas no dia a dia.",
  options: [
    "Tímido/a e reservado/a",
    "Rebelde, antissocial e violento/a",
    "Arrogante, orgulhoso/a e distante",
    "Temperamental, impulsivo/a e teimoso/a",
    "Exigente, fussiento/a e nervoso/a",
    "Estável e sério/a",
    "Bobo/a e cabeça de vento",
    "Sorrateiro/a e manipulador/a",
    "Intelectual e frio/a",
    "Amigável e extrovertido/a",
  ],
};

// ─── Estilo Visual ────────────────────────────────────────────────────────────

export const clothingStyles: PersonalityTable = {
  id: "clothing",
  title: "Estilo de Roupa",
  subtitle:
    "Em Night City, o que você veste é quem você é. Seu estilo define como as pessoas te tratam.",
  options: [
    "Generic Chic — padrão, colorido, modular",
    "Leisurewear — confortável, ágil, atlético",
    "Urban Flash — chamativo, tecnológico, streetwear",
    "Businesswear — liderança, presença, autoridade",
    "High Fashion — exclusivo, de grife, haute couture",
    "Bohemian — folksy, retrô, espírito livre",
    "Bag Lady Chic — surrado, vagabundo, catação intencional",
    "Gang Colors — perigoso, violento, rebelde",
    "Nomad Leathers — rústico, ocidental, tribal",
    "Asia Pop — vibrante, fantasiado, jovial",
  ],
};

export const hairstyles: PersonalityTable = {
  id: "hairstyle",
  title: "Cabelo",
  subtitle:
    "Cada penteado em Night City é uma declaração de identidade ou posição.",
  options: [
    "Moicano",
    "Comprido e maltratado",
    "Curto e espetado",
    "Selvagem e despenteado",
    "Careca",
    "Com listras coloridas",
    "Cores loucas",
    "Curto e arrumado",
    "Curto e encaracolado",
    "Comprido e liso",
  ],
};

export const affectations: PersonalityTable = {
  id: "affectation",
  title: "Você Nunca Fica Sem...",
  subtitle:
    "Uma marca pessoal permanente — algo que te define e que nunca falta em nenhuma situação.",
  options: [
    "Tatuagens",
    "Óculos espelhados (mirrorshades)",
    "Cicatrizes rituais",
    "Luvas com espinhos",
    "Piercing no nariz",
    "Piercing na língua ou em outro lugar inusitado",
    "Implantes nas unhas de design estranho",
    "Botas ou saltos pontiagudos",
    "Luvas sem dedos",
    "Lentes de contato exóticas",
  ],
};

// ─── Valores e Visão de Mundo ─────────────────────────────────────────────────

export const coreValues: PersonalityTable = {
  id: "value-most",
  title: "O Que Você Mais Valoriza?",
  subtitle:
    "O pilar moral — o que o personagem nunca abre mão, mesmo na pior situação.",
  options: [
    "Dinheiro",
    "Honra",
    "Sua palavra (nunca quebra promessas)",
    "Honestidade",
    "Conhecimento",
    "Vingança",
    "Amor",
    "Poder",
    "Família",
    "Amizade",
  ],
};

// Note: book has "I stay neutral" for both rolls 1 and 2 (intentional).
// Differentiated here to avoid exact duplicates in the UI.
export const peoplePhilosophy: PersonalityTable = {
  id: "people-philosophy",
  title: "Como Você Vê as Pessoas?",
  subtitle:
    "A filosofia sobre a natureza humana — condiciona cada interação social do personagem.",
  options: [
    "Fico neutro/a. As pessoas são o que são.",
    "Fico neutro/a. As pessoas são o que são.",
    "Gosto de quase todo mundo.",
    "Odeio quase todo mundo.",
    "Pessoas são ferramentas. Use para seus objetivos e descarte.",
    "Cada pessoa tem valor único e insubstituível.",
    "Pessoas são obstáculos. Se cruzarem meu caminho, serão destruídas.",
    "Pessoas não são confiáveis. Não dependa de ninguém.",
    "Que se explodam todos — que as baratas tomem conta.",
    "Pessoas são maravilhosas!",
  ],
};

export const valuedPerson: PersonalityTable = {
  id: "valued-person",
  title: "A Pessoa Mais Importante da Sua Vida",
  subtitle:
    "Alguém pelo qual arriscaria tudo — ou que já perdeu e nunca esqueceu.",
  options: [
    "Um dos seus pais",
    "Um irmão ou irmã",
    "Um/a amante",
    "Um/a amigo/a",
    "Você mesmo/a",
    "Um animal de estimação",
    "Um professor ou mentor",
    "Uma figura pública",
    "Um herói pessoal",
    "Ninguém",
  ],
};

export const valuedPossession: PersonalityTable = {
  id: "valued-possession",
  title: "Seu Objeto Mais Precioso",
  subtitle:
    "O que salvaria primeiro em uma emergência — acima de qualquer outra posse.",
  options: [
    "Uma arma",
    "Uma ferramenta",
    "Uma peça de roupa",
    "Uma fotografia",
    "Um livro ou diário",
    "Uma gravação de áudio ou vídeo",
    "Um instrumento musical",
    "Uma joia ou ornamento",
    "Um brinquedo",
    "Uma carta ou mensagem",
  ],
};

// ─── Histórico Familiar ───────────────────────────────────────────────────────

export const familyBackground: PersonalityTable = {
  id: "family-background",
  title: "Origem Familiar",
  subtitle:
    "Quem eram seus pais e qual era sua classe social. Moldou seus instintos, hábitos e o que considera 'normal'.",
  options: [
    "Executivos Corporativos — riqueza, poder, segurança privada. Escola de elite. Tudo de melhor desde o nascimento.",
    "Gerentes Corporativos — classe alta, casas grandes, vizinhança segura, às vezes com empregados. Mix de escola privada e corporativa.",
    "Técnicos Corporativos — classe média confortável, apartamento suburbano corporativo, escola técnica. Como os anos 50 cruzados com 1984.",
    "Bando Nômade — trailers, kombis e estradas. Aprendeu a dirigir e lutar cedo, mas a família sempre esteve lá. Comida fresca e farta. Ensino em casa.",
    "Família de Gangue — violência, fome e medo em qualquer prédio que a gangue tomava. Provável que não saiba quem são seus pais. A gangue ensinou: brigar, matar e roubar.",
    "Moradores da Zona de Combate — prédio fortemente barricado na Zona. Fome às vezes, mas regularmente uma cama e uma refeição. Ensino em casa.",
    "Sem-teto Urbano — carros, lixeiras ou módulos de embarque abandonados. Fome, frio e medo constantes. Escola da vida dura — a única que importa.",
    "Ratos de Megastrutura — microapartamento em um megaedifício pós-guerra. Comida kibble e scop, cama quase sempre. Escola improvisada por moradores mais instruídos.",
    "Pioneiros Reclaimers — saíram das estradas para reconstruir cidades fantasmas abandonadas. Vida de fronteira: perigosa, mas com comida simples e teto. Ensino em casa.",
    "Edgerunners — o lar mudava com o job dos pais. Um mês num apartamento de luxo, no outro num contêiner de lixo em fuga. Comida variava de gourmet a kibble.",
  ],
};

export const childhoodEnvironment: PersonalityTable = {
  id: "childhood-env",
  title: "Onde Você Cresceu?",
  subtitle:
    "O ambiente físico e social da infância — moldou reflexos, instintos e sua visão de mundo.",
  options: [
    "Nas ruas, sem supervisão de adultos",
    "Na Zona Corporativa segura, isolado do mundo real",
    "Em um bando nômade errante pelas estradas",
    "Em bando nômade com base em transporte (navios, aviões, caravanas)",
    "Em bairro antes nobre, agora em decadência, mantendo os boosters afastados",
    "No coração da Zona de Combate, em prédio ocupado ou ruína",
    "Em um megaedifício controlado por uma Corp ou pela Cidade",
    "Nas ruínas de uma cidade abandonada, reconstruída por Reclaimers",
    "Em uma Nação Flutuante (cidade offshore) — ponto de encontro de culturas do mundo todo",
    "Em um luxuoso arranha-céu corporativo (starscraper), bem acima da ralé comum",
  ],
};

export const familyCrisis: PersonalityTable = {
  id: "family-crisis",
  title: "Tragédia Familiar",
  subtitle:
    "O mundo ainda se recupera de uma guerra. Algo aconteceu com sua família — e isso marcou você para sempre.",
  options: [
    "Sua família perdeu tudo por traição.",
    "Sua família perdeu tudo por má administração.",
    "Sua família foi exilada ou expulsa de seu lar, nação ou corporação.",
    "Sua família está presa. Você foi o/a único/a a escapar.",
    "Sua família desapareceu. Você é o/a único/a membro restante.",
    "Sua família foi morta. Você foi o/a único/a sobrevivente.",
    "Sua família está envolvida em uma conspiração ou organização de longa data — crime organizado, grupo revolucionário ou algo pior.",
    "Sua família foi dispersada e separada pelos ventos do infortúnio.",
    "Sua família carrega uma vingança hereditária que dura gerações.",
    "Você herdou uma dívida familiar. Precisa honrá-la antes de seguir em frente com sua vida.",
  ],
};

// ─── Amigos ───────────────────────────────────────────────────────────────────
// Roll 1d10 − 7 (minimum 0) → number of friends (0, 1, 2 or 3)
// Then roll once on this table for EACH friend.

export const friendRelationships: PersonalityTable = {
  id: "friend-relationship",
  title: "Relação com o Amigo",
  subtitle: "Role 1d10 para cada amigo — o tipo de vínculo que une vocês.",
  options: [
    "Como um irmão/irmã mais velho/a para você",
    "Como um irmão/irmã mais novo/a para você",
    "Um professor ou mentor",
    "Um parceiro/a ou colega de trabalho",
    "Um ex-amante",
    "Um antigo inimigo que virou aliado",
    "Como um pai/mãe para você",
    "Um amigo/a de infância",
    "Alguém que você conheceu nas ruas",
    "Alguém com interesse ou objetivo em comum",
  ],
};

// ─── Inimigos ─────────────────────────────────────────────────────────────────
// Roll 1d10 − 7 (minimum 0) → number of enemies (0, 1, 2 or 3)
// For each enemy, roll on each of the four tables below.

export const enemyWho: PersonalityTable = {
  id: "enemy-who",
  title: "Quem é o Inimigo?",
  subtitle: "O tipo de pessoa que você ofendeu — ou que te ofendeu.",
  options: [
    "Ex-amigo/a",
    "Ex-amante",
    "Parente alienado",
    "Inimigo/a de infância",
    "Alguém que trabalha para você",
    "Alguém para quem você trabalha",
    "Parceiro/a ou colega de trabalho",
    "Executivo/a corporativo/a",
    "Autoridade governamental",
    "Membro de gangue booster",
  ],
};

export const enemyCause: PersonalityTable = {
  id: "enemy-cause",
  title: "O Que Causou a Inimizade?",
  subtitle: "O motivo da rixa — o que aconteceu entre vocês.",
  options: [
    "Fez o outro perder prestígio ou status.",
    "Causou a perda de um amante, amigo/a ou parente.",
    "Causou uma grande humilhação pública.",
    "Acusou o outro de covardia ou de um defeito moral sério.",
    "Traiu ou abandonou o outro em momento crítico.",
    "Recusou oferta de emprego ou envolvimento romântico.",
    "Simplesmente não se suportam.",
    "Um foi rival romântico do outro.",
    "Um foi rival nos negócios.",
    "Um incriminou o outro por um crime que não cometeu.",
  ],
};

export const enemyPower: PersonalityTable = {
  id: "enemy-power",
  title: "O Que Podem Te Fazer?",
  subtitle: "Os recursos que esse inimigo pode mobilizar contra você.",
  options: [
    "Apenas eles mesmos — e nem se esforçariam muito.",
    "Apenas eles mesmos.",
    "Eles mesmos e um amigo próximo.",
    "Eles mesmos e alguns (1d6÷2) amigos.",
    "Eles mesmos e alguns (1d10÷2) amigos.",
    "Uma gangue inteira (no mínimo 1d10+5 pessoas).",
    "A polícia local ou outros Lawmen.",
    "Um chefe de gangue poderoso ou pequena corporação.",
    "Uma corporação poderosa.",
    "Uma cidade, governo ou agência inteira.",
  ],
};

export const enemyRevenge: PersonalityTable = {
  id: "enemy-revenge",
  title: "O Que Farão Quando Te Encontrarem?",
  subtitle:
    "A vingança que planejam — o que acontece quando os caminhos de vocês se cruzam.",
  options: [
    "Evitar você completamente.",
    "Evitar você completamente.",
    "Entrar em fúria assassina e tentar te destruir fisicamente.",
    "Entrar em fúria assassina e tentar te destruir fisicamente.",
    "Sabotar você indiretamente pelas sombras.",
    "Sabotar você indiretamente pelas sombras.",
    "Atacar você verbalmente — danos à reputação.",
    "Atacar você verbalmente — danos à reputação.",
    "Te incriminar por um crime que você não cometeu.",
    "Planejar te matar ou mutilar.",
  ],
};

export const lifeGoals: PersonalityTable = {
  id: "life-goals",
  title: "Objetivo de Vida",
  subtitle: "O que seu personagem mais quer alcançar — a força que o mantém em pé.",
  options: [
    "Livrar-se de uma má reputação.",
    "Ganhar poder e controle.",
    "Sair das ruas, custe o que custar.",
    "Causar dor e sofrimento a quem te cruzar no caminho.",
    "Superar seu passado e tentar esquecer tudo.",
    "Caçar os responsáveis pela sua vida miserável e fazê-los pagar.",
    "Recuperar o que é seu por direito.",
    "Salvar, se possível, alguém ligado ao seu histórico — um amante, um familiar.",
    "Conquistar fama e reconhecimento.",
    "Ser temido/a e respeitado/a.",
  ],
};

export const tragicLoveEndings: PersonalityTable = {
  id: "tragic-love",
  title: "Como Terminou?",
  subtitle: "O desfecho do relacionamento — o que rompeu o coração do personagem.",
  options: [
    "Seu/Sua amante morreu em um acidente.",
    "Seu/Sua amante desapareceu misteriosamente.",
    "Simplesmente não funcionou.",
    "Um objetivo pessoal ou vingança se interpôs entre vocês.",
    "Seu/Sua amante foi sequestrado/a.",
    "Seu/Sua amante enlouqueceu ou virou ciberpsicótico/a.",
    "Seu/Sua amante cometeu suicídio.",
    "Seu/Sua amante foi morto/a em uma briga.",
    "Um rival te tirou de cena.",
    "Seu/Sua amante está preso/a ou exilado/a.",
  ],
};

// All tables in presentation order (for "rolar tudo" — excludes friend/enemy/tragic-love tables)
export const allPersonalityTables: PersonalityTable[] = [
  personalityTraits,
  clothingStyles,
  hairstyles,
  affectations,
  coreValues,
  peoplePhilosophy,
  valuedPerson,
  valuedPossession,
  familyBackground,
  childhoodEnvironment,
  familyCrisis,
  lifeGoals,
];
