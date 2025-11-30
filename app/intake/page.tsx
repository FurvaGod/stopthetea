import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { OWNERSHIP_TYPES } from "@/lib/cases";
import { redirect } from "next/navigation";
import { ScreenshotUploader } from "@/app/intake/ScreenshotUploader";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.stopthetea.com/intake",
  },
};

export const dynamic = "force-dynamic";

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export default async function IntakePage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const session = await auth();
  const resolvedParams = searchParams ? await searchParams : undefined;
  const errorMessage =
    typeof resolvedParams?.error === "string" ? decodeURIComponent(resolvedParams.error) : null;

  if (!session?.user?.id) {
    redirect(`/signin?callback=${encodeURIComponent("/intake")}`);
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <section className="min-h-screen bg-[#F4F6F8] px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-2xl border border-[#D1D5DB] bg-white p-8 shadow-lg">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-[#38B7B0]">DMCA Intake</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#0B1F3A]">Request A Tea Takedown</h1>
            <p className="mt-3 text-base text-[#3E4A56]">
              Share complete details so our legal team can issue a compliant DMCA notice on your behalf.
              After submitting the form you will be redirected to our secure Stripe checkout to pay the case fee.
            </p>
            <p className="mt-2 rounded-md border border-[#FACC15] bg-[#FEF9C3] px-4 py-2 text-sm text-[#92400E]">
              Please fill out every section to the best of your ability. Missing or inaccurate information can delay or prevent
              the removal process.
            </p>
          </div>
          {errorMessage && (
            <p className="mt-6 rounded-lg border border-[#F87171] bg-[#FEF2F2] px-4 py-3 text-sm text-[#B91C1C]">
              {errorMessage}
            </p>
          )}
          <form action="/intake/submit" method="post" className="mt-8 space-y-8">
            <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#38B7B0]">Section 1</p>
              <h2 className="mt-2 text-xl font-semibold text-[#0B1F3A]">Copyrighted Work Details</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <label htmlFor="copyrightedWorkDescription" className="text-sm font-semibold text-[#0B1F3A]">
                    Describe the original work
                  </label>
                  <textarea
                    id="copyrightedWorkDescription"
                    name="copyrightedWorkDescription"
                    className="mt-2 h-32 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                    placeholder="Explain what you created and why you hold the rights."
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="dateCreated" className="text-sm font-semibold text-[#0B1F3A]">
                      Date created
                    </label>
                    <input
                      id="dateCreated"
                      name="dateCreated"
                      type="date"
                      className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="originalPublicationLocation" className="text-sm font-semibold text-[#0B1F3A]">
                      Where was it first published?
                    </label>
                    <input
                      id="originalPublicationLocation"
                      name="originalPublicationLocation"
                      type="text"
                      className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                      placeholder="Example: https://myportfolio.com/shoot"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="ownershipType" className="text-sm font-semibold text-[#0B1F3A]">
                    Ownership type
                  </label>
                  <select
                    id="ownershipType"
                    name="ownershipType"
                    defaultValue={OWNERSHIP_TYPES[0]}
                    className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                  >
                    {OWNERSHIP_TYPES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#38B7B0]">Section 2</p>
              <h2 className="mt-2 text-xl font-semibold text-[#0B1F3A]">Infringing Material Details</h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="teaUsername" className="text-sm font-semibold text-[#0B1F3A]">
                      Tea username
                    </label>
                    <input
                      id="teaUsername"
                      name="teaUsername"
                      type="text"
                      className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                      placeholder="@offender"
                    />
                  </div>
                  <div>
                    <label htmlFor="teaProfileUrl" className="text-sm font-semibold text-[#0B1F3A]">
                      Tea profile link
                    </label>
                    <input
                      id="teaProfileUrl"
                      name="teaProfileUrl"
                      type="text"
                      className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                      placeholder="https://tea.app/profile/abc123"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="whereContentAppears" className="text-sm font-semibold text-[#0B1F3A]">
                    Where does the infringing content appear?
                  </label>
                  <input
                    id="whereContentAppears"
                    name="whereContentAppears"
                    type="text"
                    className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                    placeholder="Tea post title, folder, or link"
                  />
                </div>
                <div>
                  <label htmlFor="commentsOrCaptions" className="text-sm font-semibold text-[#0B1F3A]">
                    Comments or captions (optional)
                  </label>
                  <input
                    id="commentsOrCaptions"
                    name="commentsOrCaptions"
                    type="text"
                    className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                    placeholder="Quote any offensive captions or comments"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0B1F3A]">Screenshots (optional)</p>
                  <div className="mt-3">
                    <ScreenshotUploader />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#38B7B0]">Section 3</p>
              <h2 className="mt-2 text-xl font-semibold text-[#0B1F3A]">Contact Information</h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="fullLegalName" className="text-sm font-semibold text-[#0B1F3A]">
                      Full legal name
                    </label>
                    <input
                      id="fullLegalName"
                      name="fullLegalName"
                      type="text"
                      defaultValue={session.user?.name ?? ""}
                      className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-semibold text-[#0B1F3A]">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={session.user?.email ?? ""}
                      className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-semibold text-[#0B1F3A]">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="addressLine1" className="text-sm font-semibold text-[#0B1F3A]">
                      Address line 1
                    </label>
                    <input
                      id="addressLine1"
                      name="addressLine1"
                      type="text"
                      className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="addressLine2" className="text-sm font-semibold text-[#0B1F3A]">
                      Address line 2 (optional)
                    </label>
                    <input
                      id="addressLine2"
                      name="addressLine2"
                      type="text"
                      className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label htmlFor="city" className="text-sm font-semibold text-[#0B1F3A]">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="text-sm font-semibold text-[#0B1F3A]">
                      State / Region
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="text-sm font-semibold text-[#0B1F3A]">
                      ZIP / Postal code
                    </label>
                    <input
                      id="zip"
                      name="zip"
                      type="text"
                      className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="country" className="text-sm font-semibold text-[#0B1F3A]">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    defaultValue="United States"
                    className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#38B7B0]">Section 4</p>
              <h2 className="mt-2 text-xl font-semibold text-[#0B1F3A]">Electronic Signature</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <label htmlFor="electronicSignature" className="text-sm font-semibold text-[#0B1F3A]">
                    Type your full name
                  </label>
                  <input
                    id="electronicSignature"
                    name="electronicSignature"
                    type="text"
                    defaultValue={session.user?.name ?? ""}
                    className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                    placeholder="This acts as your signature"
                  />
                </div>
                <div>
                  <label htmlFor="signatureDate" className="text-sm font-semibold text-[#0B1F3A]">
                    Signature date
                  </label>
                  <input
                    id="signatureDate"
                    name="signatureDate"
                    type="date"
                    defaultValue={today}
                    className="mt-2 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm text-[#1F2530] focus:border-[#38B7B0] focus:outline-none"
                  />
                </div>
                <p className="rounded-lg bg-[#F9FAFB] px-4 py-3 text-xs text-[#3E4A56]">
                  By submitting this form you attest, under penalty of perjury, that you are authorized to act for the
                  copyright owner and that the information provided is accurate.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-[#D1D5DB] bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-semibold text-[#0B1F3A]">Ready to submit?</p>
                <p className="text-sm text-[#3E4A56]">
                  Once you submit, you will be redirected to Stripe to complete payment before the case is opened.
                </p>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#38B7B0] hover:text-[#0B1F3A] md:w-auto"
              >
                Submit My Case
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
