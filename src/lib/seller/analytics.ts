const KEY = "fh.events";

export type ClickEvent = {
  name: string;
  sellerId: string;
  timestamp: string;
};

export function logClick(name: string, sellerId = "seller_demo_kamil") {
  const evt: ClickEvent = { name, sellerId, timestamp: new Date().toISOString() };
  try {
    const raw = window.localStorage.getItem(KEY);
    const arr: ClickEvent[] = raw ? JSON.parse(raw) : [];
    arr.push(evt);
    window.localStorage.setItem(KEY, JSON.stringify(arr));
  } catch {
    /* ignore */
  }
  console.info("[fake-door click]", evt);
}
