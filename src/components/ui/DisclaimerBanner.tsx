export default function DisclaimerBanner() {
  return (
    <div className="border border-[#ffd70040] bg-[#ffd70008] px-4 py-3 mb-6 font-mono text-xs text-[#ffd700] leading-relaxed">
      <span className="font-semibold tracking-wider">⚠ NOTA SOBRE TRADUÇÃO:</span>{" "}
      Cyberpunk RED não possui tradução oficial para o português brasileiro. Todos os
      termos, nomes de habilidades e equipamentos neste guia são{" "}
      <span className="underline">adaptações não-oficiais</span>{" "}criadas para facilitar
      o aprendizado. Termos em inglês (como &ldquo;Solo&rdquo;, &ldquo;Netrunner&rdquo;,
      &ldquo;Eurobucks&rdquo;) são nomes canônicos e foram mantidos.
    </div>
  );
}
