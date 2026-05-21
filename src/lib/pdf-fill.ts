import { PDFDocument, TextAlignment } from 'pdf-lib';
import type { Role } from '@/lib/types';
import type { StatKey } from '@/lib/types';
import type { StreetratPackage, StreetratGearItem, StreetratCywarItem, CulturalOrigin } from '@/data/streetrat';

// Mirrors CharacterDraft from criar-personagem/page.tsx (not exported from there)
export interface CharacterDraft {
  name: string;
  roleId: string | null;
  culturalOriginId: string | null;
  selectedLanguage: string | null;
  personality: Record<string, string | null>;
  roleLifepath: Record<string, string | null>;
  templateIndex: number;
  friends: (string | null)[];
  enemies: { who: string | null; cause: string | null; power: string | null; revenge: string | null }[];
  tragicLoves: (string | null)[];
  gearChoices: Record<string, string>;
  cywarChoices: Record<string, string>;
}

// ── Stat field names ─────────────────────────────────────────────────────────
// FVO = Força de VOntade (WILL); TCO = likely BODY — verify on printed sheet
const STAT_FIELDS: Record<StatKey, string> = {
  INT:  'INT',
  REF:  'REF',
  DEX:  'DES',
  TECH: 'TEC',
  COOL: 'COOL',
  WILL: 'FVO',
  BODY: 'TCO',
  EMP:  'EMP',
  LUCK: 'SOR',
  MOVE: 'MOV',
};

// ── Personality table ID → PDF field ────────────────────────────────────────
const PERSONALITY_FIELDS: Record<string, string> = {
  personality:         'PERSONALIDADE',
  clothing:            'ESTILO DAS ROUPAS',
  hairstyle:           'ESTILO DO CABELO',
  affectation:         'MODA/ESTILO',
  'value-most':        'O QUE VOCÊ MAIS VALORIZA?',
  'people-philosophy': 'QUAL A SUA OPINIAO EM RELAÇÃO A MAIORIA DAS PESSOAS?',
  'valued-person':     'PESSOA QUE MAIS VALORIZA',
  'valued-possession': 'OBJETO QUE MAIS VALORIZA',
  'family-background': 'ANTECENDENTE FAMILIAR',
  'childhood-env':     'AMBIENTE DA SUA INFÂNCIA',
  'family-crisis':     'TRAGÉDIA FAMILIAR',
  'life-goals':        'OBJETIVO DE VIDA',
};

// ── Skill name → NVL slot number ────────────────────────────────────────────
// Derived from PyMuPDF field position extraction of CYBERPUNK_RED_FICHA_PREENCHÍVEL.pdf
const SKILL_SLOTS: Record<string, number> = {
  // ATENÇÃO
  'Concentração': 1,
  'Ocultar/Revelar Objeto': 2, 'Esconder/Revelar Objeto': 2,
  'Leitura Labial': 3,
  'Percepção': 4,
  'Rastrear': 5,
  // CORPORAIS
  'Atletismo': 6, 'Contorcionismo': 7, 'Dançar': 8,
  'Resistência': 9,
  'Resistência à Tortura/Drogas': 10, 'Resistir Tortura/Drogas': 10,
  'Furtividade': 11,
  // CONDUÇÃO
  'Dirigir Veículo Terrestre': 12, 'Dirigir': 12,
  'Pilotar Veículo Aéreo': 13,
  'Pilotar Veículo Marítimo': 14,
  'Motocicleta': 15,
  // EDUCAÇÃO
  'Contabilidade': 16, 'Lidar com Animais': 17, 'Burocracia': 18,
  'Negócios': 19, 'Composição': 20, 'Criminologia': 21, 'Criptografia': 22,
  'Dedução': 23, 'Educação': 24, 'Apostar': 25,
  'Idioma das Ruas': 26, 'Idioma Nativo': 27, 'Pesquisa em Biblioteca': 29,
  'Especialista Local': 30,
  'Ciência': 33, 'Estratégia': 35, 'Sobrevivência': 36,
  // LUTA
  'Briga': 37, 'Evasão': 38, 'Artes Marciais': 39,
  'Armas Brancas': 40,
  // PERFORMANCE
  'Atuação': 41, 'Tocar Instrumento': 42,
  // ARMAS
  'Arqueirismo': 44,
  'Automática': 45, 'Fogo Automático': 45,
  'Armas Curtas': 46,
  'Armas Pesadas': 47,
  'Fuzil': 48,
  // SOCIAL
  'Suborno': 49,
  'Oratória': 50, 'Conversação': 50,
  'Percepção Humana': 51,
  'Interrogatório': 52, 'Persuasão': 53,
  'Cuidados Pessoais': 54, 'Aparência Pessoal': 54,
  'Malandragem': 55, 'Malícia de Rua': 55,
  'Negociação': 56,
  'Roupa e Estilo': 57, 'Guarda-roupa & Estilo': 57,
  // TÉCNICA
  'Tecnologia de Veículos Aéreos': 58,
  'Tecnologia Básica': 59, 'Técnica Básica': 59,
  'Cibertecnologia': 60,
  'Demolições': 61,
  'Eletrônica/Seg. Tecnológica': 62, 'Eletrônica/Tec. de Segurança': 62,
  'Primeiros Socorros': 63,
  'Falsificação': 64,
  'Tecnologia de Veículo Terrestre': 65,
  'Pintar/Desenhar/Esculpir': 66,
  'Medicamentos': 67, 'Medicina': 67,
  'Fotografia e Filmagem': 68, 'Fotografar/Filmagem': 68,
  'Arrombamento': 69,
  'Furto': 70,
  'Tecnologia de Veículo Marítimo': 71,
  'Tecnologia de Armas/Armeiro': 72, 'Tecnologia de Armas': 72,
};

