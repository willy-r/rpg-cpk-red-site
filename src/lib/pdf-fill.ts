import { PDFDocument, TextAlignment } from "pdf-lib";
import type { Role, StatKey } from "@/lib/types";
import type {
  StreetratPackage,
  StreetratGearItem,
  StreetratCywarItem,
  CulturalOrigin,
} from "@/data/streetrat";
import { getRoleLifepath } from "@/data/roleLifepaths";

// ── CharacterDraft mirrors the type in criar-personagem/page.tsx ─────────────
export interface CharacterDraft {
  name: string;
  roleId: string | null;
  culturalOriginId: string | null;
  selectedLanguage: string | null;
  personality: Record<string, string | null>;
  roleLifepath: Record<string, string | null>;
  templateIndex: number;
  friends: (string | null)[];
  enemies: {
    who: string | null;
    cause: string | null;
    power: string | null;
    revenge: string | null;
  }[];
  tragicLoves: (string | null)[];
  gearChoices: Record<string, string>;
  cywarChoices: Record<string, string>;
}

// ── Stat → PDF field name ────────────────────────────────────────────────────
// FVO = Força de Vontade (WILL); TCO = Tenacidade Corporal (BODY); DES = Destreza (DEX)
const STAT_FIELDS: Record<StatKey, string> = {
  INT: "INT",
  REF: "REF",
  DEX: "DES",
  TECH: "TEC",
  COOL: "COOL",
  WILL: "FVO",
  BODY: "TCO",
  EMP: "EMP", // overridden below to show adjusted value
  LUCK: "SOR",
  MOVE: "MOV",
};

// ── Personality table ID → PDF field ─────────────────────────────────────────
const PERSONALITY_FIELDS: Record<string, string> = {
  personality: "PERSONALIDADE",
  clothing: "ESTILO DAS ROUPAS",
  hairstyle: "ESTILO DO CABELO",
  affectation: "MODA/ESTILO",
  "value-most": "O QUE VOCÊ MAIS VALORIZA?",
  "people-philosophy": "QUAL A SUA OPINIAO EM RELAÇÃO A MAIORIA DAS PESSOAS?",
  "valued-person": "PESSOA QUE MAIS VALORIZA",
  "valued-possession": "OBJETO QUE MAIS VALORIZA",
  "family-background": "ANTECENDENTE FAMILIAR",
  "childhood-env": "AMBIENTE DA SUA INFÂNCIA",
  "family-crisis": "TRAGÉDIA FAMILIAR",
  "life-goals": "OBJETIVO DE VIDA",
};

