import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { GoogleSignInButton } from "./GoogleSignInButton";

interface SignInPageProps {
  searchParams: Promise<{
    callback?: string;
  }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const session = await auth();
  const resolvedSearchParams = await searchParams;
  const callbackParam =
    typeof resolvedSearchParams?.callback === "string" ? resolvedSearchParams.callback : undefined;
  const callbackUrl = callbackParam && callbackParam.startsWith("/") ? callbackParam : "/dashboard";

  if (session?.user) {
    redirect(callbackUrl);
  }

  return (
    <section className="min-h-screen bg-[#0B1F3A] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl md:p-10">
        <div className="mb-8 space-y-2 text-center">
          <p className="text-xl font-semibold text-[#0B1F3A]">StopTheTea™</p>
          <h1 className="text-2xl font-semibold text-[#0B1F3A]">Sign in to your account</h1>
          <p className="text-sm text-[#3E4A56]">
            Use a secure sign-in to access your dashboard, review your removal case, and track status updates.
          </p>
        </div>
        <div className="space-y-6">
          <GoogleSignInButton callbackUrl={callbackUrl} />
          <p className="text-center text-xs text-[#3E4A56]">
            We use secure authentication and do not share your sign-in data with third parties.
          </p>
          <Link href="/" className="block text-center text-sm text-slate-500 transition hover:text-slate-700">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
