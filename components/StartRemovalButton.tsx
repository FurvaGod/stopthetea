"use client";

import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

type StartRemovalButtonProps = {
  className?: string;
};

export function StartRemovalButton({ className }: StartRemovalButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        trackEvent("start_removal_cta_click", { location: "hero" });
        router.push("/intake");
      }}
    >
      Start Removal
    </button>
  );
}