// Linked stat for each NVL slot (used to compute BASE = stat + rank)
const SLOT_STATS: Record<number, StatKey> = {
  1:'WILL', 2:'INT', 3:'INT', 4:'INT', 5:'INT',
  6:'DEX', 7:'DEX', 8:'DEX', 9:'WILL', 10:'WILL', 11:'DEX',
  12:'REF', 13:'REF', 14:'REF', 15:'REF',
  16:'INT', 17:'INT', 18:'INT', 19:'INT', 20:'INT',
  21:'INT', 22:'INT', 23:'INT', 24:'INT', 25:'INT',
  26:'INT', 27:'INT', 28:'INT', 29:'INT', 30:'INT',
  31:'INT', 32:'INT', 33:'INT', 34:'INT', 35:'INT', 36:'INT',
  37:'DEX', 38:'DEX', 39:'DEX', 40:'DEX',
  41:'COOL', 42:'TECH', 43:'TECH',
  44:'REF', 45:'REF', 46:'REF', 47:'REF', 48:'REF',
  49:'COOL', 50:'EMP', 51:'EMP', 52:'COOL', 53:'COOL',
  54:'COOL', 55:'COOL', 56:'COOL', 57:'COOL',
  58:'TECH', 59:'TECH', 60:'TECH', 61:'TECH', 62:'TECH',
  63:'TECH', 64:'TECH', 65:'TECH', 66:'TECH', 67:'TECH',
  68:'TECH', 69:'TECH', 70:'TECH', 71:'TECH', 72:'TECH',
};

// ── Cyberware category detection ────────────────────────────────────────────
const CYWAR_MAX: Record<string, number> = {
  'EQUIPAMENTO NEURAL': 5, 'CIBERÁUDIO': 3, 'CIBERÓPTICO': 3,
  'CIBERMODA': 7, 'CYBERWARE INTERNO': 7, 'CYBERWARE EXTERNO': 7,
};

function cywarCategory(name: string): string {
  const n = name.toLowerCase();
  if (['neural link','interface plugs','sandevistan','kerenzikov'].some(x => n.includes(x)))
    return 'EQUIPAMENTO NEURAL';
  if (['cyberaudio','audio recorder','amplified hearing','voice stress','shift tact'].some(x => n.includes(x)))
    return 'CIBERÁUDIO';
  if (['cybereye','microoptics','teleoptics','anti-dazzle'].some(x => n.includes(x)))
    return 'CIBERÓPTICO';
  if (['chemskin','techhair','light tattoo','skinwatch'].some(x => n.includes(x)))
    return 'CIBERMODA';
  if (['hidden holster','wolvers'].some(x => n.includes(x)))
    return 'CYBERWARE EXTERNO';
  return 'CYBERWARE INTERNO';
}

