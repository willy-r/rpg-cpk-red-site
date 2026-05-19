import type { CyberwareItem, CyberwareCategory } from "@/lib/types";
import NeonCard from "@/components/ui/NeonCard";
import Tag from "@/components/ui/Tag";

interface CyberwareCardProps {
  item: CyberwareItem;
}

const categoryLabels: Record<CyberwareCategory, string> = {
  neural: "Neural",
  optics: "Óptica",
  audio: "Auditivo",
  cyberarm: "Cyberbraço",
  cyberleg: "Cyberperna",
  borgware: "Borgware",
};

export default function CyberwareCard({ item }: CyberwareCardProps) {
  const isHighHumanityLoss = item.humanityLoss.includes("2d6");

  return (
    <NeonCard color="purple" className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="text-[#e0e0e0] font-mono font-semibold text-sm">
            {item.namePtBr}
          </h4>
          <p className="text-[#4a4a5a] text-xs font-mono">{item.name}</p>
        </div>
        <Tag label={categoryLabels[item.category]} color="purple" />
      </div>

      <p className="text-[#8a8a9a] text-xs font-mono leading-relaxed flex-1 mb-3">
        {item.description}
      </p>

      {item.optionSlots && (
        <div className="mb-2">
          <p className="text-[#4a4a5a] text-xs tracking-wider uppercase">
            Slots de Opção
          </p>
          <p className="text-[#00f5ff] text-sm font-mono">{item.optionSlots}</p>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#1e1e2e]">
        <div>
          <p className="text-[#4a4a5a] text-xs tracking-wider uppercase">
            Perda de Humanidade
          </p>
          <p
            className={`text-sm font-mono font-semibold ${
              isHighHumanityLoss ? "text-[#ff0080]" : "text-[#ffd700]"
            }`}
          >
            {item.humanityLoss}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[#4a4a5a] text-xs tracking-wider uppercase">Custo</p>
          <p className="text-[#ffd700] text-sm font-mono font-semibold">
            {item.cost.toLocaleString("pt-BR")} eb
          </p>
        </div>
      </div>
    </NeonCard>
  );
}
