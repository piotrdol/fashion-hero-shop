export type RangeKey = "7d" | "30d" | "90d";
export type CategoryKey = "all" | "women" | "men" | "shoes" | "accessories";

export const DATE_RANGES: { key: RangeKey; label: string }[] = [
  { key: "7d", label: "Ostatnie 7 dni" },
  { key: "30d", label: "Ostatnie 30 dni" },
  { key: "90d", label: "Ostatnie 90 dni" },
];

export const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "all", label: "Wszystkie kategorie" },
  { key: "women", label: "Odzież damska" },
  { key: "men", label: "Odzież męska" },
  { key: "shoes", label: "Obuwie" },
  { key: "accessories", label: "Akcesoria" },
];

type Direction = "up" | "down" | "flat";
type Tone = "neutral" | "warning" | "positive";

export type Kpi = {
  label: string;
  value: string;
  trend: string;
  direction: Direction;
  tone?: Tone;
};

export type DashboardData = {
  kpis: Kpi[];
  trend: {
    points: number[];
    current: string;
    delta: string;
    rangeLabel: string;
    yMin: number;
    yMax: number;
    xLabels: [string, string, string, string];
  };
  funnel: {
    impressions: number;
    clicks: number;
    purchases: number;
    conversion: string;
  };
};

const RANGE_BASE: Record<RangeKey, DashboardData> = {
  "7d": {
    kpis: [
      { label: "Miesięczny obrót (GMV)", value: "9 850 PLN", trend: "−2,8%", direction: "down" },
      { label: "Zwroty (Return Rate)", value: "33%", trend: "+1 p.p.", direction: "up", tone: "warning" },
      { label: "Widoczność ofert", value: "62%", trend: "−2 p.p.", direction: "down" },
      { label: "Konwersja", value: "2,3%", trend: "+0,2 p.p.", direction: "up", tone: "positive" },
      { label: "Średni czas wysyłki", value: "17h", trend: "−1h", direction: "down", tone: "positive" },
      { label: "Średnia wartość koszyka", value: "178 PLN", trend: "−4 PLN", direction: "down" },
    ],
    trend: {
      points: [66, 65, 64, 62, 62, 63, 62],
      current: "62%",
      delta: "−4 p.p.",
      rangeLabel: "ostatnie 7 dni",
      yMin: 55,
      yMax: 75,
      xLabels: ["D-7", "D-5", "D-3", "Dziś"],
    },
    funnel: { impressions: 34000, clicks: 2600, purchases: 60, conversion: "0,18%" },
  },
  "30d": {
    kpis: [
      { label: "Miesięczny obrót (GMV)", value: "45 400 PLN", trend: "−4,2%", direction: "down" },
      { label: "Zwroty (Return Rate)", value: "35%", trend: "+6 p.p.", direction: "up", tone: "warning" },
      { label: "Widoczność ofert", value: "64%", trend: "−21 p.p.", direction: "down" },
      { label: "Konwersja", value: "2,1%", trend: "—", direction: "flat" },
      { label: "Średni czas wysyłki", value: "18h", trend: "−2h", direction: "down", tone: "positive" },
      { label: "Średnia wartość koszyka", value: "185 PLN", trend: "Stabilnie", direction: "flat" },
    ],
    trend: {
      points: [
        85, 84, 86, 85, 83, 84, 82, 81, 79, 76,
        72, 68, 64, 61, 60, 60, 61, 63, 62, 63,
        64, 63, 64, 65, 64, 63, 64, 65, 64, 64,
      ],
      current: "64%",
      delta: "−21 p.p.",
      rangeLabel: "ostatnie 30 dni",
      yMin: 50,
      yMax: 90,
      xLabels: ["D-30", "D-20", "D-10", "Dziś"],
    },
    funnel: { impressions: 145000, clicks: 11200, purchases: 235, conversion: "0,16%" },
  },
  "90d": {
    kpis: [
      { label: "Miesięczny obrót (GMV)", value: "142 800 PLN", trend: "+3,1%", direction: "up", tone: "positive" },
      { label: "Zwroty (Return Rate)", value: "31%", trend: "−2 p.p.", direction: "down", tone: "positive" },
      { label: "Widoczność ofert", value: "71%", trend: "−9 p.p.", direction: "down" },
      { label: "Konwersja", value: "2,2%", trend: "+0,1 p.p.", direction: "up", tone: "positive" },
      { label: "Średni czas wysyłki", value: "19h", trend: "+1h", direction: "up", tone: "warning" },
      { label: "Średnia wartość koszyka", value: "192 PLN", trend: "+7 PLN", direction: "up", tone: "positive" },
    ],
    trend: {
      points: [
        82, 83, 84, 85, 84, 83, 82, 80, 81, 79,
        78, 76, 75, 74, 72, 70, 69, 70, 71, 72,
        73, 72, 71, 70, 71, 72, 71, 70, 71, 71,
      ],
      current: "71%",
      delta: "−9 p.p.",
      rangeLabel: "ostatnie 90 dni",
      yMin: 60,
      yMax: 90,
      xLabels: ["D-90", "D-60", "D-30", "Dziś"],
    },
    funnel: { impressions: 412000, clicks: 33500, purchases: 780, conversion: "0,19%" },
  },
};

