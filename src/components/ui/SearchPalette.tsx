"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { searchIndex, type SearchItem } from "@/lib/search-index";

const fuse = new Fuse(searchIndex, {
  keys: [
    { name: "title", weight: 2.5 },
    { name: "subtitle", weight: 1.5 },
    { name: "description", weight: 1 },
    { name: "categoryLabel", weight: 0.5 },
  ],
  threshold: 0.35,
  includeScore: true,
  minMatchCharLength: 2,
});

const CATEGORY_COLOR: Record<string, string> = {
  section:     "text-[#8a8a9a] border-[#4a4a5a]",
  role:        "text-[#39ff14] border-[#39ff1440]",
  stat:        "text-[#ffd700] border-[#ffd70040]",
  skill:       "text-[#00f5ff] border-[#00f5ff40]",
  weapon:      "text-[#ff0080] border-[#ff008040]",
  armor:       "text-[#39ff14] border-[#39ff1440]",
  cyberware:   "text-[#bf00ff] border-[#bf00ff40]",
  program:     "text-[#00f5ff] border-[#00f5ff40]",
  district:    "text-[#ffd700] border-[#ffd70040]",
  corporation: "text-[#ff0080] border-[#ff008040]",
  economy:     "text-[#39ff14] border-[#39ff1440]",
};

const DEFAULT_RESULTS: SearchItem[] = searchIndex.filter((i) => i.category === "section");

export default function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  const results: SearchItem[] = query.length >= 2
    ? fuse.search(query).slice(0, 10).map((r) => r.item)
    : DEFAULT_RESULTS;

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  const openPalette = useCallback(() => {
    setOpen(true);
    setSelected(0);
    setTimeout(() => inputRef.current?.focus(), 10);
  }, []);

  const navigate = useCallback((item: SearchItem) => {
    router.push(item.href);
    close();
  }, [router, close]);

  // Ctrl+K / Cmd+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => { if (!v) setTimeout(() => inputRef.current?.focus(), 10); return !v; });
        setSelected(0);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  // Keyboard navigation within results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      navigate(results[selected]);
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.children[selected] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={openPalette}
        className="hidden md:flex items-center gap-2 px-3 py-1 font-mono text-xs text-[#4a4a5a] border border-[#1e1e2e] hover:border-[#4a4a5a] hover:text-[#8a8a9a] transition-colors"
        title="Buscar (Ctrl+K)"
      >
        <span>⌕</span>
        <span className="tracking-widest">BUSCAR</span>
        <span className="text-[#2a2a3a] border border-[#1e1e2e] px-1 text-[10px]">Ctrl K</span>
      </button>

      {!open ? null : (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-sm"
            onClick={close}
          />

          {/* Palette */}
          <div className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4">
            <div className="border border-[#00f5ff30] bg-[#0f0f1a] shadow-[0_0_40px_rgba(0,245,255,0.08)]">
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e1e2e]">
                <span className="text-[#00f5ff] font-mono text-sm select-none">&gt;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                  onKeyDown={handleKeyDown}
                  placeholder="buscar papéis, armas, cyberware, distritos..."
                  className="flex-1 bg-transparent font-mono text-sm text-[#e0e0e0] placeholder:text-[#2a2a3a] outline-none"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="text-[#4a4a5a] hover:text-[#8a8a9a] font-mono text-xs">
                    ✕
                  </button>
                )}
              </div>

              {/* Results */}
              <ul ref={listRef} className="max-h-[50vh] overflow-y-auto">
                {results.length === 0 ? (
                  <li className="px-4 py-6 font-mono text-xs text-[#4a4a5a] text-center">
                    nenhum resultado para &ldquo;{query}&rdquo;
                  </li>
                ) : (
                  results.map((item, i) => {
                    const colors = CATEGORY_COLOR[item.category] ?? "text-[#8a8a9a] border-[#4a4a5a]";
                    const isSelected = i === selected;
                    return (
                      <li key={`${item.href}-${item.title}-${i}`}>
                        <button
                          onClick={() => navigate(item)}
                          onMouseEnter={() => setSelected(i)}
                          className={`w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors ${
                            isSelected ? "bg-[#00f5ff0a]" : "hover:bg-[#00f5ff06]"
                          }`}
                        >
                          <span className={`font-mono text-[9px] tracking-widest border px-1 py-0.5 mt-0.5 shrink-0 ${colors}`}>
                            {item.categoryLabel}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline gap-2">
                              <span className="font-mono text-sm text-[#e0e0e0] font-semibold">
                                {item.title}
                              </span>
                              {item.subtitle && (
                                <span className="font-mono text-xs text-[#4a4a5a] truncate">
                                  {item.subtitle}
                                </span>
                              )}
                            </div>
                            <p className="font-mono text-[10px] text-[#4a4a5a] mt-0.5 leading-relaxed line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                          {isSelected && (
                            <span className="font-mono text-[10px] text-[#4a4a5a] shrink-0 mt-1">↵</span>
                          )}
                        </button>
                      </li>
                    );
                  })
                )}
              </ul>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-[#1e1e2e] flex gap-4 font-mono text-[9px] text-[#2a2a3a] tracking-widest">
                <span>↑↓ navegar</span>
                <span>↵ abrir</span>
                <span>ESC fechar</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
