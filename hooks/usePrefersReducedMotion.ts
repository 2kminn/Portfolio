"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
const storageKey = "portfolio-animations";
const changeEvent = "portfolio-animation-change";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  window.addEventListener("storage", onChange);
  window.addEventListener(changeEvent, onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
    window.removeEventListener(changeEvent, onChange);
  };
}

function getSnapshot() {
  const saved = window.localStorage.getItem(storageKey);
  if (saved === "on") return false;
  if (saved === "off") return true;
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  // Keep the first client render aligned with the server before reading the preference.
  return false;
}

export default function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setAnimationsEnabled(enabled: boolean) {
  window.localStorage.setItem(storageKey, enabled ? "on" : "off");
  window.dispatchEvent(new Event(changeEvent));
}
