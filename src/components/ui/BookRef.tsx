"use client";

import { useState } from "react";

interface BookRefProps {
  page: number;
}

export default function BookRef({ page }: BookRefProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative group inline-flex items-center ml-2 shrink-0">
        <button
          onClick={() => setOpen(true)}
          className="text-[#4a4a5a] hover:text-[#00f5ff] transition-colors cursor-pointer"
          aria-label={`Ver no livro, página ${page}`}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
          </svg>
        </button>
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 bg-[#0a0a0f] text-[#00f5ff] text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#00f5ff40] z-10">
          p. {page}
        </span>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="relative w-[92vw] h-[92vh] bg-[#0a0a0f] border border-[#00f5ff40] flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#1e1e2e] shrink-0">
              <span className="font-mono text-[#00f5ff] text-xs tracking-widest">
                CYBERPUNK RED — p. {page}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-[#4a4a5a] hover:text-[#ff0080] font-mono text-xs tracking-widest transition-colors cursor-pointer"
              >
                ✕ FECHAR
              </button>
            </div>
            <iframe
              src={`/cyberpunk-red-v1.22.pdf#page=${page}`}
              className="flex-1 w-full"
              title={`Cyberpunk RED p. ${page}`}
            />
          </div>
        </div>
      )}
    </>
  );
}
