declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    Cookiebot?: {
      consent?: {
        marketing?: boolean;
        statistics?: boolean;
        preferences?: boolean;
      };
    };
  }
}

function hasMeasurementConsent() {
  const consent = window.Cookiebot?.consent;
  return consent?.marketing === true && consent?.statistics === true;
}

export function pushDataLayerEvent(event: string, onPushed?: () => void) {
  let pushed = false;

  const tryPush = () => {
    if (pushed || !hasMeasurementConsent()) return false;
    pushed = true;
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event });
    onPushed?.();
    return true;
  };

  if (tryPush()) return () => {};

  const onReady = () => {
    if (!tryPush()) return;
    window.removeEventListener("CookiebotOnConsentReady", onReady);
    window.removeEventListener("CookiebotOnAccept", onReady);
  };

  window.addEventListener("CookiebotOnConsentReady", onReady);
  window.addEventListener("CookiebotOnAccept", onReady);
  return () => {
    window.removeEventListener("CookiebotOnConsentReady", onReady);
    window.removeEventListener("CookiebotOnAccept", onReady);
  };
}
