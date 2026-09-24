import {
  configurationProgress,
  getProduct,
  INITIAL_STATE,
  MAX_DOORS,
  snapshotDoor,
  type ConfiguratorState,
} from "@/components/configurator/logic";

const STORAGE_KEY = "meisterworks.configurator.draft";
const DISMISS_KEY = "meisterworks.configurator.resume.dismissedAt";
export const CONFIGURATOR_DRAFT_EVENT = "meisterworks-configurator-draft";

export type ConfiguratorDraft = {
  version: 2;
  state: ConfiguratorState;
  doors: ConfiguratorState[];
  activeIndex: number;
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

function asDoors(value: unknown, fallback: ConfiguratorState): ConfiguratorState[] {
  if (!Array.isArray(value)) return [snapshotDoor(fallback)];
  const doors = value
    .map((item) => asState(item))
    .filter((item): item is ConfiguratorState => Boolean(item))
    .slice(0, MAX_DOORS)
    .map(snapshotDoor);
  return doors.length > 0 ? doors : [snapshotDoor(fallback)];
}

function draftProgress(doors: ConfiguratorState[]) {
  return Math.round(
    doors.reduce((sum, door) => sum + configurationProgress(door), 0) /
      doors.length,
  );
}

function draftLabel(doors: ConfiguratorState[], active: ConfiguratorState) {
  if (doors.length > 1) return `${doors.length} deuren`;
  return getProduct(active.productId).label;
}

export function readConfiguratorDraft(): ConfiguratorDraft | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as {
      version?: number;
      state?: unknown;
      doors?: unknown;
      activeIndex?: number;
      productLabel?: string;
      savedAt?: number;
    };
    const state = asState(data.state);
    if (!state) return null;
    if (data.version !== 1 && data.version !== 2) return null;
    const doors = asDoors(data.doors, state);
    const activeIndex = Math.min(
      Math.max(0, typeof data.activeIndex === "number" ? data.activeIndex : 0),
      doors.length - 1,
    );
    const active = doors[activeIndex] ?? state;
    const progressPct = draftProgress(doors);
    if (progressPct <= 0) return null;
    return {
      version: 2,
      state: active,
      doors,
      activeIndex,
      progressPct,
      productLabel:
        typeof data.productLabel === "string"
          ? data.productLabel
          : draftLabel(doors, active),
      savedAt: typeof data.savedAt === "number" ? data.savedAt : 0,
    };
  } catch {
    return null;
  }
}

export function writeConfiguratorDraft(
  state: ConfiguratorState,
  doors: ConfiguratorState[] = [state],
  activeIndex = 0,
) {
  if (!canUseStorage()) return;
  const nextDoors = asDoors(doors, state).map((door, index) =>
    index === activeIndex ? snapshotDoor(state) : snapshotDoor(door),
  );
  const progressPct = draftProgress(nextDoors);
  if (progressPct <= 0) {
    clearConfiguratorDraft();
    return;
  }
  const active = nextDoors[Math.min(activeIndex, nextDoors.length - 1)] ?? state;
  const draft: ConfiguratorDraft = {
    version: 2,
    state: snapshotDoor(active),
    doors: nextDoors,
    activeIndex: Math.min(activeIndex, nextDoors.length - 1),
    progressPct,
    productLabel: draftLabel(nextDoors, active),
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