// ── Skill name → PDF NVL slot (1–72) ────────────────────────────────────────
// Derived from PyMuPDF field-position extraction of the fillable PDF.
// Multiple aliases cover the namePtBr variants used across all 10 role packages.
// Skills with no slot (role abilities, invented names) are silently skipped.
const SKILL_SLOTS: Record<string, number> = {
  // ATENÇÃO
  Concentração: 1,
  "Ocultar/Revelar Objeto": 2,
  "Esconder/Revelar Objeto": 2,
  "Leitura Labial": 3,
  Percepção: 4,
  Rastrear: 5,
  Rastreamento: 5,
  // CORPORAIS
  Atletismo: 6,
  Contorcionismo: 7,
  Dançar: 8,
  Resistência: 9,
  "Resistência à Tortura/Drogas": 10,
  "Resistir Tortura/Drogas": 10,
  Furtividade: 11,
  // CONDUÇÃO
  "Dirigir Veículo Terrestre": 12,
  Dirigir: 12,
  "Pilotar Veículo Aéreo": 13,
  "Pilotar Veículo Marítimo": 14,
  Motocicleta: 15,
  // EDUCAÇÃO
  Contabilidade: 16,
  "Lidar com Animais": 17,
  Burocracia: 18,
  Negócios: 19,
  Composição: 20,
  Criminologia: 21,
  Criptografia: 22,
  Dedução: 23,
  Educação: 24,
  Apostar: 25,
  "Idioma das Ruas": 26,
  "Idioma Nativo": 27,
  "Pesquisa em Biblioteca": 29,
  "Especialista Local": 30,
  Ciência: 33,
  "Ciência (à escolha)": 33,
  Estratégia: 35,
  Sobrevivência: 36,
  "Sobrevivência em Terras Selvagens": 36,
  // LUTA
  Briga: 37,
  Evasão: 38,
  "Artes Marciais": 39,
  "Armas Brancas": 40,
  // PERFORMANCE
  Atuação: 41,
  "Tocar Instrumento": 42,
  // ARMAS DE FOGO / ARCO
  Arqueirismo: 44,
  Automática: 45,
  "Fogo Automático": 45,
  "Armas Curtas": 46,
  "Armas Pesadas": 47,
  Fuzil: 48,
  // SOCIAL
  Suborno: 49,
  Oratória: 50,
  Conversação: 50,
  "Percepção Humana": 51,
  Interrogatório: 52,
  Persuasão: 53,
  "Cuidados Pessoais": 54,
  "Aparência Pessoal": 54,
  Malandragem: 55,
  "Malícia de Rua": 55,
  Negociação: 56, Comércio: 56,
  "Roupa e Estilo": 57,
  "Guarda-roupa & Estilo": 57,
  // TÉCNICA
  "Tecnologia de Veículos Aéreos": 58,
  "Tecnologia Básica": 59,
  "Técnica Básica": 59,
  Cibertecnologia: 60,
  Demolições: 61,
  "Eletrônica/Seg. Tecnológica": 62,
  "Eletrônica/Tec. de Segurança": 62,
  "Primeiros Socorros": 63,
  Falsificação: 64,
  "Tecnologia de Veículo Terrestre": 65,
  "Tecnologia de Veículos": 65,
  "Pintar/Desenhar/Esculpir": 66,
  Medicamentos: 67,
  Medicina: 67,
  "Fotografia e Filmagem": 68,
  "Fotografar/Filmagem": 68,
  "Fotografia/Filme": 68,
  Arrombamento: 69,
  "Abrir Fechadura": 69,
  Furto: 70,
  "Tecnologia de Veículo Marítimo": 71,
  "Tecnologia de Armas/Armeiro": 72,
  "Tecnologia de Armas": 72,
};

// ── Cyberware: category → PDF field prefix and max slots ─────────────────────
// Detection uses the English `cw.name` field from StreetratCywarItem.
const CYWAR_MAX: Record<string, number> = {
  "EQUIPAMENTO NEURAL": 5,
  CIBERÁUDIO: 3,
  CIBERÓPTICO: 3,
  CIBERMODA: 7,
  "CYBERWARE INTERNO": 7,
  "CYBERWARE EXTERNO": 7,
};

function cywarCategory(name: string): string {
  const n = name.toLowerCase();
  // Neural (requires Neural Link as base)
  if (
    [
      "neural link",
      "interface plugs",
      "sandevistan",
      "kerenzikov",
      "chipware",
      "tool hand",
      "subdermal grip",
      "internal agent",
    ].some((x) => n.includes(x))
  )
    return "EQUIPAMENTO NEURAL";
  // Audio
  if (
    [
      "cyberaudio",
      "audio recorder",
      "amplified hearing",
      "voice stress",
      "radio scanner",
      "scrambler",
      "homing tracer",
    ].some((x) => n.includes(x))
  )
    return "CIBERÁUDIO";
  // Optic
  if (
    [
      "cybereye",
      "microoptics",
      "teleoptics",
      "anti-dazzle",
      "image enhance",
      "targeting scope",
      "low light",
      "infrared",
      "ultraviolet",
    ].some((x) => n.includes(x))
  )
    return "CIBERÓPTICO";
  // Fashionware (zero humanity loss, cosmetic)
  if (
    [
      "chemskin",
      "techhair",
      "light tattoo",
      "skinwatch",
      "shift tacts",
      "biomonitor",
      "nasal filter",
      "toxin binder",
      "subdermal pocket",
    ].some((x) => n.includes(x))
  )
    return "CIBERMODA";
  // External (visible modifications)
  if (
    [
      "hidden holster",
      "wolvers",
      "gorilla arm",
      "mantis blade",
      "popup gun",
      "cybersnake",
    ].some((x) => n.includes(x))
  )
    return "CYBERWARE EXTERNO";
  return "CYBERWARE INTERNO";
}

