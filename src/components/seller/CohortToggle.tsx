"use client";

import { useEffect, useState } from "react";
import { isInCohort, setInCohort } from "@/lib/seller/featureFlag";
import posthog from "posthog-js";

export function CohortToggle() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(isInCohort());
    const onChange = () => setEnabled(isInCohort());
    window.addEventListener("fh:cohortChange", onChange);
    return () => window.removeEventListener("fh:cohortChange", onChange);
  }, []);

  const toggle = () => {
    const next = !enabled;
    setInCohort(next);
    setEnabled(next);
    posthog.capture("feature_flag_toggled", {
      flag: "quality_score_cohort",
      value: next,
    });
  };

  return (
    <div className="bg-card border border-dashed border-border rounded-md p-4 flex items-center justify-between gap-4">
      <div>
        <div className="label-eyebrow text-charcoal/60 mb-1">Feature flag (demo)</div>
        <div className="text-[13px] text-charcoal">
          quality_score_cohort: <span className="font-medium">{enabled ? "true" : "false"}</span>
          {" · "}
          <span className="text-charcoal/60">
            {enabled ? 'Seller "Kamil" widzi widget' : 'Seller "Dorota" — bez widgetu'}
          </span>
        </div>
      </div>
      <button
        onClick={toggle}
        className="shrink-0 inline-flex items-center justify-center border border-charcoal text-charcoal rounded h-9 px-4 text-[11px] font-medium uppercase tracking-[0.5px] hover:bg-charcoal hover:text-white transition-colors"
      >
        Przełącz
      </button>
    </div>
  );
}
