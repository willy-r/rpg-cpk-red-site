import GlitchText from "@/components/ui/GlitchText";

export default function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <p className="font-mono text-xs text-[#8a8a9a] tracking-[0.4em] uppercase mb-6">
          &gt; SISTEMA DE RPG — GUIA DE REFERÊNCIA
        </p>

        <GlitchText
          text="BEM-VINDO AO"
          className="font-display text-3xl sm:text-5xl font-black tracking-widest uppercase text-[#e0e0e0] block mb-2"
        />

        <h1 className="font-display text-5xl sm:text-8xl font-black tracking-widest uppercase text-[#00f5ff] neon-pulse mb-6 flicker"
          style={{ textShadow: "0 0 10px #00f5ff, 0 0 30px rgba(0,245,255,0.5)" }}>
          FUTURO NEGRO
        </h1>

        <p className="font-mono text-[#8a8a9a] text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
          Guia completo do sistema{" "}
          <span className="text-[#00f5ff]">Cyberpunk RED</span> em português
          brasileiro — regras, cenário, personagens e equipamentos de Night City.
        </p>

        <div className="flex flex-wrap justify-center gap-2 text-xs font-mono text-[#4a4a5a] tracking-widest">
          <span>v1.22</span>
          <span className="text-[#1e1e2e]">|</span>
          <span>458 páginas</span>
          <span className="text-[#1e1e2e]">|</span>
          <span>Hora do Vermelho</span>
          <span className="text-[#1e1e2e]">|</span>
          <span>10 Papéis</span>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}
