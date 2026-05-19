interface SidebarItem {
  label: string;
  anchor: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

export default function Sidebar({ items }: SidebarProps) {
  return (
    <aside className="hidden lg:block w-48 shrink-0">
      <nav className="sticky top-20 space-y-1">
        <p className="text-[#4a4a5a] text-xs font-mono tracking-widest uppercase mb-3">
          &gt; Seções
        </p>
        {items.map(({ label, anchor }) => (
          <a
            key={anchor}
            href={`#${anchor}`}
            className="block text-xs font-mono text-[#8a8a9a] hover:text-[#00f5ff] transition-colors py-1 border-l border-[#1e1e2e] pl-3 hover:border-[#00f5ff] tracking-wide"
          >
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