const CATEGORY_VOLUME: Record<CategoryKey, number> = {
  all: 1, women: 0.55, men: 0.3, shoes: 0.22, accessories: 0.12,
};
const CATEGORY_RETURN: Record<CategoryKey, number | null> = {
  all: null, women: 38, men: 28, shoes: 41, accessories: 22,
};
const CATEGORY_AOV_DELTA: Record<CategoryKey, number> = {
  all: 0, women: 12, men: -8, shoes: 24, accessories: -42,
};

const fmtPln = (n: number) =>
  `${Math.round(n).toLocaleString("pl-PL").replace(/,/g, " ").replace(/ /g, " ")} PLN`;

const scaleVolumeLabel = (raw: string, mult: number): string => {
  const m = raw.match(/^([\d\s ]+)(.*)/);
  if (!m) return raw;
  const num = parseInt(m[1].replace(/\s| /g, ""), 10);
  if (isNaN(num)) return raw;
  return `${Math.round(num * mult).toLocaleString("pl-PL").replace(/,/g, " ").replace(/ /g, " ")}${m[2]}`;
};

export function getDashboardData(range: RangeKey, category: CategoryKey): DashboardData {
  const base = RANGE_BASE[range];
  const volMult = CATEGORY_VOLUME[category];
  const returnOverride = CATEGORY_RETURN[category];
  const aovDelta = CATEGORY_AOV_DELTA[category];

  const kpis: Kpi[] = base.kpis.map((kpi) => {
    if (kpi.label.startsWith("Miesięczny obrót")) {
      return { ...kpi, value: scaleVolumeLabel(kpi.value, volMult) };
    }
    if (kpi.label.startsWith("Zwroty") && returnOverride != null) {
      const baseRR = parseInt(kpi.value, 10);
      const delta = returnOverride - baseRR;
      return {
        ...kpi,
        value: `${returnOverride}%`,
        trend: `${delta >= 0 ? "+" : "−"}${Math.abs(delta)} p.p.`,
        direction: delta >= 0 ? "up" : "down",
        tone: returnOverride >= 30 ? "warning" : "positive",
      };
    }
    if (kpi.label.startsWith("Średnia wartość koszyka") && category !== "all") {
      const baseAOV = parseInt(kpi.value, 10);
      const next = Math.max(40, baseAOV + aovDelta);
      return {
        ...kpi,
        value: fmtPln(next),
        trend: `${aovDelta >= 0 ? "+" : "−"}${Math.abs(aovDelta)} PLN`,
        direction: aovDelta >= 0 ? "up" : "down",
        tone: aovDelta >= 0 ? "positive" : "neutral",
      };
    }
    return kpi;
  });

  return {
    kpis,
    trend: base.trend,
    funnel: {
      impressions: Math.round(base.funnel.impressions * volMult),
      clicks: Math.round(base.funnel.clicks * volMult),
      purchases: Math.max(1, Math.round(base.funnel.purchases * volMult)),
      conversion: base.funnel.conversion,
    },
  };
}
