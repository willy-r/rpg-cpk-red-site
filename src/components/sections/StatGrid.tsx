import { stats } from "@/data/stats";
import type { StatGroup } from "@/lib/types";
import NeonCard from "@/components/ui/NeonCard";
import SectionHeader from "@/components/ui/SectionHeader";
import Tag from "@/components/ui/Tag";

const groupLabels: Record<StatGroup, string> = {
  mental: "Mental",
  combat: "Combate",
  physical: "Físico",
  fortune: "Fortuna",
};

const groupColors = {
  mental: "cyan",
  combat: "pink",
  physical: "green",
  fortune: "yellow",
} as const;

const groups: StatGroup[] = ["mental", "combat", "physical", "fortune"];

export default function StatGrid() {
  return (
    <div className="space-y-6">
      {groups.map((group) => {
        const groupStats = stats.filter((s) => s.group === group);
        const color = groupColors[group];
        return (
          <div key={group}>
            <div className="mb-3">
              <Tag label={groupLabels[group]} color={color} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {groupStats.map((stat) => (
                <NeonCard key={stat.key} color={color}>
                  <div className="flex items-start gap-3">
                    <div
                      className={`font-display text-xs tracking-widest font-bold ${
                        color === "cyan"
                          ? "text-[#00f5ff]"
                          : color === "pink"
                          ? "text-[#ff0080]"
                          : color === "green"
                          ? "text-[#39ff14]"
                          : "text-[#ffd700]"
                      } w-12 shrink-0 mt-0.5`}
                    >
                      {stat.key}
                    </div>
                    <div>
                      <div className="text-[#e0e0e0] text-sm font-mono font-semibold mb-1">
                        {stat.name}
                      </div>
                      <div className="text-[#8a8a9a] text-xs font-mono leading-relaxed">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                </NeonCard>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
