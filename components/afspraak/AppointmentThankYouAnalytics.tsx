"use client";

import { useEffect } from "react";
import { pushDataLayerEvent } from "@/lib/analytics";

export function AppointmentThankYouAnalytics() {
  useEffect(() => {
    let scheduled = false;
    try {
      scheduled =
        window.sessionStorage.getItem("meisterworks_appointment_scheduled") ===
        "true";
    } catch {
      // Keep the confirmation page usable if storage is unavailable.
    }
    if (!scheduled) return;

    return pushDataLayerEvent("appointment_booking_complete", () => {
      try {
        window.sessionStorage.removeItem("meisterworks_appointment_scheduled");
      } catch {
        // The confirmation page stays usable if storage is unavailable.
      }
    });
  }, []);

  return null;
}
