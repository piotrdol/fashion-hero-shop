const KEY = "fh.qualityScoreCohort";

export function isInCohort(): boolean {
  if (typeof window === "undefined") return false;
  const v = window.localStorage.getItem(KEY);
  if (v === null) return true;
  return v === "true";
}

export function setInCohort(v: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, String(v));
  window.dispatchEvent(new Event("fh:cohortChange"));
}
