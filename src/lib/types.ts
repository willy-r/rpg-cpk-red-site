export type StatKey =
  | "INT"
  | "WILL"
  | "COOL"
  | "EMP"
  | "TECH"
  | "REF"
  | "DEX"
  | "MOVE"
  | "LUCK"
  | "BODY";

export type StatGroup = "mental" | "combat" | "physical" | "fortune";

export interface Stat {
  key: StatKey;
  name: string;
  group: StatGroup;
  description: string;
}

export interface Role {
  id: string;
  name: string;
  namePtBr: string;
  tagline: string;
  description: string;
  specialAbility: string;
  abilityName: string;
  keyStats: StatKey[];
  typicalGear: string[];
  pageRef: number;
}

export interface Skill {
  name: string;
  namePtBr: string;
  linkedStat: StatKey;
  category: string;
  description: string;
}

export type CyberwareCategory =
  | "neural"
  | "optics"
  | "audio"
  | "cyberarm"
  | "cyberleg"
  | "borgware";

export interface CyberwareItem {
  id: string;
  name: string;
  namePtBr: string;
  category: CyberwareCategory;
  description: string;
  humanityLoss: string;
  cost: number;
  optionSlots?: number;
  pageRef?: number;
}

export type WeaponType =
  | "pistol"
  | "smg"
  | "rifle"
  | "shotgun"
  | "melee"
  | "heavy"
  | "grenade";

export interface Weapon {
  name: string;
  namePtBr: string;
  type: WeaponType;
  damage: string;
  rof: number;
  hands: 1 | 2;
  concealable: boolean;
  cost: number;
  notes?: string;
}

export interface ArmorPiece {
  name: string;
  namePtBr: string;
  sp: number;
  location: "body" | "head";
  penalty?: string;
  cost: number;
}

export interface NetProgram {
  name: string;
  class: "booster" | "attacker" | "defender" | "anti-program";
  atk?: number;
  def?: number;
  rez: number;
  description: string;
  effect: string;
}

export type DistrictType =
  | "corporate"
  | "combat-zone"
  | "residential"
  | "entertainment"
  | "industrial";

export interface District {
  name: string;
  namePtBr?: string;
  type: DistrictType;
  description: string;
  safetyLevel: 1 | 2 | 3 | 4 | 5;
  notableLocations: string[];
}

export interface Corporation {
  name: string;
  focus: string;
  description: string;
  role: string;
  keyFigures?: string[];
  pageRef: number;
}

export type TimelineArc =
  | "never-fade-away"
  | "fall-of-towers"
  | "time-of-red"
  | "founding";

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  arc: TimelineArc;
}

export interface EconomyItem {
  name: string;
  namePtBr: string;
  category: string;
  cost: number;
  notes?: string;
}

export interface LifestyleTier {
  name: string;
  costPerMonth: number;
  description: string;
  includes: string[];
}

export interface SlangTerm {
  term: string;
  definition: string;
}
