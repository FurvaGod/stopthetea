"use client";

import { signIn } from "next-auth/react";

interface GoogleSignInButtonProps {
  callbackUrl: string;
}

export function GoogleSignInButton({ callbackUrl }: GoogleSignInButtonProps) {
  const handleSignIn = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <button
      type="button"
      aria-label="Continue with Google"
      onClick={handleSignIn}
      className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#38B7B0] py-3 font-semibold text-white transition hover:bg-[#2C8F8A]"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white">
        G
      </span>
      Continue with Google
    </button>
  );
}
