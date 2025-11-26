"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="inline-flex items-center justify-center rounded-md border border-[#D1D5DB] px-4 py-2 text-sm font-semibold text-[#0B1F3A] transition hover:border-[#0B1F3A] hover:text-[#38B7B0]"
    >
      Log out
    </button>
  );
}
