"use client";

import { useEffect } from "react";
import { pushDataLayerEvent } from "@/lib/analytics";

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

    pushDataLayerEvent("appointment_booking_complete");
  }, []);

  return null;
}
