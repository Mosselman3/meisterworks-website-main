"use client";

import { useEffect, useRef } from "react";

type CalendlyWidget = {
  initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyWidget;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const WIDGET_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";

export function CalendlyEmbed({
  url,
  thankYouPath,
}: {
  url: string;
  thankYouPath: string;
}) {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) return;
    let cancelled = false;

    function init() {
      if (cancelled || !parent || !window.Calendly) return;
      parent.replaceChildren();
      window.Calendly.initInlineWidget({
        url: embedUrl(url),
        parentElement: parent,
      });
    }

    if (window.Calendly) {
      init();
    } else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SCRIPT}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = WIDGET_SCRIPT;
        script.async = true;
        document.body.appendChild(script);
      }
      script.addEventListener("load", init, { once: true });
    }

    function onMessage(event: MessageEvent) {
      if (event.origin !== "https://calendly.com") return;
      const data = event.data as { event?: string } | null;
      if (data?.event !== "calendly.event_scheduled") return;
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({ event: "calendly_scheduled" });
      window.location.assign(thankYouPath);
    }

    window.addEventListener("message", onMessage);
    return () => {
      cancelled = true;
      window.removeEventListener("message", onMessage);
    };
  }, [thankYouPath, url]);

  return (
    <div
      ref={parentRef}
      className="min-h-[700px] overflow-hidden rounded-[18px] bg-white"
    />
  );
}

function embedUrl(schedulingUrl: string) {
  const url = new URL(schedulingUrl);
  if (!url.searchParams.has("primary_color")) {
    url.searchParams.set("primary_color", "a67c52");
  }
  return url.toString();
}
