"use client";

import { useRouter } from "next/navigation";
import { Lock, TrendingDown, TrendingUp } from "lucide-react";
import { logClick } from "@/lib/seller/analytics";
import posthog from "posthog-js";

export function QualityScoreWidget() {
  const router = useRouter();

  const handleClick = () => {
    logClick("quality_score_cta_click");
    posthog.capture("quality_score_cta_clicked");
    router.push("/seller/insights");
  };

  return (
    <article className="bg-card border border-border rounded-md overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <span className="label-eyebrow text-charcoal">Quality Score</span>
          <span className="inline-flex items-center gap-1.5 label-eyebrow text-charcoal bg-muted px-2 py-1 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-charcoal" /> Beta
          </span>
        </div>

        <div className="flex items-end gap-2 mb-2 select-none">
          <span className="text-5xl sm:text-6xl font-normal tracking-tight text-charcoal/40" style={{ filter: "blur(7px)" }} aria-hidden="true">87</span>
          <span className="text-2xl text-charcoal/40 mb-2">/100</span>
          <Lock className="w-4 h-4 text-charcoal/60 mb-3 ml-1" strokeWidth={1.5} />
        </div>
        <p className="text-[13px] text-charcoal/70 leading-relaxed mb-6">
          Zobacz, jak kupujący oceniają jakość Twojej sprzedaży i jak wypadasz na tle najlepszych sprzedawców w Twojej kategorii.
        </p>

        <div className="border-t border-border pt-5">
          <div className="flex items-center justify-between mb-4">
            <span className="label-eyebrow text-charcoal">Insights Konkurencji</span>
            <Lock className="w-3.5 h-3.5 text-charcoal/50" strokeWidth={1.5} />
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-charcoal/80">Twój wskaźnik zwrotów vs TOP 20% Sprzedawców</span>
            </div>
            <div className="relative w-full h-2.5 bg-muted rounded-full overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-muted animate-pulse" style={{ width: "100%" }} aria-hidden="true" />
              <div className="absolute inset-y-0 left-0 bg-charcoal rounded-full" style={{ width: "35%" }} />
              <div className="absolute top-1/2 -translate-y-1/2 h-4 w-[2px] bg-charcoal/30" style={{ left: "calc(70% - 1px)", filter: "blur(2px)" }} aria-hidden="true" />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[11px] text-charcoal font-medium">Ty: 35%</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-charcoal/50">
                <span className="inline-block w-12 h-3 bg-muted rounded animate-pulse" aria-hidden="true" />
                <Lock className="w-3 h-3" strokeWidth={1.5} />
                TOP 20%
              </span>
            </div>
          </div>

          <div className="bg-muted/40 border border-border rounded p-3 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded bg-card border border-border flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-charcoal" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="label-eyebrow text-charcoal/60 mb-1.5">Szacowana utrata widoczności</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-normal text-charcoal/60 select-none" style={{ filter: "blur(5px)" }} aria-hidden="true">−42%</span>
                  <span className="text-[11px] text-charcoal/60">na tle optymalnych sklepów</span>
                </div>
                <div className="mt-2 h-2 w-3/4 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClick}
            className="w-full inline-flex items-center justify-center gap-2 bg-charcoal text-white rounded h-11 px-5 text-[12px] font-medium uppercase tracking-[0.5px] hover:opacity-90 transition-opacity"
          >
            <TrendingUp className="w-4 h-4" strokeWidth={1.5} />
            Odblokuj insights i popraw wynik
          </button>
        </div>
      </div>
    </article>
  );
}