// ── Weapon helpers ────────────────────────────────────────────────────────────
// WeaponKind drives CDT, notes, and ammo matching.
type WeaponKind =
  | "rifle"
  | "vh-pistol"
  | "heavy-pistol"
  | "pistol"
  | "smg"
  | "melee";

function weaponKind(name: string): WeaponKind {
  const n = name.toLowerCase();
  if (
    ["melee", "branca", "faca", "wolver", "garras"].some((x) => n.includes(x))
  )
    return "melee";
  // Long-barrel / heavy ranged — check before pistol tests to avoid misclassification
  if (
    [
      "rifle",
      "fuzil",
      "espingarda",
      "escopeta",
      "sniper",
      "carabina",
      "lançador",
    ].some((x) => n.includes(x))
  )
    return "rifle";
  if (n.includes("muito pesada") || n.includes("very heavy"))
    return "vh-pistol";
  if (n.includes("smg") || n.includes("submetralhadora")) return "smg";
  if (n.includes("pesada") || n.includes("pesado") || n.includes("heavy"))
    return "heavy-pistol";
  return "pistol";
}

// CDT = Concealability type on the CPR sheet: 1 = can be concealed, 2 = melee/large
function weaponCDT(kind: WeaponKind): string {
  if (kind === "melee") return "2";
  return "1";
}

// NOTAS: all weapons except shields require "cannot be negated"
function weaponNotes(kind: WeaponKind): string {
  return "Não pode ser cancelado.";
}

// Match ammo by weapon kind — supports pistol types, rifles, shotguns, SMGs
function findMatchingAmmo(
  kind: WeaponKind,
  ammoItems: StreetratGearItem[],
): StreetratGearItem | undefined {
  return ammoItems.find((a) => {
    const an = a.name.toLowerCase();
    switch (kind) {
      case "vh-pistol":
        return an.includes("vh") || an.includes("muito pesada");
      case "heavy-pistol":
        return (
          an.includes("pesada") && !an.includes("vh") && !an.includes("muito")
        );
      case "rifle":
        return (
          an.includes("rifle") ||
          an.includes("fuzil") ||
          an.includes("esping") ||
          an.includes("slug")
        );
      case "pistol":
        return (
          an.includes("curta") ||
          (an.includes("pistola") && !an.includes("pesada"))
        );
      case "smg":
        return (
          an.includes("smg") || an.includes("submetr") || an.includes("média")
        );
      default:
        return false;
    }
  });
}

// Display format for ammo slot: "Básica x70", "VH x30", "HP x50"
function formatAmmoDisplay(name: string): string {
  const qty = name.match(/x\d+/i)?.[0] ?? "";
  const n = name.toLowerCase();
  if (n.includes("básic")) return `Básica ${qty}`.trim();
  if (n.includes("vh") || n.includes("muito")) return `VH ${qty}`.trim();
  if (n.includes("pesada") || n.includes(" hp")) return `HP ${qty}`.trim();
  if (n.includes("esping") || n.includes("slug")) return `${qty}`.trim();
  if (n.includes("incendi")) return `Incendiária ${qty}`.trim();
  return qty;
}

// Armor name: strip location and SP suffix ("Armorjack Leve — Corpo (SP 11)" → "Armorjack Leve")
function cleanArmorName(name: string): string {
  return name
    .replace(/\s*[—–-]\s*Corpo.*/i, "")
    .replace(/\s*\(SP\s*\d+\).*/i, "")
    .trim();
}

// ── Grenade helpers ───────────────────────────────────────────────────────────
// Grenades are gear items but occupy ARMA slots in the PDF (they're attack items).

function isGrenade(name: string): boolean {
  return name.toLowerCase().includes("granada");
}

// Strip trailing quantity suffix: "Granada de Gás Lacrimogênio x2" → "Granada de Gás Lacrimogênio"
function grenadeBaseName(name: string): string {
  return name.replace(/\s*x\d+\s*$/i, "").trim();
}

// Extract "x2", "x1", etc. from name — used in MUNIÇÃO slot
function grenadeQty(name: string): string {
  const match = name.match(/x(\d+)/i);
  return match ? `x${match[1]}` : "x1";
}

