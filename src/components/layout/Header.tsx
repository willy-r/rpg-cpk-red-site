"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/cenario", label: "Cenário" },
  { href: "/personagem", label: "Personagem" },
  { href: "/combate", label: "Combate" },
  { href: "/equipamentos", label: "Equipamentos" },
  { href: "/netrunning", label: "Netrunning" },
  { href: "/economia", label: "Economia" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur border-b border-[#00f5ff20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <Link
          href="/"
          className="font-display text-xl font-black tracking-widest text-[#00f5ff] neon-pulse hover:opacity-80 transition-opacity"
        >
          CPK<span className="text-[#8a8a9a]">:</span>RED
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider uppercase transition-all ${
                  isActive
                    ? "text-[#00f5ff] border-b border-[#00f5ff]"
                    : "text-[#8a8a9a] hover:text-[#e0e0e0]"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/criar-personagem"
            className={`ml-2 px-3 py-1.5 text-xs font-mono tracking-wider uppercase border transition-all ${
              pathname.startsWith("/criar-personagem")
                ? "text-[#0a0a0f] bg-[#39ff14] border-[#39ff14]"
                : "text-[#39ff14] border-[#39ff1440] hover:bg-[#39ff1415]"
            }`}
          >
            + Criar Personagem
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#8a8a9a] hover:text-[#00f5ff] transition-colors font-mono text-xs tracking-wider"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "[FECHAR]" : "[MENU]"}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden bg-[#0f0f1a] border-t border-[#00f5ff20] px-4 py-4">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 text-sm font-mono tracking-widest uppercase transition-colors ${
                  isActive ? "text-[#00f5ff]" : "text-[#8a8a9a] hover:text-[#e0e0e0]"
                }`}
              >
                &gt; {label}
              </Link>
            );
          })}
          <Link
            href="/criar-personagem"
            onClick={() => setMenuOpen(false)}
            className="block py-2 text-sm font-mono tracking-widest uppercase text-[#39ff14] hover:text-[#39ff14cc] transition-colors"
          >
            &gt; + Criar Personagem
          </Link>
        </nav>
      )}
    </header>
  );
}
