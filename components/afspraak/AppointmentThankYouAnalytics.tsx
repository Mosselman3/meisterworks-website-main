"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function AppointmentThankYouAnalytics() {
  useEffect(() => {
    let scheduled = true;
    try {
      scheduled =
        window.sessionStorage.getItem("meisterworks_appointment_scheduled") ===
        "true";
      window.sessionStorage.removeItem("meisterworks_appointment_scheduled");
    } catch {
      // Keep the confirmation page usable if storage is unavailable.
    }
    if (!scheduled) return;

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: "appointment_booking_complete" });
  }, []);

  return null;
}
