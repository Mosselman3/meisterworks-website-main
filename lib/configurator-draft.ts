import {
  configurationProgress,
  getProduct,
  INITIAL_STATE,
  type ConfiguratorState,
} from "@/components/configurator/logic";

const STORAGE_KEY = "meisterworks.configurator.draft";
const DISMISS_KEY = "meisterworks.configurator.resume.dismissedAt";
export const CONFIGURATOR_DRAFT_EVENT = "meisterworks-configurator-draft";

export type ConfiguratorDraft = {
  version: 1;
  state: ConfiguratorState;
  progressPct: number;
  productLabel: string;
  savedAt: number;
};

function canUseStorage() {
  return typeof window !== "undefined";
}

function notify() {
  window.dispatchEvent(new Event(CONFIGURATOR_DRAFT_EVENT));
}

function asState(value: unknown): ConfiguratorState | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Partial<ConfiguratorState>;
  if (typeof record.productId !== "string") return null;
  return {
    ...INITIAL_STATE,
    ...record,
    answered:
      record.answered && typeof record.answered === "object"
        ? record.answered
        : {},
    groupOpen:
      record.groupOpen && typeof record.groupOpen === "object"
        ? record.groupOpen
        : {},
    summaryOpen: false,
    liveSummaryOpen: false,
  };
}

export function readConfiguratorDraft(): ConfiguratorDraft | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<ConfiguratorDraft>;
    const state = asState(data.state);
    if (data.version !== 1 || !state) return null;
    const progressPct = configurationProgress(state);
    if (progressPct <= 0) return null;
    return {
      version: 1,
      state,
      progressPct,
      productLabel:
        typeof data.productLabel === "string"
          ? data.productLabel
          : getProduct(state.productId).label,
      savedAt: typeof data.savedAt === "number" ? data.savedAt : 0,
    };
  } catch {
    return null;
  }
}

export function writeConfiguratorDraft(state: ConfiguratorState) {
  if (!canUseStorage()) return;
  const progressPct = configurationProgress(state);
  if (progressPct <= 0) return;
  const draft: ConfiguratorDraft = {
    version: 1,
    state: {
      ...state,
      summaryOpen: false,
      liveSummaryOpen: false,
    },
    progressPct,
    productLabel: getProduct(state.productId).label,
    savedAt: Date.now(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  notify();
}

export function clearConfiguratorDraft() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.sessionStorage.removeItem(DISMISS_KEY);
  notify();
}

export function resumeDismissedAt() {
  if (!canUseStorage()) return 0;
  const value = Number(window.sessionStorage.getItem(DISMISS_KEY) || 0);
  return Number.isFinite(value) ? value : 0;
}

export function dismissConfiguratorResume(savedAt: number) {
  if (!canUseStorage()) return;
  window.sessionStorage.setItem(DISMISS_KEY, String(savedAt));
  notify();
}

export function subscribeConfiguratorDraft(onChange: () => void) {
  if (!canUseStorage()) return () => {};
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(CONFIGURATOR_DRAFT_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CONFIGURATOR_DRAFT_EVENT, onChange);
  };
}
