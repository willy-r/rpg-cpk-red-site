"use client";

import { useState, useCallback, useRef } from "react";
import { roles } from "@/data/roles";
import { stats } from "@/data/stats";
import { streetratPackages, culturalOrigins } from "@/data/streetrat";
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

type Step = 0 | 1 | 2 | 3 | 4 | 5;

interface CharacterDraft {
  name: string;
  roleId: string | null;
  culturalOriginId: string | null;
  templateIndex: number;
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
  onChangeName,
  onChangeCultural,
  onBack,
  onNext,
}: {
  name: string;
  culturalOriginId: string | null;
  onChangeName: (v: string) => void;
  onChangeCultural: (v: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const selectedOrigin = culturalOrigins.find((o) => o.id === culturalOriginId);
  return (
    <div>
      <DisclaimerBanner />
      <h2 className="font-display text-2xl text-[#00f5ff] tracking-widest uppercase mb-2">
        Sua Identidade
      </h2>
      <p className="font-mono text-[#8a8a9a] text-sm mb-6 leading-relaxed">
        Todo personagem tem um nome e uma história. A origem cultural determina o idioma nativo do seu personagem — isso dá acesso a um bônus de habilidade linguística e molda como ele se relaciona com o mundo.
      </p>

      {/* Nome */}
      <div className="mb-6">
        <label className="block font-mono text-xs text-[#4a4a5a] uppercase tracking-widest mb-2">
          Nome do Personagem
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

      {/* Origem cultural */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block font-mono text-xs text-[#4a4a5a] uppercase tracking-widest">
            Origem Cultural
          </label>
          <DiceButton
            max={culturalOrigins.length}
            label="sortear origem"
            size="sm"
            onRoll={(n) => onChangeCultural(culturalOrigins[(n - 1) % culturalOrigins.length].id)}
          />
        </div>
        <p className="font-mono text-[#8a8a9a] text-xs mb-3 leading-relaxed">
          A origem cultural determina seu{" "}
          <span className="text-[#e0e0e0]">idioma nativo</span> (nível 4 gratuito) e
          serve como contexto para seu personagem. Não afeta atributos ou combate.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {culturalOrigins.map((origin) => {
            const isSelected = culturalOriginId === origin.id;
            return (
              <button
                key={origin.id}
                onClick={() => onChangeCultural(origin.id)}
                className={`text-left p-3 border transition-all ${
                  isSelected
                    ? "border-[#00f5ff] bg-[#00f5ff11] border-l-2 border-l-[#00f5ff]"
                    : "border-[#1e1e2e] bg-[#14141f] hover:border-[#00f5ff44] border-l-2 border-l-[#4a4a5a]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-mono text-sm font-semibold ${isSelected ? "text-[#00f5ff]" : "text-[#e0e0e0]"}`}>
                    {origin.name}
                  </span>
                  {isSelected && <span className="text-[#00f5ff] text-xs">✓</span>}
                </div>
                <p className="font-mono text-[#4a4a5a] text-xs">{origin.description}</p>
                <p className="font-mono text-[#00f5ff44] text-xs mt-1">{origin.bonusLanguage}</p>
              </button>
            );
          })}
        </div>
      </div>

      {selectedOrigin && (
        <div className="border border-[#00f5ff30] bg-[#00f5ff08] p-3 mb-2 font-mono text-xs text-[#8a8a9a] italic">
          &ldquo;{selectedOrigin.flavor}&rdquo;
        </div>
      )}

      <NavButtons
        step={2}
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!name.trim() || !culturalOriginId}
      />
    </div>
  );
}

// ─── Step 3: Atributos ────────────────────────────────────────────────────────

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
      <p className="font-mono text-[#8a8a9a] text-sm mb-6 leading-relaxed">
        Atributos (<span className="text-[#4a4a5a]">STATs</span>) são os números que definem o que
        seu personagem é capaz de fazer. Valores altos = melhor. O máximo na criação é{" "}
        <span className="text-[#e0e0e0]">8</span>. No método Ratos de Rua, os atributos vêm
        pré-definidos e já são otimizados para o papel escolhido.
      </p>

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

      <NavButtons step={3} onBack={onBack} onNext={onNext} />
    </div>
  );
}

