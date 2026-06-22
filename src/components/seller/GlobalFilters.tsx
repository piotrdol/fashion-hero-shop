"use client";

import { DATE_RANGES, CATEGORIES, type RangeKey, type CategoryKey } from "@/lib/seller/mockData";

export function GlobalFilters({
  range,
  category,
  onRangeChange,
  onCategoryChange,
}: {
  range: RangeKey;
  category: CategoryKey;
  onRangeChange: (v: RangeKey) => void;
  onCategoryChange: (v: CategoryKey) => void;
}) {
  return (
    <div className="bg-card border border-border rounded-md px-3 py-2.5 sm:px-4 sm:py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <FilterSelect label="Zakres dat" value={range} options={DATE_RANGES} onChange={(v) => onRangeChange(v as RangeKey)} />
        <FilterSelect label="Kategoria" value={category} options={CATEGORIES} onChange={(v) => onCategoryChange(v as CategoryKey)} />
      </div>
      <div className="sm:ml-auto">
        <button
          type="button"
          onClick={() => console.log("[filters] export_csv", { range, category })}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-charcoal/30 text-charcoal hover:bg-charcoal/5 transition-colors rounded-md px-3 h-9 text-[11px] tracking-[0.08em] uppercase font-medium"
        >
          Eksportuj do CSV
        </button>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { key: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-charcoal min-w-0">
      <span className="label-eyebrow text-charcoal/60 shrink-0">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-card border border-border rounded-md h-9 pl-3 pr-8 text-[13px] text-charcoal focus:outline-none focus:border-charcoal/40 cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.key} value={opt.key}>{opt.label}</option>
          ))}
        </select>
        <span aria-hidden="true" className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal/50 text-[10px]">▾</span>
      </div>
    </label>
  );
}
