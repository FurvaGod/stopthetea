"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type IntakeFormAnalyticsTrackerProps = {
  formId: string;
};

export function IntakeFormAnalyticsTracker({ formId }: IntakeFormAnalyticsTrackerProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    startedRef.current = hasStarted;
  }, [hasStarted]);

  useEffect(() => {
    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (!form) {
      return;
    }

    const interactiveElements = Array.from(form.querySelectorAll("input, textarea, select"));

    const handleInteraction = () => {
      if (startedRef.current) {
        return;
      }
      startedRef.current = true;
      setHasStarted(true);
      const pageLocation = typeof window !== "undefined" ? window.location.href : undefined;
      trackEvent("intake_form_started", {
        page_location: pageLocation,
      });
    };

    const handleSubmit = () => {
      if (!form.checkValidity()) {
        return;
      }
      const pageLocation = typeof window !== "undefined" ? window.location.href : undefined;
      trackEvent("intake_form_submitted", {
        page_location: pageLocation,
      });
      trackEvent("checkout_started", {
        value: 99.99,
        currency: "USD",
        page_location: pageLocation,
      });
    };

    interactiveElements.forEach((element) => {
      element.addEventListener("focus", handleInteraction, { once: true });
      element.addEventListener("change", handleInteraction, { once: true });
    });

    form.addEventListener("submit", handleSubmit);

    return () => {
      interactiveElements.forEach((element) => {
        element.removeEventListener("focus", handleInteraction);
        element.removeEventListener("change", handleInteraction);
      });
      form.removeEventListener("submit", handleSubmit);
    };
  }, [formId]);

  return null;
}