// ── Weapon helpers ───────────────────────────────────────────────────────────
type WeaponKind = 'rifle' | 'vh-pistol' | 'heavy-pistol' | 'pistol' | 'smg' | 'melee' | 'shield';

function weaponKind(name: string): WeaponKind {
  const n = name.toLowerCase();
  if (n.includes('escudo')) return 'shield';
  if (['melee','branca','faca','wolver','garras'].some(x => n.includes(x))) return 'melee';
  // Long-range / heavy ranged weapons — must be before pistol/heavy-pistol checks
  if (['rifle','fuzil','escopeta','sniper','carabina','lançador'].some(x => n.includes(x))) return 'rifle';
  if (n.includes('muito pesada') || n.includes('very heavy')) return 'vh-pistol';
  if (n.includes('smg') || n.includes('submetralhadora')) return 'smg';
  // "pesada" without "muito" = heavy pistol (or generic heavy weapon → treated as heavy-pistol for ammo)
  if (n.includes('pesada') || n.includes('pesado') || n.includes('heavy')) return 'heavy-pistol';
  return 'pistol';
}

function weaponCDT(kind: WeaponKind): string {
  if (kind === 'shield') return '';
  if (kind === 'melee') return '2';
  return '1';
}

function weaponNotes(kind: WeaponKind): string {
  if (kind === 'shield') return '';
  return 'Não pode ser cancelado.';
}

function findMatchingAmmo(kind: WeaponKind, ammoItems: StreetratGearItem[]): StreetratGearItem | undefined {
  return ammoItems.find(a => {
    const an = a.name.toLowerCase();
    if (kind === 'vh-pistol') return an.includes('vh') || an.includes('muito pesada');
    if (kind === 'heavy-pistol') return an.includes('pesada') && !an.includes('vh') && !an.includes('muito');
    if (kind === 'rifle') return an.includes('rifle') || an.includes('fuzil');
    if (kind === 'pistol') return an.includes('curta') || (an.includes('pistola') && !an.includes('pesada'));
    return false;
  });
}

function formatAmmoDisplay(name: string): string {
  const qty = name.match(/x\d+/i)?.[0] ?? '';
  const n = name.toLowerCase();
  if (n.includes('básic')) return `Básica ${qty}`.trim();
  if (n.includes('vh') || n.includes('muito')) return `VH ${qty}`.trim();
  if (n.includes('pesada') || n.includes(' hp')) return `HP ${qty}`.trim();
  return qty;
}

function cleanArmorName(name: string): string {
  return name.replace(/\s*[—–-]\s*Corpo.*/i, '').replace(/\s*\(SP\s*\d+\).*/i, '').trim();
}

// ── Gear resolvers ───────────────────────────────────────────────────────────
function resolveGear(pkg: StreetratPackage, draft: CharacterDraft): StreetratGearItem[] {
  return pkg.gear.filter(item => {
    if (item.linkedChoice) return draft.gearChoices[item.linkedChoice.group] === item.linkedChoice.when;
    if (item.choiceGroupId) return draft.gearChoices[item.choiceGroupId] === item.name;
    return true;
  });
}

function resolveCyware(pkg: StreetratPackage, draft: CharacterDraft): StreetratCywarItem[] {
  return pkg.cyware.filter(cw => {
    if (cw.choiceGroupId) return draft.cywarChoices[cw.choiceGroupId] === cw.name;
    return true;
  });
}

// ── Effective stat value (EMP reduced by cyware) ─────────────────────────────
function effectiveStat(stat: StatKey, s: Record<StatKey, number>, empLoss: number): number {
  return stat === 'EMP' ? s.EMP - empLoss : s[stat];
}

