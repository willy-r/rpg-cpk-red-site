import { PDFDocument } from 'pdf-lib';
import type { Role } from '@/lib/types';
import type { StreetratPackage, StreetratGearItem, StreetratCywarItem, CulturalOrigin } from '@/data/streetrat';
import type { StatKey } from '@/lib/types';

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

// personality table id → PDF field name
const PERSONALITY_FIELDS: Record<string, string> = {
  personality:          'PERSONALIDADE',
  clothing:             'ESTILO DAS ROUPAS',
  hairstyle:            'ESTILO DO CABELO',
  affectation:          'MODA/ESTILO',
  'value-most':         'O QUE VOCÊ MAIS VALORIZA?',
  'people-philosophy':  'QUAL A SUA OPINIAO EM RELAÇÃO A MAIORIA DAS PESSOAS?',
  'valued-person':      'PESSOA QUE MAIS VALORIZA',
  'valued-possession':  'OBJETO QUE MAIS VALORIZA',
  'family-background':  'ANTECENDENTE FAMILIAR',
  'childhood-env':      'AMBIENTE DA SUA INFÂNCIA',
  'family-crisis':      'TRAGÉDIA FAMILIAR',
  'life-goals':         'OBJETIVO DE VIDA',
};

// FVO = Força de VOntade (WILL), TCO = BODY — verify visually on printed sheet
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

const CYWAR_CATEGORY_SLOTS: Record<string, number> = {
  'EQUIPAMENTO NEURAL': 5,
  'CIBERÁUDIO':         3,
  'CIBERÓPTICO':        3,
  'CIBERMODA':          7,
  'CYBERWARE INTERNO':  7,
  'CYBERWARE EXTERNO':  7,
};

function cywarCategory(name: string): string {
  const n = name.toLowerCase();
  if (['neural link', 'interface plugs', 'sandevistan', 'kerenzikov'].some(x => n.includes(x)))
    return 'EQUIPAMENTO NEURAL';
  if (['cyberaudio', 'audio recorder', 'amplified hearing', 'voice stress', 'shift tact'].some(x => n.includes(x)))
    return 'CIBERÁUDIO';
  if (['cybereye', 'microoptics', 'teleoptics', 'anti-dazzle'].some(x => n.includes(x)))
    return 'CIBERÓPTICO';
  if (['chemskin', 'techhair', 'light tattoo', 'skinwatch'].some(x => n.includes(x)))
    return 'CIBERMODA';
  if (['hidden holster', 'wolvers'].some(x => n.includes(x)))
    return 'CYBERWARE EXTERNO';
  return 'CYBERWARE INTERNO';
}

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
      // campo não encontrado — ignora
    }
  };

  const tpl = pkg.statTemplates[draft.templateIndex];
  const s = tpl.stats;

  // ── Identidade ──────────────────────────────────────────────────────────────
  set('NOME', draft.name);
  set('PAPEL', role.namePtBr);
  set('HABILIDADE DO PAPEL', role.abilityName);
  if (origin) set('ORIGENS CULTURAIS', origin.name);
  if (draft.selectedLanguage) set('IDIOMA 1', `${draft.selectedLanguage} — Nível 4`);

  // ── Stats ────────────────────────────────────────────────────────────────────
  for (const [stat, field] of Object.entries(STAT_FIELDS) as [StatKey, string][]) {
    set(field, String(s[stat]));
  }
  set('EMP TOTAL', String(s.EMP - pkg.empLoss));
  set('SOR TOTAL', String(s.LUCK));

  // ── Derivados ────────────────────────────────────────────────────────────────
  const hp = 10 + 5 * Math.ceil((s.BODY + s.WILL) / 2);
  set('PONTOS DE VIDA', String(hp));
  set('PONTOS DE VIDA 1', String(hp));
  set('GRAVEMENTE FERIDO', String(Math.ceil(hp / 2)));
  set('RESISTÊNCIA A MORTE', String(s.BODY));
  const humanidadeTotal = s.EMP * 10;
  set('HUMANIDADE TOTAL', String(humanidadeTotal));
  set('HUMANIDADE', String(humanidadeTotal - pkg.totalHumanityLoss));

  // ── Skills — posicional (NVL n = rank, BASE n = stat vinculada) ──────────────
  pkg.skills.forEach((skill, i) => {
    const slot = i + 1;
    set(`NVL ${slot}`, String(skill.rank));
    set(`BASE ${slot}`, String(s[skill.linkedStat]));
  });

  // ── Gear ─────────────────────────────────────────────────────────────────────
  const resolvedGear = resolveGear(pkg, draft);
  const weapons = resolvedGear.filter(g => g.category === 'weapon');
  const armors  = resolvedGear.filter(g => g.category === 'armor');
  const others  = resolvedGear.filter(g => g.category !== 'weapon' && g.category !== 'armor');

  weapons.forEach((w, i) => {
    if (i >= 6) return;
    set(`ARMA ${i + 1}`, w.name);
    if (w.damage) set(`DANO ${i + 1}`, w.damage);
  });

  armors.forEach((a, i) => {
    if (i >= 4) return;
    set(`ARMADURA ${i + 1}`, a.name);
    if (a.sp != null) set(`PB ${i + 1}`, String(a.sp));
  });

  others.forEach((g, i) => {
    if (i >= 19) return;
    set(`EQUIPAMENTO ${i + 1}`, g.name);
  });

  // ── Cyberware por categoria ───────────────────────────────────────────────────
  const resolvedCyware = resolveCyware(pkg, draft);
  const cwCounts: Record<string, number> = {};

  resolvedCyware.forEach(cw => {
    const prefix = cywarCategory(cw.name);
    const maxSlots = CYWAR_CATEGORY_SLOTS[prefix] ?? 7;
    const slot = (cwCounts[prefix] ?? 0) + 1;
    if (slot <= maxSlots) {
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

  // ── Role lifepath → campos de reputação ──────────────────────────────────────
  const lifepathLines = Object.entries(draft.roleLifepath)
    .filter(([, val]) => !!val)
    .map(([key, val]) => `${key}: ${val}`);

  if (lifepathLines.length > 0) {
    set('REPUTAÇÃO', lifepathLines.slice(0, 2).join(' | '));
    if (lifepathLines.length > 2) {
      set('EVENTOS DE REPUTAÇÃO', lifepathLines.slice(2).join(' | '));
    }
  }

  return doc.save();
}
