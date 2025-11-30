"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

type DashboardAnalyticsTrackerProps = {
  caseCreated: boolean;
  caseNumber?: string;
};

export function DashboardAnalyticsTracker({ caseCreated, caseNumber }: DashboardAnalyticsTrackerProps) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (!caseCreated || firedRef.current) {
      return;
    }
    firedRef.current = true;
    const pageLocation = typeof window !== "undefined" ? window.location.href : undefined;
    trackEvent("dmca_case_created", {
      case_number: caseNumber,
      page_location: pageLocation,
    });

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("caseCreated");
      url.searchParams.delete("caseId");
      if (caseNumber) {
        url.searchParams.delete("caseNumber");
      }
      window.history.replaceState(null, "", url);
    }
  }, [caseCreated, caseNumber]);

  return null;
}
