import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 1023px)";

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/** True below lg (1024px) — matches max-lg breakpoints. */
export function useMobileViewport() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
