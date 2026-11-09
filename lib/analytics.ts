declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const GTM_READY_EVENT = "gtm.load";
const GTM_READY_TIMEOUT_MS = 4000;

export function pushDataLayerEvent(event: string) {
  const payload = { event };
  window.dataLayer = window.dataLayer ?? [];
  if (hasEvent(window.dataLayer, GTM_READY_EVENT)) {
    window.dataLayer.push(payload);
    return;
  }

  const started = Date.now();
  const timer = window.setInterval(() => {
    window.dataLayer = window.dataLayer ?? [];
    const ready = hasEvent(window.dataLayer, GTM_READY_EVENT);
    if (!ready && Date.now() - started < GTM_READY_TIMEOUT_MS) return;
    window.clearInterval(timer);
    window.dataLayer.push(payload);
  }, 50);
}

function hasEvent(dataLayer: Array<Record<string, unknown>>, event: string) {
  return dataLayer.some((entry) => entry.event === event);
}
