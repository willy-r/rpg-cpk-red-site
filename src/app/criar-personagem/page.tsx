"use client";

import { useState, useCallback, useRef } from "react";
import { roles } from "@/data/roles";
import { stats } from "@/data/stats";
import { streetratPackages, culturalOrigins } from "@/data/streetrat";
import { getRoleLifepath } from "@/data/roleLifepaths";
import {
  allPersonalityTables,
  friendRelationships,
  enemyWho,
  enemyCause,
  enemyPower,
  enemyRevenge,
  tragicLoveEndings,
  lifeGoals,
} from "@/data/personality";
import type { StatKey } from "@/lib/types";

// ─── Random Name Lists ────────────────────────────────────────────────────────

const FIRST_NAMES = [
  "Aya", "Kira", "Zara", "Nova", "Lyra", "Vex", "Ryn", "Juno",
  "Mika", "Sable", "Ash", "Nyx", "Coda", "Echo", "Ferro", "Vex",
  "Dante", "Riko", "Soren", "Axel", "Zane", "Cruz", "Orion", "Rex",
  "Takeshi", "Yuki", "Naka", "Kenji", "Aiko", "Hiro",
  "Viktor", "Mira", "Sasha", "Dara", "Alexei", "Natasha",
  "Camila", "Diego", "Lucia", "Marco", "Ana", "Rafael",
  "Kaito", "Sei", "Ren", "Yami", "Tora", "Kuro",
  "Jules", "Nico", "Riot", "Zero", "Ghost", "Cipher",
];

const LAST_NAMES = [
  "Nakamura", "Reyes", "Chen", "Volkov", "Santos", "Osei",
  "Blackwood", "Ferreira", "Kowalski", "Adeyemi", "Zhao", "Müller",
  "Sokolov", "Araújo", "Tanaka", "Petrov", "Kimani", "Ortega",
  "Vasquez", "Inoue", "Bogdanov", "Lima", "Okonkwo", "Park",
  "Steele", "Cross", "Vance", "Shade", "Frost", "Riven",
  "Chrome", "Wraith", "Cipher", "Vector", "Hex", "Blade",
];