// Effect notes per grenade type (CPR Red p.183-185)
function grenadeNotes(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("gás") || n.includes("gas") || n.includes("lacrimog"))
    return "Teste de DV13 para Resistência a Tortura/Drogas.";
  if (n.includes("flash"))
    return "Teste de DV15 para Resistência a Tortura/Drogas.";
  if (n.includes("fumaça") || n.includes("fumac"))
    return "Bloqueio de linha de visão por área";
  if (n.includes("frag")) return "6d6 dano a todos na área (3m).";
  return "Arremessável — efeito de área.";
}

// ── Gear / cyware resolvers ───────────────────────────────────────────────────
function resolveGear(
  pkg: StreetratPackage,
  draft: CharacterDraft,
): StreetratGearItem[] {
  return pkg.gear.filter((item) => {
    if (item.linkedChoice)
      return (
        draft.gearChoices[item.linkedChoice.group] === item.linkedChoice.when
      );
    if (item.choiceGroupId)
      return draft.gearChoices[item.choiceGroupId] === item.name;
    return true;
  });
}

function resolveCyware(
  pkg: StreetratPackage,
  draft: CharacterDraft,
): StreetratCywarItem[] {
  return pkg.cyware.filter((cw) => {
    if (cw.choiceGroupId)
      return draft.cywarChoices[cw.choiceGroupId] === cw.name;
    return true;
  });
}

