interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  color?: "cyan" | "green" | "yellow" | "pink";
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

const headerColorMap = {
  cyan: "text-[#00f5ff]",
  green: "text-[#39ff14]",
  yellow: "text-[#ffd700]",
  pink: "text-[#ff0080]",
};

export default function Table<T>({ data, columns }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full font-mono text-sm border-collapse">
        <thead>
          <tr className="border-b border-[#00f5ff30]">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`text-left py-2 px-3 tracking-wider text-xs uppercase ${
                  col.color ? headerColorMap[col.color] : "text-[#00f5ff]"
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr
              key={i}
              className="border-b border-[#1e1e2e] hover:bg-[#00f5ff08] transition-colors"
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="py-2 px-3 text-[#e0e0e0]">
                  {col.render
                    ? col.render(item)
                    : String((item as Record<string, unknown>)[String(col.key)] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