function randomName(): string {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${first} ${last}`;
}

// ─── Dice Component ───────────────────────────────────────────────────────────

type DiceState = "idle" | "rolling" | "done";

interface DiceButtonProps {
  max: number;
  label?: string;
  onRoll: (result: number) => void;
  size?: "sm" | "md" | "lg";
}

function DiceButton({ max, label = "Rolar D10", onRoll, size = "md" }: DiceButtonProps) {
  const [diceState, setDiceState] = useState<DiceState>("idle");
  const [display, setDisplay] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const roll = useCallback(() => {
    if (diceState === "rolling") return;
    if (timerRef.current) clearTimeout(timerRef.current);

    setDiceState("rolling");
    setDisplay(null);

    const TOTAL_STEPS = 20;
    let step = 0;

    const tick = () => {
      // Generate a random number each tick for the "flickering" effect
      setDisplay(Math.floor(Math.random() * max) + 1);
      step++;

      if (step < TOTAL_STEPS) {
        // Quadratic slowdown: starts at ~30ms, ends at ~350ms
        const delay = 28 + Math.pow(step, 2) * 0.85;
        timerRef.current = setTimeout(tick, delay);
      } else {
        const final = Math.floor(Math.random() * max) + 1;
        setDisplay(final);
        setDiceState("done");
        onRoll(final);
        timerRef.current = setTimeout(() => setDiceState("idle"), 3000);
      }
    };

    tick();
  }, [diceState, max, onRoll]);

  const sizeMap = {
    sm: { outer: "w-10 h-10", inner: "text-sm", label: "text-[9px]" },
    md: { outer: "w-14 h-14", inner: "text-base", label: "text-[10px]" },
    lg: { outer: "w-20 h-20", inner: "text-xl",  label: "text-xs" },
  };
  const sz = sizeMap[size];

  const isRolling = diceState === "rolling";
  const isDone = diceState === "done";

  return (
    <button
      onClick={roll}
      disabled={isRolling}
      title={label}
      className={`flex flex-col items-center gap-1.5 group select-none ${isRolling ? "cursor-wait" : "cursor-pointer"}`}
    >
      {/* Die face — rotated square = diamond/d10 shape */}
      <div className="relative" style={{ width: "var(--die-w)", height: "var(--die-h)" }}>
        <div
          className={`${sz.outer} relative flex items-center justify-center transition-all duration-200`}
          style={{
            filter: isRolling
              ? "drop-shadow(0 0 12px #ffd700) drop-shadow(0 0 24px rgba(255,215,0,0.6))"
              : isDone
              ? "drop-shadow(0 0 8px #39ff14) drop-shadow(0 0 16px rgba(57,255,20,0.4))"
              : "drop-shadow(0 0 4px rgba(255,215,0,0.3))",
          }}
        >
          {/* Diamond shape */}
          <div
            className={`absolute inset-0 border-2 transition-colors duration-200 ${
              isRolling
                ? "border-[#ffd700] bg-[#1a1500]"
                : isDone
                ? "border-[#39ff14] bg-[#001a00]"
                : "border-[#ffd70088] bg-[#14141f] group-hover:border-[#ffd700] group-hover:bg-[#1a1500]"
            }`}
            style={{
              transform: "rotate(45deg)",
              animation: isRolling
                ? "dice-shake 0.1s linear infinite"
                : isDone
                ? "dice-land 0.4s ease-out forwards"
                : "none",
            }}
          />
          {/* Number — stays upright */}
          <span
            className={`relative z-10 font-display font-black tabular-nums transition-colors ${sz.inner} ${
              isDone ? "text-[#39ff14]" : "text-[#ffd700]"
            }`}
            style={{
              animation: isRolling ? "dice-number-flip 0.12s linear infinite" : "none",
              textShadow: isRolling ? "0 0 8px #ffd700" : isDone ? "0 0 8px #39ff14" : "none",
            }}
          >
            {display ?? "?"}
          </span>
        </div>
      </div>

      {/* Label below die */}
      <div className={`font-mono tracking-widest uppercase text-center leading-tight ${sz.label}`}>
        {isRolling ? (
          <span className="text-[#ffd700] animate-pulse">rolando...</span>
        ) : isDone ? (
          <span className="text-[#39ff14]" style={{ animation: "dice-result-in 0.3s ease-out" }}>
            resultado!
          </span>
        ) : (
          <span className="text-[#4a4a5a] group-hover:text-[#ffd700] transition-colors">
            {label}
          </span>
        )}
      </div>
    </button>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

// Map: tableId → selected option string
type PersonalityChoices = Record<string, string | null>;

interface EnemyChoice {
  who: string | null;
  cause: string | null;
  power: string | null;
  revenge: string | null;
}

interface CharacterDraft {
  name: string;
  roleId: string | null;
  culturalOriginId: string | null;
  selectedLanguage: string | null;
  personality: PersonalityChoices;
  roleLifepath: Record<string, string | null>;
  templateIndex: number;
  friends: (string | null)[];
  enemies: EnemyChoice[];
  tragicLoves: (string | null)[];
  gearChoices: Record<string, string>;   // choiceGroupId → item name
  cywarChoices: Record<string, string>;  // choiceGroupId → item name
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calcHP(statValues: Record<StatKey, number>) {
  return 10 + 5 * Math.ceil((statValues.WILL + statValues.BODY) / 2);
}

function calcHumanity(empValue: number) {
  return empValue * 10;
}

const statGroupColors: Record<string, string> = {
  mental: "text-[#00f5ff]",
  combat: "text-[#ff0080]",
  physical: "text-[#39ff14]",
  fortune: "text-[#ffd700]",
};

const stepTitles = [
  "Boas-vindas",
  "Escolha seu Papel",
  "Sua Identidade",
  "Personalidade",
  "Lifepath do Papel",
  "Seus Atributos",
  "Seu Equipamento",
  "Resumo Final",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function DisclaimerBanner() {
  return (
    <div className="border border-[#ffd70040] bg-[#ffd70008] px-4 py-3 mb-6 font-mono text-xs text-[#ffd700] leading-relaxed">
      <span className="font-semibold tracking-wider">⚠ NOTA SOBRE TRADUÇÃO:</span>{" "}
      Cyberpunk RED não possui tradução oficial para o português brasileiro. Todos os
      termos, nomes de habilidades e equipamentos neste guia são{" "}
      <span className="underline">adaptações não-oficiais</span> criadas para facilitar
      o aprendizado. Termos em inglês (como &ldquo;Solo&rdquo;, &ldquo;Netrunner&rdquo;,
      &ldquo;Eurobucks&rdquo;) são nomes canônicos e foram mantidos.
    </div>
  );
}

function WizardProgress({ step, onGoTo }: { step: Step; onGoTo: (s: Step) => void }) {
  return (
    <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
      {stepTitles.map((title, i) => {
        const isActive = i === step;
        const isDone = i < step;
        return (
          <button
            key={i}
            onClick={() => isDone && onGoTo(i as Step)}
            disabled={!isDone}
            className={`flex items-center gap-1 shrink-0 ${isDone ? "cursor-pointer" : "cursor-default"}`}
          >
            <div
              className={`w-6 h-6 flex items-center justify-center text-xs font-mono border transition-colors ${
                isActive
                  ? "bg-[#00f5ff] text-[#0a0a0f] border-[#00f5ff]"
                  : isDone
                  ? "bg-[#00f5ff22] text-[#00f5ff] border-[#00f5ff]"
                  : "bg-transparent text-[#4a4a5a] border-[#1e1e2e]"
              }`}
            >
              {isDone ? "✓" : i + 1}
            </div>
            <span
              className={`text-xs font-mono tracking-wide hidden sm:block ${
                isActive ? "text-[#00f5ff]" : isDone ? "text-[#8a8a9a]" : "text-[#4a4a5a]"
              }`}
            >
              {title}
            </span>
            {i < stepTitles.length - 1 && (
              <div className={`w-4 h-px ml-1 ${isDone ? "bg-[#00f5ff44]" : "bg-[#1e1e2e]"}`} />
            )}
          </button>
        );
      })}
    </div>
  );
}

function NavButtons({
  step,
  onBack,
  onNext,
  nextDisabled = false,
  nextLabel = "Próximo →",
}: {
  step: Step;
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="flex justify-between mt-8 pt-6 border-t border-[#1e1e2e]">
      {step > 0 ? (
        <button
          onClick={onBack}
          className="font-mono text-sm text-[#8a8a9a] border border-[#1e1e2e] px-4 py-2 hover:text-[#e0e0e0] hover:border-[#4a4a5a] transition-colors"
        >
          ← Voltar
        </button>
      ) : (
        <div />
      )}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={`font-mono text-sm px-6 py-2 border transition-colors ${
          nextDisabled
            ? "text-[#4a4a5a] border-[#1e1e2e] cursor-not-allowed"
            : "text-[#0a0a0f] bg-[#00f5ff] border-[#00f5ff] hover:bg-[#00f5ffcc] font-semibold"
        }`}
      >
        {nextLabel}
      </button>
    </div>
  );
}

// ─── Step 0: Boas-vindas ──────────────────────────────────────────────────────

function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <DisclaimerBanner />
      <div className="mb-8">
        <p className="text-xs font-mono text-[#4a4a5a] tracking-widest uppercase mb-3">
          &gt; Sistema de Criação
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-[#00f5ff] tracking-widest uppercase mb-4">
          Ratos de Rua
        </h1>
        <p className="text-[#ffd700] font-mono text-sm mb-6 italic">
          &ldquo;Você não escolheu Night City. Night City escolheu você.&rdquo;
        </p>
        <div className="space-y-4 text-[#8a8a9a] font-mono text-sm leading-relaxed">
          <p>
            Bem-vindo ao assistente de criação de personagem do{" "}
            <span className="text-[#e0e0e0]">Cyberpunk RED</span>. Este guia foi feito
            para jogadores que estão começando agora — você não precisa saber nada sobre
            o sistema para criar um personagem aqui.
          </p>
          <p>
            Vamos usar o método{" "}
            <span className="text-[#39ff14] font-semibold">Ratos de Rua</span> (
            <span className="text-[#4a4a5a]">Streetrat</span> no original em inglês) —
            o mais rápido e indicado para iniciantes. Nele, os atributos e equipamentos
            já vêm pré-definidos de acordo com seu papel, então você pode focar em
            entender o personagem, não em calcular números.
          </p>
        </div>
      </div>

      {/* O que é o método Ratos de Rua */}
      <div className="border border-[#39ff1430] bg-[#39ff1408] p-4 mb-6">
        <h3 className="font-mono text-[#39ff14] font-semibold mb-3 tracking-wider">
          O QUE É O MÉTODO RATOS DE RUA?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "⚡", title: "Rápido", desc: "Personagem pronto em minutos. Ideal para a primeira sessão." },
            { icon: "🎯", title: "Balanceado", desc: "Os atributos são otimizados para o seu papel. Você vai funcionar bem desde o início." },
            { icon: "📖", title: "Para iniciantes", desc: "Cada escolha é explicada. Você aprende o sistema enquanto cria o personagem." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="text-center p-3 border border-[#39ff1420]">
              <div className="text-2xl mb-2">{icon}</div>
              <div className="font-mono text-[#39ff14] text-sm font-semibold mb-1">{title}</div>
              <div className="font-mono text-[#8a8a9a] text-xs">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* O que você vai fazer */}
      <div className="mb-8">
        <h3 className="font-mono text-[#8a8a9a] text-xs tracking-widest uppercase mb-3">
          Você vai:
        </h3>
        <div className="space-y-2">
          {[
            ["1", "Escolher seu Papel", "A profissão/identidade do personagem — define sua habilidade única"],
            ["2", "Definir sua Identidade", "Nome e origem cultural"],
            ["3", "Ver seus Atributos", "Os números que definem o que você é bom"],
            ["4", "Receber seu Equipamento", "Kit pré-montado para o seu papel"],
            ["5", "Ter seu Resumo Final", "Personagem pronto para jogar"],
          ].map(([num, title, desc]) => (
            <div key={num} className="flex items-start gap-3 py-2 border-b border-[#1e1e2e]">
              <span className="text-[#00f5ff] font-mono font-bold text-sm shrink-0">{num}.</span>
              <div>
                <span className="font-mono text-[#e0e0e0] text-sm font-semibold">{title}</span>
                <span className="font-mono text-[#4a4a5a] text-xs ml-2">{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 font-display text-lg tracking-widest uppercase text-[#0a0a0f] bg-[#00f5ff] hover:bg-[#00f5ffcc] transition-colors font-black"
      >
        COMEÇAR A CRIAR &gt;&gt;
      </button>
    </div>
  );
}

// ─── Step 1: Escolher Papel ───────────────────────────────────────────────────

const roleDifficulty: Record<string, { label: string; color: string }> = {
  rockerboy: { label: "Iniciante", color: "text-[#39ff14]" },
  solo: { label: "Iniciante", color: "text-[#39ff14]" },
  netrunner: { label: "Avançado", color: "text-[#ff0080]" },
  tech: { label: "Intermediário", color: "text-[#ffd700]" },
  medtech: { label: "Intermediário", color: "text-[#ffd700]" },
  media: { label: "Iniciante", color: "text-[#39ff14]" },
  exec: { label: "Intermediário", color: "text-[#ffd700]" },
  lawman: { label: "Iniciante", color: "text-[#39ff14]" },
  fixer: { label: "Intermediário", color: "text-[#ffd700]" },
  nomad: { label: "Iniciante", color: "text-[#39ff14]" },
};

const roleEmoji: Record<string, string> = {
  rockerboy: "🎸",
  solo: "⚔️",
  netrunner: "💻",
  tech: "🔧",
  medtech: "🩺",
  media: "📹",
  exec: "💼",
  lawman: "🚔",
  fixer: "🤝",
  nomad: "🏍️",
};

function StepRole({
  selected,
  onSelect,
  onBack,
  onNext,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const selectedRole = roles.find((r) => r.id === selected);

  return (
    <div>
      <DisclaimerBanner />
      <div className="mb-6">
        <h2 className="font-display text-2xl text-[#39ff14] tracking-widest uppercase mb-2">
          Escolha seu Papel
        </h2>
        <p className="font-mono text-[#8a8a9a] text-sm leading-relaxed">
          O Papel (<span className="text-[#4a4a5a]">Role</span>) é a essência do seu personagem — sua profissão,
          identidade e habilidade única. Cada Papel tem uma{" "}
          <span className="text-[#e0e0e0]">Habilidade Especial</span> que só ele possui e que
          nenhum outro personagem pode usar.
        </p>
      </div>

      {/* Dice to pick a random role */}
      <div className="flex items-center gap-4 mb-5 p-3 border border-[#ffd70020] bg-[#ffd70006]">
        <DiceButton
          max={roles.length}
          label="Rolar papel"
          onRoll={(n) => {
            const picked = roles[(n - 1) % roles.length];
            onSelect(picked.id);
            setExpanded(picked.id);
          }}
        />
        <div className="font-mono text-xs text-[#8a8a9a] leading-relaxed">
          <p className="text-[#ffd700] font-semibold mb-0.5">Deixe o destino escolher</p>
          <p>Clique no dado para sortear um Papel aleatório.<br />Você pode ignorar o resultado e escolher manualmente abaixo.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {roles.map((role) => {
          const diff = roleDifficulty[role.id];
          const isSelected = selected === role.id;
          const isExpanded = expanded === role.id;
          return (
            <div key={role.id} className="flex flex-col">
              <button
                onClick={() => {
                  onSelect(role.id);
                  setExpanded(isExpanded ? null : role.id);
                }}
                className={`w-full text-left p-4 border-l-2 transition-all ${
                  isSelected
                    ? "bg-[#39ff1415] border-[#39ff14] border border-l-2"
                    : "bg-[#14141f] border-[#1e1e2e] border border-l-2 border-l-[#4a4a5a] hover:border-l-[#39ff14] hover:bg-[#39ff1408]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{roleEmoji[role.id]}</span>
                    <span className={`font-display text-base tracking-widest uppercase ${isSelected ? "text-[#39ff14]" : "text-[#e0e0e0]"}`}>
                      {role.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs ${diff.color}`}>{diff.label}</span>
                    {isSelected && <span className="text-[#39ff14] font-mono text-xs">✓</span>}
                  </div>
                </div>
                <p className="font-mono text-[#4a4a5a] text-xs italic">{role.tagline}</p>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div className="bg-[#0f0f1a] border border-[#39ff1430] border-t-0 p-4">
                  <p className="font-mono text-[#8a8a9a] text-xs leading-relaxed mb-3">
                    {role.description}
                  </p>
                  <div className="border-t border-[#1e1e2e] pt-3">
                    <p className="text-[#4a4a5a] text-xs uppercase tracking-widest mb-1">
                      Habilidade Especial
                    </p>
                    <p className="text-[#39ff14] text-xs font-mono font-semibold">
                      {role.abilityName}
                    </p>
                    <p className="text-[#8a8a9a] text-xs font-mono mt-1 leading-relaxed">
                      {role.specialAbility}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedRole && (
        <div className="border border-[#39ff1440] bg-[#39ff1408] p-4 mb-2">
          <p className="font-mono text-[#39ff14] text-sm">
            <strong>{selectedRole.name}</strong> selecionado. Clique em &ldquo;Próximo&rdquo; para continuar.
          </p>
        </div>
      )}

      <NavButtons
        step={1}
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!selected}
      />
    </div>
  );
}

// ─── Step 2: Identidade ───────────────────────────────────────────────────────

function StepIdentity({
  name,
  culturalOriginId,
  selectedLanguage,
  onChangeName,
  onChangeCultural,
  onChangeLanguage,
  onBack,
  onNext,
}: {
  name: string;
  culturalOriginId: string | null;
  selectedLanguage: string | null;
  onChangeName: (v: string) => void;
  onChangeCultural: (v: string) => void;
  onChangeLanguage: (v: string | null) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const selectedOrigin = culturalOrigins.find((o) => o.id === culturalOriginId);
  const canProceed = !!name.trim() && !!culturalOriginId && !!selectedLanguage;

  // Manual region selection: reset language so user picks manually
  function handleManualOriginChange(id: string) {
    onChangeCultural(id);
    onChangeLanguage(null);
  }

  // Dice roll: region + random language are picked together automatically
  function handleDiceRollRegion(n: number) {
    const origin = culturalOrigins[n - 1];
    onChangeCultural(origin.id);
    const randomLang = origin.languages[Math.floor(Math.random() * origin.languages.length)];
    onChangeLanguage(randomLang);
  }

  return (
    <div>
      <DisclaimerBanner />
      <h2 className="font-display text-2xl text-[#00f5ff] tracking-widest uppercase mb-2">
        Sua Identidade
      </h2>
      <p className="font-mono text-[#8a8a9a] text-sm mb-6 leading-relaxed">
        Todo personagem tem um nome e uma história. A origem cultural determina o idioma nativo — você começa com <span className="text-[#e0e0e0]">Nível 4</span> nesse idioma gratuitamente.
        Se quiser um idioma que não consta na lista, o livro permite escolher qualquer outro que faça sentido.
      </p>

      {/* Nome */}
      <div className="mb-8">
        <label className="block font-mono text-xs text-[#4a4a5a] uppercase tracking-widest mb-2">
          1. Nome do Personagem
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder="Ex: Maya Sousa, Viktor Chen, Anya Kovač..."
            maxLength={40}
            className="flex-1 bg-[#0f0f1a] border border-[#1e1e2e] focus:border-[#00f5ff] text-[#e0e0e0] font-mono text-base px-4 py-3 outline-none transition-colors placeholder:text-[#2a2a3a]"
          />
          <DiceButton
            max={FIRST_NAMES.length}
            label="gerar nome"
            size="sm"
            onRoll={() => onChangeName(randomName())}
          />
        </div>
        <p className="font-mono text-[#4a4a5a] text-xs mt-1">
          Clique no dado para sortear um nome cyberpunk aleatório — ou escreva o seu.
        </p>
      </div>

      {/* Região Cultural — passo 2 */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
          <label className="block font-mono text-xs text-[#4a4a5a] uppercase tracking-widest">
            2. Região de Origem (1d10)
          </label>
          <DiceButton
            max={10}
            label="rolar região"
            size="sm"
            onRoll={handleDiceRollRegion}
          />
        </div>
        <p className="font-mono text-[#8a8a9a] text-xs mb-3">
          Role 1d10 — região <span className="text-[#00f5ff]">e idioma</span> serão sorteados juntos.
          Ou escolha manualmente abaixo e depois selecione o idioma.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {culturalOrigins.map((origin) => {
            const isSelected = culturalOriginId === origin.id;
            return (
              <button
                key={origin.id}
                onClick={() => handleManualOriginChange(origin.id)}
                className={`text-left p-3 border transition-all ${
                  isSelected
                    ? "border-[#00f5ff] bg-[#00f5ff11] border-l-2 border-l-[#00f5ff]"
                    : "border-[#1e1e2e] bg-[#14141f] hover:border-[#00f5ff44] border-l-2 border-l-[#4a4a5a]"
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#4a4a5a] text-xs shrink-0">{origin.roll}.</span>
                    <span className={`font-mono text-sm font-semibold ${isSelected ? "text-[#00f5ff]" : "text-[#e0e0e0]"}`}>
                      {origin.name}
                    </span>
                  </div>
                  {isSelected && <span className="text-[#00f5ff] text-xs">✓</span>}
                </div>
                <p className="font-mono text-[#4a4a5a] text-xs leading-relaxed pl-5">{origin.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Flavor da origem selecionada */}
      {selectedOrigin && (
        <div className="border-l-2 border-[#00f5ff30] pl-3 py-1 mb-6 font-mono text-xs text-[#8a8a9a] italic">
          &ldquo;{selectedOrigin.flavor}&rdquo;
        </div>
      )}

      {/* Idioma — aparece após selecionar a região */}
      {selectedOrigin && (
        <div className="mb-6 border border-[#1e1e2e] bg-[#0f0f1a] p-4">
          <div className="mb-2">
            <label className="font-mono text-xs text-[#4a4a5a] uppercase tracking-widest">
              3. Idioma Nativo{" "}
              <span className="text-[#00f5ff]">
                ({selectedOrigin.languages.length} disponíveis em {selectedOrigin.name})
              </span>
            </label>
          </div>
          <p className="font-mono text-[#8a8a9a] text-xs mb-3">
            {selectedLanguage
              ? "Sorteado pelo dado ou clique em outro idioma para trocar."
              : "Clique para escolher. Se rolou o dado acima, o idioma já foi sorteado automaticamente."}
            {" "}Você começa com <span className="text-[#00f5ff]">Nível 4</span> gratuitamente.
            Se quiser um idioma fora dessa lista, anote manualmente — o livro permite.
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedOrigin.languages.map((lang) => {
              const isSelected = selectedLanguage === lang;
              return (
                <button
                  key={lang}
                  onClick={() => onChangeLanguage(lang)}
                  className={`px-3 py-1.5 font-mono text-sm border transition-all ${
                    isSelected
                      ? "bg-[#00f5ff] text-[#0a0a0f] border-[#00f5ff] font-semibold"
                      : "text-[#8a8a9a] border-[#1e1e2e] hover:border-[#00f5ff44] hover:text-[#e0e0e0]"
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>
          {selectedLanguage && (
            <div className="mt-3 pt-3 border-t border-[#1e1e2e] flex items-center gap-2">
              <span className="font-mono text-[#00f5ff] text-xs">✓</span>
              <span className="font-mono text-[#e0e0e0] text-sm">
                <strong>{selectedLanguage}</strong>
                <span className="text-[#4a4a5a]"> — Nível 4 (gratuito)</span>
              </span>
            </div>
          )}
        </div>
      )}

      {/* Aviso se faltam etapas */}
      {!canProceed && (
        <p className="font-mono text-xs text-[#4a4a5a] mb-4">
          {!name.trim() && "→ Preencha o nome.  "}
          {!culturalOriginId && "→ Escolha uma região.  "}
          {culturalOriginId && !selectedLanguage && "→ Escolha um idioma."}
        </p>
      )}

      <NavButtons
        step={2}
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!canProceed}
      />
    </div>
  );
}

// ─── Step 3: Personalidade ────────────────────────────────────────────────────

const PERSONALITY_GROUPS = [
  {
    groupTitle: "Temperamento",
    color: "purple" as const,
    ids: ["personality"],
  },
  {
    groupTitle: "Visual e Estilo",
    color: "pink" as const,
    ids: ["clothing", "hairstyle", "affectation"],
  },
  {
    groupTitle: "Valores e Visão de Mundo",
    color: "cyan" as const,
    ids: ["value-most", "people-philosophy", "valued-person", "valued-possession"],
  },
  {
    groupTitle: "Histórico Familiar",
    color: "yellow" as const,
    ids: ["family-background", "childhood-env", "family-crisis"],
  },
  {
    groupTitle: "Objetivo de Vida",
    color: "green" as const,
    ids: ["life-goals"],
  },
];

const groupColorMap = {
  green: {
    header: "text-[#39ff14]",
    border: "border-[#39ff1430]",
    bg: "bg-[#39ff1408]",
    selected: "bg-[#39ff14] text-[#0a0a0f] border-[#39ff14] font-semibold",
    unselected: "text-[#8a8a9a] border-[#1e1e2e] hover:border-[#39ff1444] hover:text-[#e0e0e0]",
  },
  purple: {
    header: "text-[#bf00ff]",
    border: "border-[#bf00ff30]",
    bg: "bg-[#bf00ff08]",
    selected: "bg-[#bf00ff] text-[#0a0a0f] border-[#bf00ff] font-semibold",
    unselected: "text-[#8a8a9a] border-[#1e1e2e] hover:border-[#bf00ff44] hover:text-[#e0e0e0]",
  },
  pink: {
    header: "text-[#ff0080]",
    border: "border-[#ff008030]",
    bg: "bg-[#ff008008]",
    selected: "bg-[#ff0080] text-[#0a0a0f] border-[#ff0080] font-semibold",
    unselected: "text-[#8a8a9a] border-[#1e1e2e] hover:border-[#ff008044] hover:text-[#e0e0e0]",
  },
  cyan: {
    header: "text-[#00f5ff]",
    border: "border-[#00f5ff30]",
    bg: "bg-[#00f5ff08]",
    selected: "bg-[#00f5ff] text-[#0a0a0f] border-[#00f5ff] font-semibold",
    unselected: "text-[#8a8a9a] border-[#1e1e2e] hover:border-[#00f5ff44] hover:text-[#e0e0e0]",
  },
  yellow: {
    header: "text-[#ffd700]",
    border: "border-[#ffd70030]",
    bg: "bg-[#ffd70008]",
    selected: "bg-[#ffd700] text-[#0a0a0f] border-[#ffd700] font-semibold",
    unselected: "text-[#8a8a9a] border-[#1e1e2e] hover:border-[#ffd70044] hover:text-[#e0e0e0]",
  },
};

function StepPersonality({
  choices,
  onChange,
  onRollAll,
  friends = [],
  enemies = [],
  tragicLoves = [],
  onSetFriends,
  onSetEnemies,
  onSetTragicLoves,
  onBack,
  onNext,
}: {
  choices: PersonalityChoices;
  onChange: (tableId: string, value: string) => void;
  onRollAll: () => void;
  friends: (string | null)[];
  enemies: EnemyChoice[];
  tragicLoves: (string | null)[];
  onSetFriends: (f: (string | null)[]) => void;
  onSetEnemies: (e: EnemyChoice[]) => void;
  onSetTragicLoves: (t: (string | null)[]) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const totalTables = allPersonalityTables.length;
  const filled = allPersonalityTables.filter((t) => !!choices[t.id]).length;

  function setFriendCount(n: number) {
    const next = friends.slice(0, n);
    while (next.length < n) next.push(null);
    onSetFriends(next);
  }

  function setFriend(i: number, val: string) {
    const next = [...friends];
    next[i] = val;
    onSetFriends(next);
  }

  function setEnemyCount(n: number) {
    const next = enemies.slice(0, n);
    while (next.length < n) next.push({ who: null, cause: null, power: null, revenge: null });
    onSetEnemies(next);
  }

  function setEnemyField(i: number, field: keyof EnemyChoice, val: string) {
    onSetEnemies(enemies.map((e, idx) => (idx === i ? { ...e, [field]: val } : e)));
  }

  function setTragicLoveCount(n: number) {
    const next = tragicLoves.slice(0, n);
    while (next.length < n) next.push(null);
    onSetTragicLoves(next);
  }

  function setTragicLove(i: number, val: string) {
    const next = [...tragicLoves];
    next[i] = val;
    onSetTragicLoves(next);
  }

  return (
    <div>
      <DisclaimerBanner />
      <div className="mb-6">
        <h2 className="font-display text-2xl text-[#bf00ff] tracking-widest uppercase mb-2">
          Personalidade
        </h2>
        <p className="font-mono text-[#8a8a9a] text-sm leading-relaxed mb-3">
          O Caminho de Vida (<span className="text-[#4a4a5a]">Lifepath</span>) define quem seu personagem é além das
          estatísticas. Cada tabela usa um <span className="text-[#ffd700]">1d10</span> — role ou escolha.
          Todas as escolhas são <span className="text-[#e0e0e0]">opcionais</span>: use só o que quiser,
          pule o que não fizer sentido para seu personagem.
        </p>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="font-mono text-xs text-[#4a4a5a]">
            {filled}/{totalTables} definidos
          </p>
          <div className="flex items-center gap-3">
            <DiceButton
              max={10}
              label="rolar tudo"
              size="md"
              onRoll={onRollAll}
            />
            <div className="font-mono text-xs text-[#8a8a9a] leading-tight max-w-[160px]">
              <p className="text-[#ffd700] font-semibold">Rolar Tudo</p>
              <p>Sorteia todas as 11 tabelas de uma vez</p>
            </div>
          </div>
        </div>
      </div>

      {/* Personality groups */}
      <div className="space-y-8">
        {PERSONALITY_GROUPS.map((group) => {
          const gc = groupColorMap[group.color];
          const tables = allPersonalityTables.filter((t) => group.ids.includes(t.id));
          return (
            <div key={group.groupTitle} className={`border ${gc.border} ${gc.bg} p-4`}>
              <h3 className={`font-display text-sm tracking-widest uppercase ${gc.header} mb-4`}>
                {group.groupTitle}
              </h3>
              <div className="space-y-5">
                {tables.map((table) => {
                  const selected = choices[table.id] ?? null;
                  return (
                    <div key={table.id}>
                      <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
                        <div className="flex-1">
                          <p className={`font-mono text-sm font-semibold ${gc.header}`}>
                            {table.title}
                          </p>
                          <p className="font-mono text-xs text-[#4a4a5a] leading-relaxed mt-0.5">
                            {table.subtitle}
                          </p>
                        </div>
                        <DiceButton
                          max={10}
                          label="1d10"
                          size="sm"
                          onRoll={(n) => onChange(table.id, table.options[n - 1])}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
                        {table.options.map((opt, i) => {
                          const isSelected = selected === opt;
                          return (
                            <button
                              key={i}
                              onClick={() => onChange(table.id, opt)}
                              className={`text-left px-3 py-2 font-mono text-xs border transition-all ${
                                isSelected ? gc.selected : gc.unselected
                              }`}
                            >
                              <span className="opacity-40 mr-1">{i + 1}.</span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {selected && (
                        <p className={`font-mono text-xs mt-1 ${gc.header} opacity-70`}>
                          ✓ {selected}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* ── Amigos ────────────────────────────────────────────────────────── */}
        <div className="border border-[#39ff1430] bg-[#39ff1408] p-4">
          <h3 className="font-display text-sm tracking-widest uppercase text-[#39ff14] mb-2">
            Amigos
          </h3>
          <p className="font-mono text-xs text-[#4a4a5a] mb-4 leading-relaxed">
            Role <span className="text-[#ffd700]">1d10 − 7</span> (mínimo 0) para saber quantos
            amigos seu personagem tem — resultado 1–7 = 0 amigos, 8 = 1, 9 = 2, 10 = 3.
            Para cada amigo, defina o tipo de vínculo.
          </p>

          <div className="flex items-center gap-4 mb-5 flex-wrap">
            <DiceButton
              max={10}
              label="1d10 − 7"
              size="sm"
              onRoll={(n) => setFriendCount(Math.max(0, n - 7))}
            />
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] text-[#4a4a5a] uppercase tracking-widest">
                ou escolha manualmente:
              </span>
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => setFriendCount(n)}
                    className={`w-9 h-9 font-display text-base border transition-all ${
                      friends.length === n
                        ? "bg-[#39ff14] text-[#0a0a0f] border-[#39ff14] font-semibold"
                        : "text-[#8a8a9a] border-[#1e1e2e] hover:border-[#39ff1444] hover:text-[#e0e0e0]"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {friends.length === 0 ? (
            <p className="font-mono text-xs text-[#4a4a5a] italic border border-[#1e1e2e] px-3 py-2">
              Nenhum amigo — avançando para Inimigos.
            </p>
          ) : (
            <div className="space-y-5">
              {friends.map((rel, i) => (
                <div key={i} className="border border-[#39ff1420] p-3">
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <div>
                      <p className="font-mono text-sm font-semibold text-[#39ff14]">
                        Amigo {i + 1} — {friendRelationships.title}
                      </p>
                      <p className="font-mono text-[10px] text-[#4a4a5a] mt-0.5">
                        {friendRelationships.subtitle}
                      </p>
                    </div>
                    <DiceButton
                      max={10}
                      label="1d10"
                      size="sm"
                      onRoll={(n) => setFriend(i, friendRelationships.options[n - 1])}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {friendRelationships.options.map((opt, j) => (
                      <button
                        key={j}
                        onClick={() => setFriend(i, opt)}
                        className={`text-left px-3 py-2 font-mono text-xs border transition-all ${
                          rel === opt
                            ? "bg-[#39ff14] text-[#0a0a0f] border-[#39ff14] font-semibold"
                            : "text-[#8a8a9a] border-[#1e1e2e] hover:border-[#39ff1444] hover:text-[#e0e0e0]"
                        }`}
                      >
                        <span className="opacity-40 mr-1">{j + 1}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {rel && (
                    <p className="font-mono text-xs mt-2 text-[#39ff14] opacity-70">✓ {rel}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Amores Trágicos ───────────────────────────────────────────────── */}
        <div className="border border-[#ffd70030] bg-[#ffd70008] p-4">
          <h3 className="font-display text-sm tracking-widest uppercase text-[#ffd700] mb-2">
            Amores Trágicos
          </h3>
          <p className="font-mono text-xs text-[#4a4a5a] mb-4 leading-relaxed">
            Night City não tem finais felizes. Role{" "}
            <span className="text-[#ffd700]">1d10 − 7</span> (mínimo 0) para saber quantos
            amores trágicos seu personagem teve. Para cada um, role ou escolha o desfecho.
          </p>

          <div className="flex items-center gap-4 mb-5 flex-wrap">
            <DiceButton
              max={10}
              label="1d10 − 7"
              size="sm"
              onRoll={(n) => setTragicLoveCount(Math.max(0, n - 7))}
            />
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] text-[#4a4a5a] uppercase tracking-widest">
                ou escolha manualmente:
              </span>
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => setTragicLoveCount(n)}
                    className={`w-9 h-9 font-display text-base border transition-all ${
                      tragicLoves.length === n
                        ? "bg-[#ffd700] text-[#0a0a0f] border-[#ffd700] font-semibold"
                        : "text-[#8a8a9a] border-[#1e1e2e] hover:border-[#ffd70044] hover:text-[#e0e0e0]"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {tragicLoves.length === 0 ? (
            <p className="font-mono text-xs text-[#4a4a5a] italic border border-[#1e1e2e] px-3 py-2">
              Nenhum amor trágico registrado.
            </p>
          ) : (
            <div className="space-y-5">
              {tragicLoves.map((ending, i) => (
                <div key={i} className="border border-[#ffd70020] p-3">
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <div>
                      <p className="font-mono text-sm font-semibold text-[#ffd700]">
                        Amor Trágico {i + 1} — {tragicLoveEndings.title}
                      </p>
                      <p className="font-mono text-[10px] text-[#4a4a5a] mt-0.5">
                        {tragicLoveEndings.subtitle}
                      </p>
                    </div>
                    <DiceButton
                      max={10}
                      label="1d10"
                      size="sm"
                      onRoll={(n) => setTragicLove(i, tragicLoveEndings.options[n - 1])}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {tragicLoveEndings.options.map((opt, j) => (
                      <button
                        key={j}
                        onClick={() => setTragicLove(i, opt)}
                        className={`text-left px-3 py-2 font-mono text-xs border transition-all ${
                          ending === opt
                            ? "bg-[#ffd700] text-[#0a0a0f] border-[#ffd700] font-semibold"
                            : "text-[#8a8a9a] border-[#1e1e2e] hover:border-[#ffd70044] hover:text-[#e0e0e0]"
                        }`}
                      >
                        <span className="opacity-40 mr-1">{j + 1}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {ending && (
                    <p className="font-mono text-xs mt-2 text-[#ffd700] opacity-70">
                      ✓ {ending}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Inimigos ──────────────────────────────────────────────────────── */}
        <div className="border border-[#ff008030] bg-[#ff008008] p-4">
          <h3 className="font-display text-sm tracking-widest uppercase text-[#ff0080] mb-2">
            Inimigos
          </h3>
          <p className="font-mono text-xs text-[#4a4a5a] mb-4 leading-relaxed">
            Role <span className="text-[#ffd700]">1d10 − 7</span> (mínimo 0) para saber quantos
            inimigos seu personagem tem. Para cada inimigo, role nas quatro tabelas abaixo.
          </p>

          <div className="flex items-center gap-4 mb-5 flex-wrap">
            <DiceButton
              max={10}
              label="1d10 − 7"
              size="sm"
              onRoll={(n) => setEnemyCount(Math.max(0, n - 7))}
            />
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] text-[#4a4a5a] uppercase tracking-widest">
                ou escolha manualmente:
              </span>
              <div className="flex gap-2">
                {[0, 1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => setEnemyCount(n)}
                    className={`w-9 h-9 font-display text-base border transition-all ${
                      enemies.length === n
                        ? "bg-[#ff0080] text-[#0a0a0f] border-[#ff0080] font-semibold"
                        : "text-[#8a8a9a] border-[#1e1e2e] hover:border-[#ff008044] hover:text-[#e0e0e0]"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {enemies.length === 0 ? (
            <p className="font-mono text-xs text-[#4a4a5a] italic border border-[#1e1e2e] px-3 py-2">
              Nenhum inimigo registrado.
            </p>
          ) : (
            <div className="space-y-6">
              {enemies.map((enemy, i) => {
                const subTables: { field: keyof EnemyChoice; table: typeof enemyWho }[] = [
                  { field: "who", table: enemyWho },
                  { field: "cause", table: enemyCause },
                  { field: "power", table: enemyPower },
                  { field: "revenge", table: enemyRevenge },
                ];
                return (
                  <div key={i} className="border border-[#ff008030] p-3">
                    <p className="font-mono text-sm font-semibold text-[#ff0080] mb-4">
                      Inimigo {i + 1}
                    </p>
                    <div className="space-y-4">
                      {subTables.map(({ field, table }) => (
                        <div key={field}>
                          <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
                            <div className="flex-1">
                              <p className="font-mono text-xs font-semibold text-[#ff0080]">
                                {table.title}
                              </p>
                              <p className="font-mono text-[10px] text-[#4a4a5a] leading-relaxed mt-0.5">
                                {table.subtitle}
                              </p>
                            </div>
                            <DiceButton
                              max={10}
                              label="1d10"
                              size="sm"
                              onRoll={(n) => setEnemyField(i, field, table.options[n - 1])}
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-1">
                            {table.options.map((opt, j) => (
                              <button
                                key={j}
                                onClick={() => setEnemyField(i, field, opt)}
                                className={`text-left px-3 py-2 font-mono text-xs border transition-all ${
                                  enemy[field] === opt
                                    ? "bg-[#ff0080] text-[#0a0a0f] border-[#ff0080] font-semibold"
                                    : "text-[#8a8a9a] border-[#1e1e2e] hover:border-[#ff008044] hover:text-[#e0e0e0]"
                                }`}
                              >
                                <span className="opacity-40 mr-1">{j + 1}.</span>
                                {opt}
                              </button>
                            ))}
                          </div>
                          {enemy[field] && (
                            <p className="font-mono text-xs mt-1 text-[#ff0080] opacity-70">
                              ✓ {enemy[field]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <NavButtons
        step={3}
        onBack={onBack}
        onNext={onNext}
        nextLabel="Próximo →"
      />
    </div>
  );
}

// ─── Step 4: Lifepath do Papel ────────────────────────────────────────────────

function StepRoleLifepath({
  roleId,
  choices,
  onChange,
  onBack,
  onNext,
}: {
  roleId: string;
  choices: Record<string, string | null>;
  onChange: (id: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const lifepath = getRoleLifepath(roleId);
  const role = roles.find((r) => r.id === roleId)!;

  if (!lifepath) {
    return (
      <div>
        <p className="font-mono text-[#8a8a9a] text-sm">
          Lifepath não disponível para este papel.
        </p>
        <NavButtons step={4} onBack={onBack} onNext={onNext} />
      </div>
    );
  }

  const visibleTables = lifepath.tables.filter((t) => {
    if (!t.showIf) return true;
    return choices[t.showIf.id] === t.showIf.value;
  });

  const filled = visibleTables.filter((t) => t.die !== "choose" && !!choices[t.id]).length;
  const total = visibleTables.filter((t) => t.die !== "choose").length;

  return (
    <div>
      <DisclaimerBanner />
      <div className="mb-6">
        <h2 className="font-display text-2xl text-[#00f5ff] tracking-widest uppercase mb-2">
          Lifepath do Papel
        </h2>
        <p className="font-mono text-[#8a8a9a] text-sm leading-relaxed mb-2">
          Cada papel tem uma história específica. Essas tabelas descrevem quem você é{" "}
          <span className="text-[#e0e0e0]">dentro</span> do seu papel — clientes, território,
          parceiros, inimigos profissionais. Role ou escolha.
        </p>
        <div className="flex items-center gap-3 border border-[#00f5ff20] bg-[#00f5ff08] px-4 py-2">
          <span className="text-2xl">{roleEmoji[roleId]}</span>
          <div>
            <p className="font-display text-sm text-[#00f5ff] tracking-widest uppercase">
              {role.name}
            </p>
            <p className="font-mono text-xs text-[#4a4a5a] italic">{lifepath.flavor}</p>
          </div>
          <div className="ml-auto font-mono text-xs text-[#4a4a5a]">
            {filled}/{total} definidos
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {visibleTables.map((table) => {
          const selected = choices[table.id] ?? null;

          if (table.die === "choose") {
            return (
              <div key={table.id}>
                <p className="font-mono text-sm font-semibold text-[#00f5ff] mb-1">
                  {table.title}
                </p>
                {table.subtitle && (
                  <p className="font-mono text-xs text-[#4a4a5a] mb-3">{table.subtitle}</p>
                )}
                <div className="flex gap-2 flex-wrap">
                  {table.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => onChange(table.id, opt)}
                      className={`px-5 py-2.5 font-mono text-sm border transition-all ${
                        selected === opt
                          ? "bg-[#00f5ff] text-[#0a0a0f] border-[#00f5ff] font-semibold"
                          : "text-[#8a8a9a] border-[#1e1e2e] hover:border-[#00f5ff44] hover:text-[#e0e0e0]"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {selected && (
                  <p className="font-mono text-xs mt-1 text-[#00f5ff] opacity-70">
                    ✓ {selected}
                  </p>
                )}
              </div>
            );
          }

          return (
            <div key={table.id} className="border border-[#00f5ff20] bg-[#00f5ff06] p-4">
              <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
                <div className="flex-1">
                  <p className="font-mono text-sm font-semibold text-[#00f5ff]">
                    {table.title}
                  </p>
                  {table.subtitle && (
                    <p className="font-mono text-xs text-[#4a4a5a] leading-relaxed mt-0.5">
                      {table.subtitle}
                    </p>
                  )}
                </div>
                <DiceButton
                  max={table.die === "1d10" ? 10 : 6}
                  label={table.die}
                  size="sm"
                  onRoll={(n) => onChange(table.id, table.options[n - 1])}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
                {table.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => onChange(table.id, opt)}
                    className={`text-left px-3 py-2 font-mono text-xs border transition-all ${
                      selected === opt
                        ? "bg-[#00f5ff] text-[#0a0a0f] border-[#00f5ff] font-semibold"
                        : "text-[#8a8a9a] border-[#1e1e2e] hover:border-[#00f5ff44] hover:text-[#e0e0e0]"
                    }`}
                  >
                    <span className="opacity-40 mr-1">{i + 1}.</span>
                    {opt}
                  </button>
                ))}
              </div>
              {selected && (
                <p className="font-mono text-xs mt-2 text-[#00f5ff] opacity-70">
                  ✓ {selected}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <NavButtons step={4} onBack={onBack} onNext={onNext} />
    </div>
  );
}

// ─── Step 5: Atributos ────────────────────────────────────────────────────────

function StepStats({
  roleId,
  templateIndex,
  onChangeTemplate,
  onBack,
  onNext,
}: {
  roleId: string;
  templateIndex: number;
  onChangeTemplate: (i: number) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const pkg = streetratPackages.find((p) => p.roleId === roleId)!;
  const template = pkg.statTemplates[templateIndex];
  const role = roles.find((r) => r.id === roleId)!;
  const hp = calcHP(template.stats);
  const humanity = calcHumanity(template.stats.EMP);

  const [openStat, setOpenStat] = useState<StatKey | null>(null);

  return (
    <div>
      <DisclaimerBanner />
      <h2 className="font-display text-2xl text-[#ff0080] tracking-widest uppercase mb-2">
        Seus Atributos
      </h2>
      <p className="font-mono text-[#8a8a9a] text-sm mb-4 leading-relaxed">
        Atributos (<span className="text-[#4a4a5a]">STATs</span>) são os números que definem o que
        seu personagem é capaz de fazer. Valores altos = melhor. O máximo na criação é{" "}
        <span className="text-[#e0e0e0]">8</span>. No método Ratos de Rua, os atributos vêm
        pré-definidos e já são otimizados para o papel escolhido.
      </p>

      {/* Role banner */}
      <div className="flex items-start gap-3 border border-[#ff008020] bg-[#ff008008] px-4 py-3 mb-6">
        <span className="text-2xl leading-none mt-0.5">{roleEmoji[roleId]}</span>
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm text-[#ff0080] tracking-widest uppercase mb-1">
            {role.name} — {role.namePtBr}
          </p>
          <p className="font-mono text-xs text-[#4a4a5a] leading-relaxed">{pkg.survivorTip}</p>
        </div>
      </div>

      {/* Template selector */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
          <p className="font-mono text-xs text-[#4a4a5a] uppercase tracking-widest">
            Variação de atributos — escolha ou role:
          </p>
          <DiceButton
            max={pkg.statTemplates.length}
            label="rolar linha"
            size="sm"
            onRoll={(n) => onChangeTemplate((n - 1) % pkg.statTemplates.length)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {pkg.statTemplates.map((tmpl, i) => (
            <button
              key={i}
              onClick={() => onChangeTemplate(i)}
              className={`px-4 py-2 font-mono text-sm border transition-all ${
                templateIndex === i
                  ? "bg-[#ff0080] text-[#0a0a0f] border-[#ff0080] font-semibold"
                  : "text-[#8a8a9a] border-[#1e1e2e] hover:border-[#ff008044] hover:text-[#e0e0e0]"
              }`}
            >
              {tmpl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {stats.map((stat) => {
          const value = template.stats[stat.key];
          const isKey = role.keyStats.includes(stat.key);
          const colorClass = statGroupColors[stat.group] ?? "text-[#e0e0e0]";
          const isOpen = openStat === stat.key;

          return (
            <div key={stat.key} className="flex flex-col">
              <button
                onClick={() => setOpenStat(isOpen ? null : stat.key)}
                className={`p-3 border text-center transition-all ${
                  isKey
                    ? "border-[#ff008044] bg-[#ff008011]"
                    : "border-[#1e1e2e] bg-[#14141f]"
                } hover:border-[#ff008044]`}
              >
                <div className={`font-display text-xs tracking-widest ${colorClass} mb-1`}>
                  {stat.key}
                </div>
                <div className="font-display text-2xl text-[#e0e0e0] font-black">{value}</div>
                {isKey && (
                  <div className="font-mono text-[8px] text-[#ff0080] tracking-widest uppercase mt-1">
                    chave
                  </div>
                )}
                <div className="font-mono text-[10px] text-[#4a4a5a] mt-0.5">
                  {isOpen ? "▲" : "▼"} {isOpen ? "fechar" : "explicar"}
                </div>
              </button>
              {isOpen && (
                <div className="bg-[#0f0f1a] border border-[#1e1e2e] border-t-0 p-3 text-xs font-mono text-[#8a8a9a] leading-relaxed">
                  <p className="text-[#e0e0e0] font-semibold mb-1">{stat.name}</p>
                  <p>{stat.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Derived stats */}
      <div className="border border-[#ff008030] bg-[#ff008008] p-4 mb-6">
        <p className="font-mono text-xs text-[#4a4a5a] uppercase tracking-widest mb-3">
          Valores Derivados — calculados automaticamente a partir dos atributos
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Pontos de Vida (HP)", value: hp, color: "text-[#39ff14]", tip: "Quanto dano você aguenta antes de morrer. Fórmula: 10 + (5 × ⌈(WILL+BODY)/2⌉)" },
            { label: "Humanidade Máx.", value: humanity, color: "text-[#00f5ff]", tip: "Quanto cyberware você pode ter. Fórmula: EMP × 10. Cai ao instalar implantes." },
            { label: "Iniciativa Base", value: template.stats.REF + 10, color: "text-[#ff0080]", tip: "Quanto maior, mais cedo você age em combate. Fórmula: REF + 1d10 no combate." },
            { label: "Hum. Atual", value: `EMP ${template.stats.EMP}`, color: "text-[#bf00ff]", tip: "Sua Empatia atual. Instalar cyberware reduz a Humanidade — que reduz a EMP efetiva." },
          ].map(({ label, value, color, tip }) => (
            <div key={label} className="text-center">
              <div className={`font-display text-2xl font-black ${color}`}>{value}</div>
              <div className="font-mono text-xs text-[#8a8a9a] mt-1">{label}</div>
              <div className="font-mono text-[10px] text-[#4a4a5a] mt-1 leading-tight">{tip}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="border border-[#39ff1420] bg-[#39ff1408] p-4 mb-6">
        {/* Header + formula */}
        <div className="flex items-baseline justify-between flex-wrap gap-2 mb-3">
          <p className="font-mono text-xs text-[#4a4a5a] uppercase tracking-widest">
            Perícias do {role.name}
          </p>
          <p className="font-mono text-xs text-[#8a8a9a]">
            Rolagem:{" "}
            <span className="text-[#ffd700]">1d10</span>
            <span className="text-[#4a4a5a]"> + </span>
            <span className="text-[#00f5ff]">atributo</span>
            <span className="text-[#4a4a5a]"> + </span>
            <span className="text-[#8a8a9a]">rank</span>
            <span className="text-[#4a4a5a]"> vs. DV</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {pkg.skills.map((skill) => {
            const statValue = template.stats[skill.linkedStat];
            const total = statValue + skill.rank;
            const statMeta = stats.find((s) => s.key === skill.linkedStat);
            const statColor = statMeta ? statGroupColors[statMeta.group] : "text-[#e0e0e0]";
            // Color total by DV tier reachable (total + 1 = min roll with d10 min=1)
            const totalColor =
              total >= 16 ? "text-[#39ff14]"  // auto-passa DV 17 com qualquer dado
              : total >= 12 ? "text-[#39ff14]" // passa DV 13 na maioria dos dados
              : total >= 8  ? "text-[#ffd700]"  // passa DV 9 na maioria
              : "text-[#8a8a9a]";               // só básico
            const totalBg =
              total >= 12 ? "bg-[#39ff1415] border-[#39ff1440]"
              : total >= 8  ? "bg-[#ffd70015] border-[#ffd70040]"
              : "bg-[#14141f] border-[#1e1e2e]";

            return (
              <div
                key={skill.namePtBr}
                className="border border-[#1e1e2e] bg-[#0a0a0f] p-3 flex items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-sm text-[#e0e0e0]">{skill.namePtBr}</p>
                  <p className="font-mono text-[10px] text-[#4a4a5a] mt-0.5 leading-tight">
                    {skill.whyItMatters}
                  </p>
                </div>
                {/* Formula: STAT + rank = total */}
                <div className="flex items-center gap-1 shrink-0 font-mono text-xs">
                  <div className="text-center min-w-[30px]">
                    <div className={`text-[9px] uppercase tracking-wider ${statColor}`}>
                      {skill.linkedStat}
                    </div>
                    <div className={`font-display font-black text-sm ${statColor}`}>{statValue}</div>
                  </div>
                  <span className="text-[#4a4a5a] text-[10px]">+</span>
                  <div className="text-center min-w-[26px]">
                    <div className="text-[9px] uppercase tracking-wider text-[#4a4a5a]">rank</div>
                    <div className="font-display font-black text-sm text-[#8a8a9a]">{skill.rank}</div>
                  </div>
                  <span className="text-[#4a4a5a] text-[10px]">=</span>
                  <div className={`text-center min-w-[34px] border px-1 py-0.5 ${totalBg}`}>
                    <div className="text-[9px] uppercase tracking-wider text-[#4a4a5a]">1d10+</div>
                    <div className={`font-display font-black text-base ${totalColor}`}>{total}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* DV reference table */}
        <div className="border border-[#1e1e2e] bg-[#0a0a0f] p-3">
          <p className="font-mono text-[9px] text-[#4a4a5a] uppercase tracking-widest mb-2">
            Tabela de Dificuldade (DV) — resultado mínimo no dado + bônus
          </p>
          <div className="grid grid-cols-5 gap-1 text-center">
            {[
              { dv: 9,  label: "Fácil",            color: "text-[#39ff14]", bg: "border-[#39ff1430] bg-[#39ff1408]" },
              { dv: 13, label: "Médio",             color: "text-[#ffd700]", bg: "border-[#ffd70030] bg-[#ffd70008]" },
              { dv: 17, label: "Difícil",           color: "text-[#ff0080]", bg: "border-[#ff008030] bg-[#ff008008]" },
              { dv: 21, label: "Muito Difícil",     color: "text-[#bf00ff]", bg: "border-[#bf00ff30] bg-[#bf00ff08]" },
              { dv: 24, label: "Quase Impossível",  color: "text-[#00f5ff]", bg: "border-[#00f5ff30] bg-[#00f5ff08]" },
            ].map(({ dv, label, color, bg }) => (
              <div key={dv} className={`border ${bg} py-2 px-1`}>
                <div className={`font-display text-lg font-black ${color}`}>{dv}</div>
                <div className="font-mono text-[8px] text-[#4a4a5a] leading-tight mt-0.5">{label}</div>
              </div>
            ))}
          </div>
          <p className="font-mono text-[9px] text-[#4a4a5a] mt-2 leading-relaxed">
            Verde = passa DV 13+ na maioria dos dados · Amarelo = passa DV 9 normalmente · Cinza = só DVs fáceis
          </p>
        </div>
      </div>

      <NavButtons step={5} onBack={onBack} onNext={onNext} />
    </div>
  );
}

// ─── Step 6: Equipamento ──────────────────────────────────────────────────────

function GearSection({
  title,
  color,
  items,
  choices,
  onChoice,
}: {
  title: string;
  color: string;
  items: import("@/data/streetrat").StreetratGearItem[];
  choices: Record<string, string>;
  onChoice: (groupId: string, name: string) => void;
}) {
  if (items.length === 0) return null;

  // Collect choice groups first so we can render them as blocks
  const groups = new Map<string, import("@/data/streetrat").StreetratGearItem[]>();
  const fixed: import("@/data/streetrat").StreetratGearItem[] = [];
  for (const item of items) {
    if (item.choiceGroupId) {
      const g = groups.get(item.choiceGroupId) ?? [];
      g.push(item);
      groups.set(item.choiceGroupId, g);
    } else {
      fixed.push(item);
    }
  }

  return (
    <div className="mb-5">
      <p className={`font-mono text-xs uppercase tracking-widest mb-2 ${color}`}>{title}</p>
      <div className="space-y-2">
        {/* Fixed items */}
        {fixed.map((item) => (
          <div key={item.name} className="border border-[#1e1e2e] bg-[#14141f] p-3 flex items-start gap-3">
            <span className="text-lg shrink-0">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[#e0e0e0] text-sm font-semibold">{item.name}</span>
                {item.damage && <span className="font-mono text-[10px] text-[#ff0080] border border-[#ff008040] px-1">{item.damage}</span>}
                {item.sp     && <span className="font-mono text-[10px] text-[#39ff14] border border-[#39ff1440] px-1">SP {item.sp}</span>}
              </div>
              <p className="font-mono text-[10px] text-[#4a4a5a] mt-0.5 leading-tight">{item.description}</p>
            </div>
            <span className="font-mono text-[#ffd700] text-xs shrink-0">{item.cost} eb</span>
          </div>
        ))}
        {/* Choice groups */}
        {[...groups.entries()].map(([groupId, opts]) => {
          const selected = choices[groupId];
          return (
            <div key={groupId} className="border border-[#ffd70030] bg-[#ffd70008] p-3">
              <p className="font-mono text-[9px] text-[#ffd700] uppercase tracking-widest mb-2">
                Escolha um:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {opts.map((opt) => {
                  const isSelected = selected === opt.name;
                  return (
                    <button
                      key={opt.name}
                      onClick={() => onChoice(groupId, opt.name)}
                      className={`p-2.5 border text-left transition-all flex items-start gap-2 ${
                        isSelected
                          ? "border-[#ffd700] bg-[#ffd70015]"
                          : "border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#ffd70050]"
                      }`}
                    >
                      <span className="text-base shrink-0">{opt.icon}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`font-mono text-xs font-semibold ${isSelected ? "text-[#ffd700]" : "text-[#e0e0e0]"}`}>
                            {opt.name}
                          </span>
                          {opt.damage && <span className="font-mono text-[10px] text-[#ff0080] border border-[#ff008040] px-1">{opt.damage}</span>}
                          {opt.sp     && <span className="font-mono text-[10px] text-[#39ff14] border border-[#39ff1440] px-1">SP {opt.sp}</span>}
                        </div>
                        <p className="font-mono text-[9px] text-[#4a4a5a] leading-tight mt-0.5">{opt.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepGear({
  roleId,
  gearChoices,
  cywarChoices,
  onGearChoice,
  onCywarChoice,
  onBack,
  onNext,
}: {
  roleId: string;
  gearChoices: Record<string, string>;
  cywarChoices: Record<string, string>;
  onGearChoice: (groupId: string, name: string) => void;
  onCywarChoice: (groupId: string, name: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const pkg = streetratPackages.find((p) => p.roleId === roleId)!;
  const role = roles.find((r) => r.id === roleId)!;

  const weapons  = pkg.gear.filter((i) => i.category === "weapon");
  const armor    = pkg.gear.filter((i) => i.category === "armor");
  const gearOnly = pkg.gear.filter((i) => i.category === "gear");

  // Collect cyware choice groups
  const cywarGroups = new Map<string, import("@/data/streetrat").StreetratCywarItem[]>();
  const cywarFixed: import("@/data/streetrat").StreetratCywarItem[] = [];
  for (const cw of pkg.cyware) {
    if (cw.choiceGroupId) {
      const g = cywarGroups.get(cw.choiceGroupId) ?? [];
      g.push(cw);
      cywarGroups.set(cw.choiceGroupId, g);
    } else {
      cywarFixed.push(cw);
    }
  }

  // EMP after package
  const pkg_emp = pkg.empLoss;
  const pkg_hl  = pkg.totalHumanityLoss;

  return (
    <div>
      <DisclaimerBanner />
      <h2 className="font-display text-2xl text-[#bf00ff] tracking-widest uppercase mb-2">
        Seu Equipamento
      </h2>
      <p className="font-mono text-[#8a8a9a] text-sm mb-4 leading-relaxed">
        No método Ratos de Rua, o equipamento é pré-definido pelo papel. Onde há{" "}
        <span className="text-[#ffd700]">escolha</span>, selecione a opção que define o seu estilo.
      </p>

      {/* Role banner */}
      <div className="flex items-center gap-3 border border-[#bf00ff20] bg-[#bf00ff08] px-4 py-3 mb-6">
        <span className="text-2xl">{roleEmoji[roleId]}</span>
        <div>
          <p className="font-display text-sm text-[#bf00ff] tracking-widest uppercase">
            {role.name} — Habilidade Especial: {role.abilityName}
          </p>
          <p className="font-mono text-xs text-[#4a4a5a] leading-relaxed">{role.specialAbility}</p>
        </div>
      </div>

      {/* Weapons */}
      <GearSection
        title="⚔ Armas"
        color="text-[#ff0080]"
        items={weapons}
        choices={gearChoices}
        onChoice={onGearChoice}
      />

      {/* Armor */}
      <GearSection
        title="🛡 Armaduras"
        color="text-[#39ff14]"
        items={armor}
        choices={gearChoices}
        onChoice={onGearChoice}
      />

      {/* Gear */}
      <GearSection
        title="🎒 Equipamentos & Itens"
        color="text-[#00f5ff]"
        items={gearOnly}
        choices={gearChoices}
        onChoice={onGearChoice}
      />

      {/* Cyberware */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
          <p className="font-mono text-xs text-[#bf00ff] uppercase tracking-widest">
            💀 Cyberware
          </p>
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-[#ff0080]">
              Perda de Humanidade: <span className="font-black">{pkg_hl}</span>
            </span>
            <span className="text-[#4a4a5a]">|</span>
            <span className="text-[#bf00ff]">
              EMP reduz em <span className="font-black">{pkg_emp}</span>
            </span>
          </div>
        </div>

        <div className="border border-[#bf00ff20] bg-[#bf00ff05] p-3 space-y-2">
          {/* Fixed cyware */}
          {cywarFixed.map((cw) => (
            <div key={cw.name} className="flex items-start gap-3 border border-[#1e1e2e] bg-[#0a0a0f] p-2.5">
              <span className="text-lg shrink-0">🔩</span>
              <div className="flex-1 min-w-0">
                <span className="font-mono text-sm text-[#bf00ff] font-semibold">{cw.namePtBr}</span>
                <span className="font-mono text-[10px] text-[#4a4a5a] ml-2">({cw.name})</span>
                <p className="font-mono text-[10px] text-[#4a4a5a] mt-0.5 leading-tight">{cw.description}</p>
              </div>
              {cw.humanityLoss > 0 && (
                <span className="font-mono text-[10px] text-[#ff0080] shrink-0">-{cw.humanityLoss} HUM</span>
              )}
            </div>
          ))}

          {/* Cyware choice groups */}
          {[...cywarGroups.entries()].map(([groupId, opts]) => {
            const selected = cywarChoices[groupId];
            return (
              <div key={groupId} className="border border-[#ffd70030] bg-[#ffd70008] p-3">
                <p className="font-mono text-[9px] text-[#ffd700] uppercase tracking-widest mb-2">
                  Escolha um implante:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {opts.map((opt) => {
                    const isSelected = selected === opt.name;
                    return (
                      <button
                        key={opt.name}
                        onClick={() => onCywarChoice(groupId, opt.name)}
                        className={`p-2.5 border text-left transition-all flex items-start gap-2 ${
                          isSelected
                            ? "border-[#bf00ff] bg-[#bf00ff15]"
                            : "border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#bf00ff50]"
                        }`}
                      >
                        <span className="text-base shrink-0">🔩</span>
                        <div className="min-w-0 flex-1">
                          <p className={`font-mono text-xs font-semibold ${isSelected ? "text-[#bf00ff]" : "text-[#e0e0e0]"}`}>
                            {opt.namePtBr}
                          </p>
                          <p className="font-mono text-[9px] text-[#4a4a5a] leading-tight mt-0.5">{opt.description}</p>
                        </div>
                        {opt.humanityLoss > 0 && (
                          <span className="font-mono text-[10px] text-[#ff0080] shrink-0">-{opt.humanityLoss} HUM</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <p className="font-mono text-[9px] text-[#4a4a5a] mt-2 leading-relaxed">
          Humanidade Máx. = EMP × 10. Após instalar cyberware: subtrai {pkg_hl} HUM → reduz EMP em {pkg_emp}.
          Se EMP atingir 0, o personagem torna-se ciберpsicótico.
        </p>
      </div>

      {/* Starting Eurobucks */}
      <div className="flex items-center justify-between border border-[#ffd70030] bg-[#ffd70008] px-4 py-3 mb-6">
        <div>
          <p className="font-mono text-xs text-[#4a4a5a] uppercase tracking-widest mb-0.5">
            Eurobucks Iniciais
          </p>
          <p className="font-mono text-[9px] text-[#4a4a5a] leading-relaxed">
            Para comprar itens no Night Market ou guardar. Cama inflável (20eb), comida,
            roupas extras — o que precisar.
          </p>
        </div>
        <span className="font-display text-2xl font-black text-[#ffd700] shrink-0 ml-4">
          {pkg.startingEurobucks} eb
        </span>
      </div>

      <div className="border-l-2 border-[#ffd700] pl-4 bg-[#ffd70008] py-3 pr-3 mb-6">
        <p className="font-mono text-xs text-[#4a4a5a] uppercase tracking-widest mb-1">
          Dica de Sobrevivência — {role.name}
        </p>
        <p className="font-mono text-[#ffd700] text-sm leading-relaxed">{pkg.survivorTip}</p>
      </div>

      <NavButtons step={6} onBack={onBack} onNext={onNext} nextLabel="Ver Resumo →" />
    </div>
  );
}

// ─── Step 5: Resumo Final ─────────────────────────────────────────────────────

function StepSummary({
  draft,
  onBack,
  onRestart,
}: {
  draft: CharacterDraft;
  onBack: () => void;
  onRestart: () => void;
}) {
  const role = roles.find((r) => r.id === draft.roleId)!;
  const origin = culturalOrigins.find((o) => o.id === draft.culturalOriginId)!;
  const pkg = streetratPackages.find((p) => p.roleId === draft.roleId)!;
  const template = pkg.statTemplates[draft.templateIndex];
  const hp = calcHP(template.stats);
  const humanity = calcHumanity(template.stats.EMP);
  const initiative = template.stats.REF;

  const statGroups = {
    Mental: (["INT", "WILL", "COOL", "EMP"] as StatKey[]),
    Combate: (["TECH", "REF"] as StatKey[]),
    Físico: (["DEX", "MOVE", "BODY"] as StatKey[]),
    Fortuna: (["LUCK"] as StatKey[]),
  };

  return (
    <div>
      {/* Print disclaimer - only in screen, not print */}
      <div className="print:hidden mb-6">
        <DisclaimerBanner />
      </div>

      {/* Character sheet */}
      <div className="print:text-black print:bg-white print:border-0">
        {/* Header */}
        <div className="border border-[#00f5ff40] bg-[#14141f] p-6 mb-4 print:border-black print:bg-white">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="font-mono text-xs text-[#4a4a5a] uppercase tracking-widest mb-1 print:text-gray-500">
                Personagem — Método Ratos de Rua
              </p>
              <h1 className="font-display text-4xl text-[#00f5ff] tracking-widest uppercase print:text-black">
                {draft.name || "Sem Nome"}
              </h1>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="font-mono text-sm text-[#bf00ff] print:text-gray-700">
                  {roleEmoji[role.id]} {role.name} / {role.namePtBr}
                </span>
                <span className="font-mono text-xs text-[#4a4a5a]">|</span>
                <span className="font-mono text-xs text-[#8a8a9a]">{origin.name}</span>
                <span className="font-mono text-xs text-[#4a4a5a]">|</span>
                <span className="font-mono text-xs text-[#00f5ff]">
                  {draft.selectedLanguage ?? "—"} <span className="text-[#4a4a5a]">Nível 4</span>
                </span>
              </div>
            </div>
            <div className="text-right font-mono text-xs text-[#4a4a5a]">
              <p>Cyberpunk RED v1.22</p>
              <p>Ratos de Rua</p>
              <p>{pkg.statTemplates[draft.templateIndex].label}</p>
            </div>
          </div>
        </div>

        {/* Derived stats highlight */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Pontos de Vida", value: hp, color: "text-[#39ff14]", sub: "HP" },
            { label: "Humanidade Máx.", value: humanity, color: "text-[#00f5ff]", sub: "HUM" },
            { label: "Iniciativa (base)", value: `REF ${initiative} + 1d10`, color: "text-[#ff0080]", sub: "INIT" },
          ].map(({ label, value, color, sub }) => (
            <div key={sub} className="border border-[#1e1e2e] bg-[#14141f] p-3 text-center print:border-gray-300">
              <div className={`font-display text-2xl font-black ${color} print:text-black`}>{value}</div>
              <div className="font-mono text-xs text-[#4a4a5a] print:text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Stats */}
          <div className="border border-[#1e1e2e] bg-[#14141f] p-4 print:border-gray-300 print:bg-white">
            <p className="font-mono text-xs text-[#4a4a5a] uppercase tracking-widest mb-3">Atributos</p>
            {Object.entries(statGroups).map(([groupName, keys]) => (
              <div key={groupName} className="mb-3">
                <p className="font-mono text-[10px] text-[#4a4a5a] uppercase tracking-widest mb-1">{groupName}</p>
                <div className="grid grid-cols-4 gap-1">
                  {keys.map((key) => {
                    const value = template.stats[key];
                    const isKey = role.keyStats.includes(key);
                    return (
                      <div
                        key={key}
                        className={`text-center py-2 border ${
                          isKey ? "border-[#ff008040] bg-[#ff008008]" : "border-[#1e1e2e]"
                        } print:border-gray-200`}
                      >
                        <div className="font-display text-lg font-black text-[#e0e0e0] print:text-black">{value}</div>
                        <div className="font-mono text-[10px] text-[#4a4a5a] print:text-gray-500">{key}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="border border-[#1e1e2e] bg-[#14141f] p-4 print:border-gray-300 print:bg-white">
            <p className="font-mono text-xs text-[#4a4a5a] uppercase tracking-widest mb-3">
              Habilidades Principais
            </p>
            <div className="space-y-1">
              {pkg.skills.map((skill, i) => {
                const statValue = template.stats[skill.linkedStat];
                const total = statValue + skill.rank;
                return (
                  <div key={i} className="flex justify-between items-center py-1 border-b border-[#1e1e2e] print:border-gray-100">
                    <div>
                      <span className="font-mono text-xs text-[#e0e0e0] print:text-black">{skill.namePtBr}</span>
                      <span className="font-mono text-[10px] text-[#4a4a5a] ml-2 print:text-gray-400">
                        {skill.linkedStat} {statValue} + {skill.rank}
                      </span>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#39ff14] print:text-black">
                      {total}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-[#1e1e2e]">
              <p className="font-mono text-[10px] text-[#4a4a5a] uppercase tracking-widest mb-1">
                Habilidade Especial
              </p>
              <p className="font-mono text-sm text-[#bf00ff] print:text-gray-700">
                {role.abilityName} — nível 4
              </p>
            </div>
          </div>
        </div>

        {/* Gear */}
        <div className="border border-[#1e1e2e] bg-[#14141f] p-4 mb-4 print:border-gray-300 print:bg-white">
          <p className="font-mono text-xs text-[#4a4a5a] uppercase tracking-widest mb-3">Equipamento</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {pkg.gear.map((item) => {
              const isChoice = !!item.choiceGroupId;
              const selected = isChoice ? draft.gearChoices[item.choiceGroupId!] === item.name : true;
              if (isChoice && !selected) return null;
              return (
                <div key={item.name} className="flex items-center gap-2 py-0.5">
                  <span className="text-sm">{item.icon}</span>
                  <span className="font-mono text-xs text-[#e0e0e0] print:text-black">{item.name}</span>
                  {item.category === "weapon" && item.damage && (
                    <span className="font-mono text-[10px] text-[#ff0080]">{item.damage}</span>
                  )}
                  {item.category === "armor" && item.sp && (
                    <span className="font-mono text-[10px] text-[#39ff14]">SP {item.sp}</span>
                  )}
                </div>
              );
            })}
            {pkg.startingEurobucks > 0 && (
              <div className="flex items-center gap-2 py-0.5">
                <span>💰</span>
                <span className="font-mono text-xs text-[#ffd700] print:text-black">
                  {pkg.startingEurobucks} Eurobucks
                </span>
              </div>
            )}
          </div>
          {/* Cyberware summary */}
          <div className="mt-3 pt-3 border-t border-[#1e1e2e]">
            <p className="font-mono text-[10px] text-[#4a4a5a] uppercase tracking-widest mb-2">
              Cyberware — {pkg.totalHumanityLoss} HUM perdida / -{pkg.empLoss} EMP
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
              {pkg.cyware.map((cw) => {
                const isChoice = !!cw.choiceGroupId;
                const selected = isChoice ? draft.cywarChoices[cw.choiceGroupId!] === cw.name : true;
                if (isChoice && !selected) return null;
                return (
                  <div key={cw.name} className="flex items-center gap-2 py-0.5">
                    <span className="text-sm">🔩</span>
                    <span className="font-mono text-xs text-[#bf00ff] print:text-gray-700">{cw.namePtBr}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Role lifepath summary */}
        {Object.values(draft.roleLifepath ?? {}).some(Boolean) && (() => {
          const lifepath = getRoleLifepath(draft.roleId!);
          if (!lifepath) return null;
          const entries = lifepath.tables.filter(
            (t) => t.die !== "choose" && draft.roleLifepath[t.id]
          );
          if (entries.length === 0) return null;
          return (
            <div className="border border-[#00f5ff30] bg-[#00f5ff06] p-4 mb-4 print:border-gray-300 print:bg-white">
              <p className="font-mono text-[10px] text-[#4a4a5a] uppercase tracking-widest mb-3 print:text-gray-400">
                Lifepath do Papel — {role.name}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                {entries.map((table) => (
                  <div key={table.id} className="flex gap-2 text-xs font-mono">
                    <span className="text-[#00f5ff] shrink-0 font-semibold">{table.title}:</span>
                    <span className="text-[#8a8a9a]">{draft.roleLifepath[table.id]}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Personality summary — only if any choices were made */}
        {allPersonalityTables.some((t) => !!draft.personality[t.id]) && (
          <div className="border border-[#bf00ff30] bg-[#bf00ff06] p-4 mb-4">
            <p className="font-mono text-[10px] text-[#4a4a5a] uppercase tracking-widest mb-3 print:text-gray-400">
              Personalidade & Histórico
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              {allPersonalityTables.map((table) => {
                const val = draft.personality[table.id];
                if (!val) return null;
                return (
                  <div key={table.id} className="flex gap-2 text-xs font-mono">
                    <span className="text-[#bf00ff] shrink-0 font-semibold">{table.title}:</span>
                    <span className="text-[#8a8a9a]">{val}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Friends & Enemies summary */}
        {((draft.friends?.length ?? 0) > 0 || (draft.enemies?.length ?? 0) > 0 || (draft.tragicLoves?.length ?? 0) > 0) && (
          <div className="border border-[#1e1e2e] bg-[#14141f] p-4 mb-4 print:border-gray-300 print:bg-white">
            <p className="font-mono text-[10px] text-[#4a4a5a] uppercase tracking-widest mb-3 print:text-gray-400">
              Amigos & Inimigos
            </p>
            {(draft.friends?.length ?? 0) > 0 && (
              <div className="mb-3">
                <p className="font-mono text-xs text-[#39ff14] font-semibold mb-2">
                  Amigos ({draft.friends.length})
                </p>
                <div className="space-y-1">
                  {(draft.friends ?? []).map((rel, i) => (
                    <div key={i} className="flex gap-2 text-xs font-mono">
                      <span className="text-[#39ff14] shrink-0">Amigo {i + 1}:</span>
                      <span className="text-[#8a8a9a]">{rel ?? "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {(draft.enemies?.length ?? 0) > 0 && (
              <div>
                <p className="font-mono text-xs text-[#ff0080] font-semibold mb-2">
                  Inimigos ({draft.enemies.length})
                </p>
                <div className="space-y-2">
                  {(draft.enemies ?? []).map((enemy, i) => (
                    <div key={i} className="border border-[#ff008020] p-2">
                      <p className="font-mono text-xs text-[#ff0080] font-semibold mb-1">
                        Inimigo {i + 1}
                      </p>
                      {(
                        [
                          { label: "Quem", val: enemy.who },
                          { label: "Causa", val: enemy.cause },
                          { label: "Poder", val: enemy.power },
                          { label: "Vingança", val: enemy.revenge },
                        ] as { label: string; val: string | null }[]
                      ).map(({ label, val }) =>
                        val ? (
                          <div key={label} className="flex gap-2 text-xs font-mono">
                            <span className="text-[#ff0080] shrink-0">{label}:</span>
                            <span className="text-[#8a8a9a]">{val}</span>
                          </div>
                        ) : null
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {(draft.tragicLoves?.length ?? 0) > 0 && (
              <div className="mt-3">
                <p className="font-mono text-xs text-[#ffd700] font-semibold mb-2">
                  Amores Trágicos ({draft.tragicLoves.length})
                </p>
                <div className="space-y-1">
                  {(draft.tragicLoves ?? []).map((ending, i) => (
                    <div key={i} className="flex gap-2 text-xs font-mono">
                      <span className="text-[#ffd700] shrink-0">Amor {i + 1}:</span>
                      <span className="text-[#8a8a9a]">{ending ?? "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Survivor tip */}
        <div className="border-l-2 border-[#ffd700] pl-4 py-3 pr-3 bg-[#ffd70008] mb-6 print:bg-white print:border-gray-400">
          <p className="font-mono text-[10px] text-[#4a4a5a] uppercase tracking-widest mb-1 print:text-gray-400">
            Dica de Sobrevivência
          </p>
          <p className="font-mono text-xs text-[#ffd700] leading-relaxed print:text-black">
            {pkg.survivorTip}
          </p>
        </div>

        {/* Footer */}
        <div className="font-mono text-[10px] text-[#4a4a5a] text-center border-t border-[#1e1e2e] pt-3 print:border-gray-200">
          Criado com CPK:RED Guia de Referência — Adaptação não-oficial em PT-BR · Cyberpunk RED © R. Talsorian Games
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 print:hidden">
        <button
          onClick={onBack}
          className="font-mono text-sm text-[#8a8a9a] border border-[#1e1e2e] px-4 py-2 hover:text-[#e0e0e0] hover:border-[#4a4a5a] transition-colors"
        >
          ← Voltar
        </button>
        <button
          onClick={() => window.print()}
          className="font-mono text-sm text-[#00f5ff] border border-[#00f5ff] px-4 py-2 hover:bg-[#00f5ff11] transition-colors flex-1"
        >
          🖨️ Imprimir / Salvar PDF
        </button>
        <button
          onClick={onRestart}
          className="font-mono text-sm text-[#bf00ff] border border-[#bf00ff] px-4 py-2 hover:bg-[#bf00ff11] transition-colors"
        >
          ↺ Criar Novo Personagem
        </button>
      </div>
    </div>
  );
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────

const INITIAL_DRAFT: CharacterDraft = {
  name: "",
  roleId: null,
  culturalOriginId: null,
  selectedLanguage: null,
  personality: {},
  roleLifepath: {},
  templateIndex: 0,
  friends: [],
  enemies: [],
  tragicLoves: [],
  gearChoices: {},
  cywarChoices: {},
};

export default function CriarPersonagemPage() {
  const [step, setStep] = useState<Step>(0);
  const [draft, setDraft] = useState<CharacterDraft>(INITIAL_DRAFT);

  const goTo = useCallback((s: Step) => setStep(s), []);
  const next = () => setStep((s) => (s < 7 ? ((s + 1) as Step) : s));
  const back = () => setStep((s) => (s > 0 ? ((s - 1) as Step) : s));

  const update = useCallback(<K extends keyof CharacterDraft>(key: K, value: CharacterDraft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
  }, []);

  const restart = () => {
    setDraft(INITIAL_DRAFT);
    setStep(0);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Page header */}
      <div className="mb-6">
        <p className="font-mono text-xs text-[#4a4a5a] tracking-widest uppercase mb-1">
          &gt; Assistente de Criação
        </p>
        <div className="flex items-baseline gap-3">
          <h1 className="font-display text-2xl text-[#00f5ff] tracking-widest uppercase">
            Criador de Personagem
          </h1>
          <span className="font-mono text-xs text-[#4a4a5a]">— Método Ratos de Rua</span>
        </div>
      </div>

      {step > 0 && step < 7 && (
        <WizardProgress step={step} onGoTo={goTo} />
      )}

      <div className="min-h-[400px]">
        {step === 0 && <StepWelcome onNext={next} />}

        {step === 1 && (
          <StepRole
            selected={draft.roleId}
            onSelect={(id) => update("roleId", id)}
            onBack={back}
            onNext={next}
          />
        )}

        {step === 2 && (
          <StepIdentity
            name={draft.name}
            culturalOriginId={draft.culturalOriginId}
            selectedLanguage={draft.selectedLanguage}
            onChangeName={(v) => update("name", v)}
            onChangeCultural={(v) => update("culturalOriginId", v)}
            onChangeLanguage={(v) => update("selectedLanguage", v)}
            onBack={back}
            onNext={next}
          />
        )}

        {step === 3 && (
          <StepPersonality
            choices={draft.personality}
            onChange={(tableId, value) =>
              update("personality", { ...draft.personality, [tableId]: value })
            }
            onRollAll={() => {
              const rolled: PersonalityChoices = {};
              allPersonalityTables.forEach((t) => {
                rolled[t.id] = t.options[Math.floor(Math.random() * t.options.length)];
              });
              update("personality", rolled);
            }}
            friends={draft.friends}
            enemies={draft.enemies}
            tragicLoves={draft.tragicLoves}
            onSetFriends={(f) => update("friends", f)}
            onSetEnemies={(e) => update("enemies", e)}
            onSetTragicLoves={(t) => update("tragicLoves", t)}
            onBack={back}
            onNext={next}
          />
        )}

        {step === 4 && draft.roleId && (
          <StepRoleLifepath
            roleId={draft.roleId}
            choices={draft.roleLifepath}
            onChange={(id, value) =>
              update("roleLifepath", { ...draft.roleLifepath, [id]: value })
            }
            onBack={back}
            onNext={next}
          />
        )}

        {step === 5 && draft.roleId && (
          <StepStats
            roleId={draft.roleId}
            templateIndex={draft.templateIndex}
            onChangeTemplate={(i) => update("templateIndex", i)}
            onBack={back}
            onNext={next}
          />
        )}

        {step === 6 && draft.roleId && (
          <StepGear
            roleId={draft.roleId}
            gearChoices={draft.gearChoices}
            cywarChoices={draft.cywarChoices}
            onGearChoice={(id, val) => update("gearChoices", { ...draft.gearChoices, [id]: val })}
            onCywarChoice={(id, val) => update("cywarChoices", { ...draft.cywarChoices, [id]: val })}
            onBack={back}
            onNext={next}
          />
        )}

        {step === 7 && draft.roleId && draft.culturalOriginId && draft.selectedLanguage && (
          <StepSummary draft={draft} onBack={back} onRestart={restart} />
        )}
      </div>
    </div>
  );
}