// ── Main export ───────────────────────────────────────────────────────────────
export async function buildCharacterPDF(
  draft: CharacterDraft,
  pkg: StreetratPackage,
  role: Role,
  origin: CulturalOrigin | undefined,
): Promise<Uint8Array> {
  const resp = await fetch("/ficha-base.pdf");
  if (!resp.ok) throw new Error("Não foi possível carregar o PDF base.");

  const doc = await PDFDocument.load(await resp.arrayBuffer());
  const form = doc.getForm();

  // Text helper — tries field name then "field name " (authoring bug in source PDF)
  const set = (fieldName: string, value: string) => {
    if (!value) return;
    try {
      form.getTextField(fieldName).setText(value);
    } catch {
      try {
        form.getTextField(fieldName + " ").setText(value);
      } catch {}
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
      } catch {
        return false;
      }
    };
    if (!tryField(fieldName)) tryField(fieldName + " ");
  };

  const s = pkg.statTemplates[draft.templateIndex].stats;

  // ════════════════════════════════════════════════════════════════════════════
  // 1. IDENTIDADE — nome, papel, origem
  // ════════════════════════════════════════════════════════════════════════════
  set("NOME", draft.name);
  set("PAPEL", role.name); // short name, e.g. "Solo"
  set("HABILIDADE DO PAPEL", role.abilityName);
  setCenter("NIVEL", "4"); // Streetrat method always starts at level 4
  if (origin) set("ORIGENS CULTURAIS", origin.name);
  if (draft.selectedLanguage) set("IDIOMA 1", draft.selectedLanguage);

  // ════════════════════════════════════════════════════════════════════════════
  // 2. ATRIBUTOS — valores diretos do template escolhido
  //    EMP é exibido como adjusted (base − perda por cyware); EMP TOTAL = base
  //    SOR não é afetada por cyware, então SOR = SOR TOTAL = LUCK
  // ════════════════════════════════════════════════════════════════════════════
  for (const [stat, field] of Object.entries(STAT_FIELDS) as [
    StatKey,
    string,
  ][]) {
    setCenter(field, String(s[stat]));
  }
  setCenter("EMP", String(Math.floor((s.EMP * 10 - pkg.totalHumanityLoss) / 10))); // adjusted EMP
  setCenter("EMP TOTAL", String(s.EMP)); // base EMP before cyware
  setCenter("SOR TOTAL", String(s.LUCK)); // LUCK unchanged by cyware

  // ════════════════════════════════════════════════════════════════════════════
  // 3. VALORES DERIVADOS (CPR Red p.79)
  //    HP   = 10 + 5 × ⌈(BODY + WILL) / 2⌉
  //    HUM_TOTAL = EMP_base × 10
  //    HUM_ATUAL = HUM_TOTAL − totalHumanityLoss (soma do cyware do pacote)
  //    GRAVEMENTE FERIDO e RESISTÊNCIA A MORTE: deixados em branco (preenchidos pela mesa)
  // ════════════════════════════════════════════════════════════════════════════
  const hp = 10 + 5 * Math.ceil((s.BODY + s.WILL) / 2);
  setCenter("PONTOS DE VIDA", String(hp));
  setCenter("PONTOS DE VIDA 1", String(hp));
  const humanidadeTotal = s.EMP * 10;
  setCenter("HUMANIDADE TOTAL", String(humanidadeTotal));
  setCenter("HUMANIDADE", String(humanidadeTotal - pkg.totalHumanityLoss));

  // ════════════════════════════════════════════════════════════════════════════
  // 4. PERÍCIAS
  //    Fonte: pkg.skills (authoritative — linkedStat vem direto do dado, não de
  //    tabela secundária). EMP-linked skills usam o EMP ajustado.
  //    NVL = rank | BASE = stat_value + rank
  //
  //    Idioma nativo (slot 27): regra CPR — origem cultural concede rank 4 no
  //    idioma escolhido, vinculado a INT.
  // ════════════════════════════════════════════════════════════════════════════
  const filledSlots = new Set<number>();

  for (const skill of pkg.skills) {
    const slot = SKILL_SLOTS[skill.namePtBr];
    if (!slot || skill.rank <= 0) continue;

    // Use skill.linkedStat directly — it IS the authoritative source (from the data)
    const statVal =
      skill.linkedStat === "EMP" ? Math.floor((s.EMP * 10 - pkg.totalHumanityLoss) / 10) : s[skill.linkedStat];
    setCenter(`NVL ${slot}`, String(skill.rank));
    setCenter(`BASE ${slot}`, String(statVal + skill.rank));
    filledSlots.add(slot);
  }

  // Idioma nativo: slot 27, INT-linked, rank 4 (CPR regra de origem cultural)
  if (draft.selectedLanguage) {
    setCenter("NVL 27", "4");
    setCenter("BASE 27", String(s.INT + 4));
    filledSlots.add(27);
  }

  // Especializações obrigatórias quando o personagem tem rank nas perícias pai
  if (filledSlots.has(33)) set("CIÊNCIA 1", "Escolher área de estudo*");
  if (filledSlots.has(42))
    set("INSTRUMENTO 1", "Escolher instrumento musical*");

  // ════════════════════════════════════════════════════════════════════════════
  // 5. ARMAS, MUNIÇÃO, ARMADURA, EQUIPAMENTO
  //    resolveGear aplica gearChoices: items com choiceGroupId só entram se
  //    selecionados; items com linkedChoice entram automaticamente conforme a
  //    escolha de arma.
  // ════════════════════════════════════════════════════════════════════════════
  const resolvedGear = resolveGear(pkg, draft);
  const weapons = resolvedGear.filter((g) => g.category === "weapon");
  const armors = resolvedGear.filter((g) => g.category === "armor");
  const ammoItems = resolvedGear.filter(
    (g) => g.category === "gear" && g.name.toLowerCase().startsWith("munição"),
  );
  const gearItems = resolvedGear.filter(
    (g) => g.category === "gear" && !g.name.toLowerCase().startsWith("munição"),
  );

  // Grenades are gear items but occupy ARMA slots — they have attack rules
  const grenades = gearItems.filter((g) => isGrenade(g.name));
  const others = gearItems.filter((g) => !isGrenade(g.name));

  // Weapons + grenades share the 6 ARMA slots, weapons first
  const allAttacks = [...weapons, ...grenades];
  const usedAmmoIndexes = new Set<number>();

  allAttacks.forEach((w, i) => {
    if (i >= 6) return;
    const n = i + 1;

    if (isGrenade(w.name)) {
      set(`ARMA ${n}`, grenadeBaseName(w.name));
      set(`NOTAS ${n}`, grenadeNotes(w.name));
      set(`MUNIÇÃO ${n}`, grenadeQty(w.name));
      return;
    }

    const kind = weaponKind(w.name);
    set(`ARMA ${n}`, w.name);
    if (w.damage) setCenter(`DANO ${n}`, w.damage);
    const cdt = weaponCDT(kind);
    if (cdt) setCenter(`CDT ${n}`, cdt);
    const notes = weaponNotes(kind);
    if (notes) set(`NOTAS ${n}`, notes);

    // Find first unused ammo item that matches this weapon's kind
    const matchedIdx = ammoItems.findIndex(
      (a, idx) => !usedAmmoIndexes.has(idx) && !!findMatchingAmmo(kind, [a]),
    );
    if (matchedIdx >= 0) {
      usedAmmoIndexes.add(matchedIdx);
      set(`MUNIÇÃO ${n}`, formatAmmoDisplay(ammoItems[matchedIdx].name));
    }
  });

  armors.forEach((a, i) => {
    if (i >= 4) return;
    const n = i + 1;
    set(`ARMADURA ${n}`, cleanArmorName(a.name));
    if (a.sp != null) setCenter(`PB ${n}`, String(a.sp));
    // Penalty: 0 for SP≤11 (light armor), -2 for SP>11 (heavy armor) — CPR p.104
    setCenter(`PENALIDADE ${n}`, (a.sp ?? 0) <= 11 ? "0" : "-2");
  });

  others.forEach((g, i) => {
    if (i >= 19) return;
    set(`EQUIPAMENTO ${i + 1}`, g.name);
  });

  // ════════════════════════════════════════════════════════════════════════════
  // 6. CYBERWARE — distribuído por categoria
  //    resolveCyware aplica cywarChoices da mesma forma que resolveGear
  // ════════════════════════════════════════════════════════════════════════════
  const cwCounts: Record<string, number> = {};
  resolveCyware(pkg, draft).forEach((cw) => {
    const cat = cywarCategory(cw.name);
    const slot = (cwCounts[cat] ?? 0) + 1;
    if (slot <= (CYWAR_MAX[cat] ?? 7)) {
      set(`${cat} ${slot}`, cw.namePtBr);
      cwCounts[cat] = slot;
    }
  });

  // ════════════════════════════════════════════════════════════════════════════
  // 7. CAMINHO DE VIDA — personalidade (escolhas do wizard step 3)
  // ════════════════════════════════════════════════════════════════════════════
  for (const [id, field] of Object.entries(PERSONALITY_FIELDS)) {
    const val = draft.personality[id];
    if (val) set(field, val);
  }

  // ════════════════════════════════════════════════════════════════════════════
  // 8. AMIGOS, INIMIGOS, AMORES TRÁGICOS (step 3)
  // ════════════════════════════════════════════════════════════════════════════
  draft.friends.forEach((rel, i) => {
    if (i < 3 && rel) set(`AMIGOS ${i + 1}`, rel);
  });

  draft.enemies.forEach((enemy, i) => {
    if (i >= 3) return;
    const n = i + 1;
    if (enemy.who) set(`QUEM ${n}`, enemy.who);
    if (enemy.cause) set(`O QUE CAUSOU ISSO? ${n}`, enemy.cause);
    if (enemy.revenge) set(`O QUE VAI ACONTECER? ${n}`, enemy.revenge);
  });

  draft.tragicLoves.forEach((ending, i) => {
    if (i < 3 && ending) set(`AMORES TRÁGICOS ${i + 1}`, ending);
  });

  // ════════════════════════════════════════════════════════════════════════════
  // 9. LIFEPATH DO PAPEL (step 4)
  //    Usa os títulos das tabelas como label, não os IDs internos.
  //    Resultado vai para REPUTAÇÃO / EVENTOS DE REPUTAÇÃO (campos de texto livre).
  // ════════════════════════════════════════════════════════════════════════════
  const lifepath = getRoleLifepath(draft.roleId ?? "");
  if (lifepath) {
    const entries = lifepath.tables
      .filter((t) => draft.roleLifepath[t.id])
      .map((t) => `${t.title}: ${draft.roleLifepath[t.id]}`);
    if (entries.length > 0) {
      set("REPUTAÇÃO", entries.slice(0, 2).join(" | "));
      set("EVENTOS DE REPUTAÇÃO", entries.slice(2).join(" | "));
    }
  }

  return doc.save();
}
