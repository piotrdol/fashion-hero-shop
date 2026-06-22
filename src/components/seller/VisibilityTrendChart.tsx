"use client";

import { useMemo } from "react";

type TrendData = {
  points: number[];
  current: string;
  delta: string;
  rangeLabel: string;
  yMin: number;
  yMax: number;
  xLabels: [string, string, string, string];
};

export function VisibilityTrendChart({ data }: { data: TrendData }) {
  const { path, todayX, todayY, ticks } = useMemo(() => {
    const W = 800, H = 220, padL = 36, padR = 16, padT = 16, padB = 28;
    const { points: DATA, yMin: min, yMax: max } = data;
    const n = DATA.length;

    const x = (i: number) => padL + (i * (W - padL - padR)) / (n - 1);
    const y = (v: number) => padT + ((max - v) / (max - min)) * (H - padT - padB);

    const pts = DATA.map((v, i) => ({ x: x(i), y: y(v) }));
    const d: string[] = [`M ${pts[0].x} ${pts[0].y}`];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] ?? pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] ?? p2;
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`);
    }

    const last = pts[pts.length - 1];
    const yTicks = [0, 1, 2, 3, 4].map((i) => Math.round(max - (i * (max - min)) / 4));
    return { path: d.join(" "), todayX: last.x, todayY: last.y, ticks: yTicks };
  }, [data]);

  return (
    <article className="bg-card border border-border rounded-md p-5 sm:p-6">
      <div className="flex items-start justify-between mb-5 gap-4">
        <div>
          <span className="label-eyebrow text-charcoal/60">Analityka</span>
          <h3 className="text-base sm:text-lg font-normal tracking-tight text-charcoal mt-1">
            Trend Widoczności Ofert
            <span className="text-charcoal/50 font-normal"> · {data.rangeLabel}</span>
          </h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-normal tracking-tight text-charcoal leading-none tabular-nums">{data.current}</div>
          <div className="label-eyebrow text-charcoal/60 mt-1.5">{data.delta}</div>
        </div>
      </div>
      <div className="w-full">
        <svg viewBox="0 0 800 220" preserveAspectRatio="none" className="w-full h-[200px] sm:h-[220px]" role="img" aria-label={`Wykres trendu widoczności: ${data.rangeLabel}`}>
          {[0, 1, 2, 3, 4].map((i) => {
            const yPos = 16 + (i * (220 - 16 - 28)) / 4;
            return <line key={i} x1={36} x2={784} y1={yPos} y2={yPos} stroke="#e0dad0" strokeWidth={1} strokeDasharray={i === 4 ? "0" : "2 4"} />;
          })}
          {ticks.map((v, i) => {
            const yPos = 16 + (i * (220 - 16 - 28)) / 4;
            return <text key={`${v}-${i}`} x={28} y={yPos + 3} textAnchor="end" fontSize={9} fontFamily="Geist, sans-serif" fill="#9a958c" letterSpacing="0.5">{v}</text>;
          })}
          {data.xLabels.map((label, i, arr) => {
            const xPos = i === 0 ? 36 : i === arr.length - 1 ? 784 : 36 + ((784 - 36) / (arr.length - 1)) * i;
            return <text key={`${label}-${i}`} x={xPos} y={210} textAnchor={i === 0 ? "start" : i === arr.length - 1 ? "end" : "middle"} fontSize={9} fontFamily="Geist, sans-serif" fill="#9a958c" letterSpacing="0.5">{label}</text>;
          })}
          <path d={path} fill="none" stroke="#212121" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" style={{ transition: "d 400ms ease-out" }} />
          <circle cx={todayX} cy={todayY} r={3} fill="#212121" />
        </svg>
      </div>
    </article>
  );
}