// ─── Step 4: Equipamento ──────────────────────────────────────────────────────

function StepGear({
  roleId,
  onBack,
  onNext,
}: {
  roleId: string;
  onBack: () => void;
  onNext: () => void;
}) {
  const pkg = streetratPackages.find((p) => p.roleId === roleId)!;
  const role = roles.find((r) => r.id === roleId)!;
  const [openSkill, setOpenSkill] = useState<number | null>(null);

  const totalGearCost = pkg.gear.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div>
      <DisclaimerBanner />
      <h2 className="font-display text-2xl text-[#bf00ff] tracking-widest uppercase mb-2">
        Seu Equipamento
      </h2>
      <p className="font-mono text-[#8a8a9a] text-sm mb-6 leading-relaxed">
        No método Ratos de Rua, o equipamento inicial é determinado pelo seu papel. Cada item
        foi escolhido para te deixar funcional desde a primeira sessão. Clique em qualquer item
        para ver mais detalhes.
      </p>

      {/* Role ability reminder */}
      <div className="border border-[#bf00ff40] bg-[#bf00ff08] p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{roleEmoji[roleId]}</span>
          <div>
            <p className="font-mono text-xs text-[#4a4a5a] uppercase tracking-widest mb-1">
              Habilidade Especial (nível 4)
            </p>
            <p className="font-display text-lg text-[#bf00ff] tracking-widest uppercase">
              {role.abilityName}
            </p>
            <p className="font-mono text-[#8a8a9a] text-xs mt-1 leading-relaxed">
              {role.specialAbility}
            </p>
          </div>
        </div>
      </div>

      {/* Gear list */}
      <div className="mb-6">
        <p className="font-mono text-xs text-[#4a4a5a] uppercase tracking-widest mb-3">
          Kit Ratos de Rua — {role.name}
        </p>
        <div className="space-y-2">
          {pkg.gear.map((item) => (
            <div
              key={item.name}
              className={`border p-4 ${item.isImplant ? "border-[#ff008040] bg-[#ff008008]" : "border-[#1e1e2e] bg-[#14141f]"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono text-[#e0e0e0] text-sm font-semibold">
                        {item.name}
                      </span>
                      {item.isImplant && (
                        <span className="font-mono text-[10px] text-[#ff0080] border border-[#ff008040] px-1 uppercase tracking-wider">
                          Implante • Perda Humanidade: {item.humanityLoss}
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-[#8a8a9a] text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[#ffd700] text-sm shrink-0">{item.cost} eb</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-3 font-mono text-xs text-[#4a4a5a]">
          Valor total do kit:{" "}
          <span className="text-[#ffd700] ml-1">{totalGearCost} eb</span>
          {pkg.startingEurobucks > 0 && (
            <span className="ml-3 text-[#39ff14]">
              + {pkg.startingEurobucks} eb em mãos
            </span>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <p className="font-mono text-xs text-[#4a4a5a] uppercase tracking-widest mb-3">
          Habilidades Principais — clique para entender cada uma
        </p>
        <div className="space-y-1">
          {pkg.skills.map((skill, i) => {
            const isOpen = openSkill === i;
            const rankColor =
              skill.rank === 6
                ? "text-[#39ff14]"
                : skill.rank === 4
                ? "text-[#ffd700]"
                : "text-[#8a8a9a]";
            const rankLabel = skill.rank === 6 ? "Alta" : skill.rank === 4 ? "Média" : "Básica";
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenSkill(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-3 bg-[#14141f] border border-[#1e1e2e] hover:border-[#bf00ff30] transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs ${rankColor} border ${rankColor.replace("text", "border")}40 px-2 py-0.5 shrink-0`}>
                      {skill.rank} — {rankLabel}
                    </span>
                    <span className="font-mono text-[#e0e0e0] text-sm">{skill.namePtBr}</span>
                    <span className="font-mono text-[#4a4a5a] text-xs">{skill.linkedStat}</span>
                  </div>
                  <span className="font-mono text-[#4a4a5a] text-xs">{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                  <div className="bg-[#0f0f1a] border border-[#bf00ff30] border-t-0 px-4 py-3 font-mono text-xs text-[#8a8a9a] leading-relaxed">
                    <span className="text-[#bf00ff]">Por que importa: </span>
                    {skill.whyItMatters}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Survivor tip */}
      <div className="border-l-2 border-[#ffd700] pl-4 bg-[#ffd70008] py-3 pr-3 mb-2">
        <p className="font-mono text-xs text-[#4a4a5a] uppercase tracking-widest mb-1">
          Dica de Sobrevivência — {role.name}
        </p>
        <p className="font-mono text-[#ffd700] text-sm leading-relaxed">
          {pkg.survivorTip}
        </p>
      </div>

      <NavButtons step={4} onBack={onBack} onNext={onNext} nextLabel="Ver Resumo →" />
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
                <span className="font-mono text-xs text-[#00f5ff44]">{origin.bonusLanguage}</span>
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
                const rankColor =
                  skill.rank === 6 ? "text-[#39ff14]" : skill.rank === 4 ? "text-[#ffd700]" : "text-[#8a8a9a]";
                return (
                  <div key={i} className="flex justify-between items-center py-1 border-b border-[#1e1e2e] print:border-gray-100">
                    <div>
                      <span className="font-mono text-xs text-[#e0e0e0] print:text-black">{skill.namePtBr}</span>
                      <span className="font-mono text-[10px] text-[#4a4a5a] ml-2 print:text-gray-400">
                        {skill.linkedStat}
                      </span>
                    </div>
                    <span className={`font-mono text-sm font-bold ${rankColor} print:text-black`}>
                      {skill.rank}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {pkg.gear.map((item) => (
              <div key={item.name} className="flex items-center gap-2 py-1">
                <span>{item.icon}</span>
                <span className="font-mono text-xs text-[#e0e0e0] print:text-black">{item.name}</span>
                {item.isImplant && (
                  <span className="font-mono text-[10px] text-[#ff0080] print:text-gray-500">
                    [implante]
                  </span>
                )}
              </div>
            ))}
            {pkg.startingEurobucks > 0 && (
              <div className="flex items-center gap-2 py-1">
                <span>💰</span>
                <span className="font-mono text-xs text-[#ffd700] print:text-black">
                  {pkg.startingEurobucks} Eurobucks
                </span>
              </div>
            )}
          </div>
        </div>

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
  templateIndex: 0,
};

export default function CriarPersonagemPage() {
  const [step, setStep] = useState<Step>(0);
  const [draft, setDraft] = useState<CharacterDraft>(INITIAL_DRAFT);

  const goTo = useCallback((s: Step) => setStep(s), []);
  const next = () => setStep((s) => (s < 5 ? ((s + 1) as Step) : s));
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

      {step > 0 && step < 5 && (
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
            onChangeName={(v) => update("name", v)}
            onChangeCultural={(v) => update("culturalOriginId", v)}
            onBack={back}
            onNext={next}
          />
        )}

        {step === 3 && draft.roleId && (
          <StepStats
            roleId={draft.roleId}
            templateIndex={draft.templateIndex}
            onChangeTemplate={(i) => update("templateIndex", i)}
            onBack={back}
            onNext={next}
          />
        )}

        {step === 4 && draft.roleId && (
          <StepGear
            roleId={draft.roleId}
            onBack={back}
            onNext={next}
          />
        )}

        {step === 5 && draft.roleId && draft.culturalOriginId && (
          <StepSummary draft={draft} onBack={back} onRestart={restart} />
        )}
      </div>
    </div>
  );
}
