"use client";

import { useEffect, useMemo, useState } from "react";
import { SellerDashboardHeader } from "@/components/seller/SellerDashboardHeader";
import { QualityScoreWidget } from "@/components/seller/QualityScoreWidget";
import { QualityScoreSkeleton } from "@/components/seller/QualityScoreSkeleton";
import { CohortToggle } from "@/components/seller/CohortToggle";
import { VisibilityTrendChart } from "@/components/seller/VisibilityTrendChart";
import { FunnelBarChart } from "@/components/seller/FunnelBarChart";
import { GlobalFilters } from "@/components/seller/GlobalFilters";
import { isInCohort } from "@/lib/seller/featureFlag";
import { getDashboardData, DATE_RANGES, type RangeKey, type CategoryKey } from "@/lib/seller/mockData";
import posthog from "posthog-js";

export default function SellerDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [inCohort, setInCohortState] = useState(false);
  const [range, setRange] = useState<RangeKey>("30d");
  const [category, setCategory] = useState<CategoryKey>("all");

  const data = useMemo(() => getDashboardData(range, category), [range, category]);
  const rangeLabel = DATE_RANGES.find((r) => r.key === range)?.label ?? "Ostatnie 30 dni";
  const dataKey = `${range}:${category}`;

  useEffect(() => {
    posthog.capture("seller_dashboard_viewed");
    const t = setTimeout(() => {
      setInCohortState(isInCohort());
      setLoading(false);
    }, 700);
    const onChange = () => setInCohortState(isInCohort());
    window.addEventListener("fh:cohortChange", onChange);
    return () => {
      clearTimeout(t);
      window.removeEventListener("fh:cohortChange", onChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SellerDashboardHeader />

      <section
        className="relative w-full flex items-center justify-center"
        style={{ background: "linear-gradient(145deg, #4a5568 0%, #2d3748 50%, #1a202c 100%)", minHeight: 180 }}
      >
        <div className="relative z-10 text-center px-4 py-10">
          <p className="label-eyebrow text-white/70 mb-2">Panel sprzedawcy</p>
          <h1 className="text-2xl md:text-3xl font-normal tracking-tight text-white">Dzień dobry, Kamil</h1>
          <p className="text-sm md:text-base max-w-lg mx-auto text-white/70 mt-2">
            Zarządzaj sprzedażą i obserwuj jakość swojego sklepu.
          </p>
        </div>
        <div className="absolute inset-0 bg-black/20" />
      </section>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="mb-6">
          <CohortToggle />
        </div>

        <div className="mb-5">
          <GlobalFilters range={range} category={category} onRangeChange={setRange} onCategoryChange={setCategory} />
        </div>

        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-xl font-normal tracking-tight text-charcoal">Twój sklep</h2>
          <span className="label-eyebrow text-charcoal/60">{rangeLabel}</span>
        </div>

        <div key={`kpi-${dataKey}`} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 animate-fade-in">
          {data.kpis.map((kpi) => (
            <StatCard key={kpi.label} label={kpi.label} value={kpi.value} trend={kpi.trend} direction={kpi.direction} tone={kpi.tone} />
          ))}
        </div>

        <div key={`charts-${dataKey}`} className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fade-in">
          <div className="lg:col-span-2">
            <VisibilityTrendChart data={data.trend} />
          </div>
          <div className="lg:col-span-1">
            <FunnelBarChart data={data.funnel} />
          </div>
        </div>

        <div className="mt-4">
          {loading ? <QualityScoreSkeleton /> : inCohort ? <QualityScoreWidget /> : null}
        </div>
      </main>
    </div>
  );
}

type Direction = "up" | "down" | "flat";
type Tone = "neutral" | "warning" | "positive";

function StatCard({ label, value, trend, direction = "flat", tone = "neutral" }: {
  label: string; value: string; trend: string; direction?: Direction; tone?: Tone;
}) {
  const trendColor = tone === "warning" ? "text-destructive" : tone === "positive" ? "text-emerald-700" : "text-charcoal/60";
  const arrow = direction === "up" ? "↑" : direction === "down" ? "↓" : "→";

  return (
    <div className="bg-card border border-border rounded-md p-4 sm:p-5">
      <div className="label-eyebrow text-charcoal/60 mb-3 leading-tight min-h-[2em]">{label}</div>
      <div className="text-2xl sm:text-[26px] font-normal tracking-tight mb-2 tabular-nums text-charcoal">{value}</div>
      <div className={`text-[12px] inline-flex items-center gap-1 ${trendColor}`}>
        <span aria-hidden="true">{arrow}</span>
        <span>{trend}</span>
      </div>
    </div>
  );
}