// ── Main function ────────────────────────────────────────────────────────────
export async function buildCharacterPDF(
  draft: CharacterDraft,
  pkg: StreetratPackage,
  role: Role,
  origin: CulturalOrigin | undefined,
): Promise<Uint8Array> {
  const resp = await fetch('/ficha-base.pdf');
  if (!resp.ok) throw new Error('Não foi possível carregar o PDF base.');
  const bytes = await resp.arrayBuffer();

  const doc = await PDFDocument.load(bytes);
  const form = doc.getForm();

  const set = (fieldName: string, value: string) => {
    if (!value) return;
    try {
      form.getTextField(fieldName).setText(value);
    } catch {
      // fallback: some fields in this PDF have a trailing space in their name (authoring bug)
      try { form.getTextField(fieldName + ' ').setText(value); } catch {}
    }
  };

  const setCenter = (fieldName: string, value: string) => {
    if (!value) return;
    const tryField = (name: string): boolean => {
      try {
        const f = form.getTextField(name);
        f.setAlignment(TextAlignment.Center);
        f.setText(value);
        return true;
      } catch { return false; }
    };
    if (!tryField(fieldName)) tryField(fieldName + ' ');
  };

  const tpl = pkg.statTemplates[draft.templateIndex];
  const s = tpl.stats;

  // ── Identidade ──────────────────────────────────────────────────────────────
  set('NOME', draft.name);
  set('PAPEL', role.name);                       // "Solo" não "Combatente Especialista"
  set('HABILIDADE DO PAPEL', role.abilityName);
  setCenter('NIVEL', '4');
  if (origin) set('ORIGENS CULTURAIS', origin.name);
  if (draft.selectedLanguage) {
    set('IDIOMA 1', 'Gíria das Ruas');
    set('IDIOMA 2', draft.selectedLanguage);
  }

  // ── Stats ────────────────────────────────────────────────────────────────────
  for (const [stat, field] of Object.entries(STAT_FIELDS) as [StatKey, string][]) {
    setCenter(field, String(s[stat]));
  }
  // EMP: adjusted (after cyware loss); EMP TOTAL: base
  setCenter('EMP', String(s.EMP - pkg.empLoss));
  setCenter('EMP TOTAL', String(s.EMP));
  setCenter('SOR TOTAL', String(s.LUCK));

  // ── Derivados ─────────────────────────────────────────────────────────────────
  const hp = 10 + 5 * Math.ceil((s.BODY + s.WILL) / 2);
  setCenter('PONTOS DE VIDA', String(hp));
  setCenter('PONTOS DE VIDA 1', String(hp));
  // GRAVEMENTE FERIDO e RESISTÊNCIA A MORTE deixados em branco (usuário preenche)
  const humanidadeTotal = s.EMP * 10;
  setCenter('HUMANIDADE TOTAL', String(humanidadeTotal));
  setCenter('HUMANIDADE', String(humanidadeTotal - pkg.totalHumanityLoss));

  // ── Skills ────────────────────────────────────────────────────────────────────
  // Build slot → rank map: fullSkillSheet takes precedence, then pkg.skills by name
  const slotRanks = new Map<number, number>();

  // 1. From fullSkillSheet (complete pre-gen book data for this role)
  if (pkg.fullSkillSheet) {
    for (const [slot, rank] of Object.entries(pkg.fullSkillSheet) as [string, number][]) {
      if (rank > 0) slotRanks.set(Number(slot), rank);
    }
  }

  // 2. From pkg.skills by name (fills roles without fullSkillSheet)
  for (const skill of pkg.skills) {
    const slot = SKILL_SLOTS[skill.namePtBr];
    if (slot && !slotRanks.has(slot)) {
      if (skill.rank > 0) slotRanks.set(slot, skill.rank);
    }
  }

  // 3. Fill: NVL = rank, BASE = effectiveStat + rank (centered)
  for (const [slot, rank] of slotRanks) {
    const stat = SLOT_STATS[slot];
    if (!stat) continue;
    const base = effectiveStat(stat, s, pkg.empLoss) + rank;
    setCenter(`NVL ${slot}`, String(rank));
    setCenter(`BASE ${slot}`, String(base));
  }

  // Ciência e Instrumento: fill specialization name fields when the character has rank
  if (slotRanks.has(33)) set('CIÊNCIA 1', 'Escolher área de estudo*');
  if (slotRanks.has(42)) set('INSTRUMENTO 1', 'Escolher instrumento musical*');

  // Native language: slot 27 if not already in fullSkillSheet
  if (draft.selectedLanguage && !slotRanks.has(27)) {
    const nativRank = 4;
    const base = effectiveStat('INT', s, pkg.empLoss) + nativRank;
    setCenter('NVL 27', String(nativRank));
    setCenter('BASE 27', String(base));
  }

  // ── Gear: weapons, armor, equipment ─────────────────────────────────────────
  const resolvedGear = resolveGear(pkg, draft);
  const weapons = resolvedGear.filter(g => g.category === 'weapon');
  const armors  = resolvedGear.filter(g => g.category === 'armor');
  const ammoItems = resolvedGear.filter(g =>
    g.category === 'gear' && g.name.toLowerCase().startsWith('munição')
  );
  const others = resolvedGear.filter(g =>
    g.category === 'gear' && !g.name.toLowerCase().startsWith('munição')
  );

  // Track which ammo items have been matched so we don't double-assign
  const usedAmmoSlots = new Set<number>();

  weapons.forEach((w, i) => {
    if (i >= 6) return;
    const n = i + 1;
    const kind = weaponKind(w.name);
    set(`ARMA ${n}`, w.name);
    if (w.damage) setCenter(`DANO ${n}`, w.damage);
    const cdt = weaponCDT(kind);
    if (cdt) setCenter(`CDT ${n}`, cdt);
    const notes = weaponNotes(kind);
    if (notes) set(`NOTAS ${n}`, notes);
    // Match ammo
    const unusedAmmo = ammoItems.filter((_, idx) => !usedAmmoSlots.has(idx));
    const matchedIdx = ammoItems.findIndex((a, idx) => !usedAmmoSlots.has(idx) && findMatchingAmmo(kind, [a]));
    if (matchedIdx >= 0) {
      usedAmmoSlots.add(matchedIdx);
      set(`MUNIÇÃO ${n}`, formatAmmoDisplay(ammoItems[matchedIdx].name));
    }
    void unusedAmmo; // suppress unused warning
  });

  armors.forEach((a, i) => {
    if (i >= 4) return;
    const n = i + 1;
    set(`ARMADURA ${n}`, cleanArmorName(a.name));
    if (a.sp != null) setCenter(`PB ${n}`, String(a.sp));
    setCenter(`PENALIDADE ${n}`, (a.sp ?? 0) <= 11 ? '0' : '-2');
  });

  // Non-ammo, non-armor, non-weapon gear → EQUIPAMENTO slots
  others.forEach((g, i) => {
    if (i >= 19) return;
    set(`EQUIPAMENTO ${i + 1}`, g.name);
  });

  // ── Cyberware ─────────────────────────────────────────────────────────────────
  const cwCounts: Record<string, number> = {};
  resolveCyware(pkg, draft).forEach(cw => {
    const prefix = cywarCategory(cw.name);
    const slot = (cwCounts[prefix] ?? 0) + 1;
    if (slot <= (CYWAR_MAX[prefix] ?? 7)) {
      set(`${prefix} ${slot}`, cw.namePtBr);
      cwCounts[prefix] = slot;
    }
  });

  // ── Personalidade & Histórico ─────────────────────────────────────────────────
  for (const [id, field] of Object.entries(PERSONALITY_FIELDS)) {
    const val = draft.personality[id];
    if (val) set(field, val);
  }

  // ── Amigos ───────────────────────────────────────────────────────────────────
  draft.friends.forEach((rel, i) => {
    if (i < 3 && rel) set(`AMIGOS ${i + 1}`, rel);
  });

  // ── Inimigos ─────────────────────────────────────────────────────────────────
  draft.enemies.forEach((enemy, i) => {
    if (i >= 3) return;
    const n = i + 1;
    if (enemy.who)     set(`QUEM ${n}`, enemy.who);
    if (enemy.cause)   set(`O QUE CAUSOU ISSO? ${n}`, enemy.cause);
    if (enemy.revenge) set(`O QUE VAI ACONTECER? ${n}`, enemy.revenge);
  });

  // ── Amores trágicos ──────────────────────────────────────────────────────────
  draft.tragicLoves.forEach((ending, i) => {
    if (i < 3 && ending) set(`AMORES TRÁGICOS ${i + 1}`, ending);
  });

  // ── Role lifepath ─────────────────────────────────────────────────────────────
  const lifepathLines = Object.entries(draft.roleLifepath)
    .filter(([, v]) => !!v)
    .map(([k, v]) => `${k}: ${v}`);
  if (lifepathLines.length > 0) {
    set('REPUTAÇÃO', lifepathLines.slice(0, 2).join(' | '));
    if (lifepathLines.length > 2)
      set('EVENTOS DE REPUTAÇÃO', lifepathLines.slice(2).join(' | '));
  }

  return doc.save();
}
