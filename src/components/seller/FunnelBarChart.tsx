type FunnelData = {
  impressions: number;
  clicks: number;
  purchases: number;
  conversion: string;
};

const fmt = (n: number) =>
  n.toLocaleString("pl-PL").replace(/,/g, " ").replace(/ /g, " ");

export function FunnelBarChart({ data }: { data: FunnelData }) {
  const rows = [
    { label: "Wyświetlenia", value: data.impressions },
    { label: "Kliknięcia", subLabel: "CTR", value: data.clicks },
    { label: "Zakupy", value: data.purchases },
  ];
  const max = Math.max(...rows.map((d) => d.value));

  return (
    <article className="bg-card border border-border rounded-md p-5 sm:p-6 h-full">
      <div className="flex items-start justify-between mb-5 gap-4">
        <div>
          <span className="label-eyebrow text-charcoal/60">Analityka</span>
          <h3 className="text-base sm:text-lg font-normal tracking-tight text-charcoal mt-1">
            Skuteczność Ofert
            <span className="text-charcoal/50 font-normal"> · Top Kategoria</span>
          </h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-normal tracking-tight text-charcoal leading-none tabular-nums">{data.conversion}</div>
          <div className="label-eyebrow text-charcoal/60 mt-1.5">Konwersja</div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {rows.map((d) => {
          const pct = (d.value / max) * 100;
          return (
            <div key={d.label}>
              <div className="flex items-baseline justify-between mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="label-eyebrow text-charcoal">{d.label}</span>
                  {d.subLabel && <span className="text-[10px] text-charcoal/50 tracking-[0.5px]">{d.subLabel}</span>}
                </div>
                <span className="text-[13px] tabular-nums text-charcoal">{fmt(d.value)}</span>
              </div>
              <div className="relative w-full h-2 bg-muted/60 overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-charcoal/75 transition-[width] duration-500 ease-out" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
