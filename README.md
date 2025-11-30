## StopTheTea Intake & Checkout Flow

This project is a Next.js 16 App Router app that captures DMCA-style intake requests, routes users through Stripe Checkout, and turns paid submissions into Prisma cases that show up in the dashboard.

### Desired user journey

1. **Homepage → Intake** – “Start Removal” buttons and footer links point at `/intake`.
2. **Complete intake form** – every schema field (description, infringing profile, evidence, legal + contact info, signature) is required. Screenshots must be attached.
3. **Server-side session save** – on submit we validate, serialize the payload, encrypt it with `INTAKE_SESSION_SECRET`, and store it in a httpOnly cookie.
4. **Stripe Checkout** – `/api/create-checkout-session` ensures the encrypted payload exists, builds the checkout session (fixed price), and redirects straight to Stripe.
5. **Success redirect** – Stripe calls back to `/intake/success?session_id=...`. The route verifies payment, loads the saved payload, creates the Prisma case, sends the Resend confirmation email, clears the session, and finally redirects the user to `/dashboard`.

If the user abandons checkout, no case is created and the encrypted payload eventually expires.

### Environment variables

| Name | Purpose |
| --- | --- |
| `STRIPE_SECRET_KEY` | Server-side Stripe API key used by checkout + success handlers. |
| `STRIPE_PRICE_ID` | Price configured for the $99.99 removal fee. |
| `INTAKE_SESSION_SECRET` | 32+ character secret for encrypting the intake payload stored in cookies. |
| `RESEND_API_KEY` | Sends the “Case Received” email after payment succeeds. |
| `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, Google OAuth keys | Required for NextAuth Google sign-in. |
| UploadThing keys | Power the screenshot uploader component. |
| `ADMIN_EMAILS` | Comma-separated list of addresses allowed to load `/admin/cases` and exports. |

### Development scripts

```bash
npm install           # install deps
npm run dev           # launch Next.js locally
npx prisma migrate dev# apply the latest Prisma schema (drops PendingCase table)
```

### Notes for contributors

- Intake data now lives only in the encrypted session until payment succeeds. Pending-case tables and checkout pages were removed.
- `/checkout/*` routes simply redirect to `/intake` for backward compatibility; Stripe now returns to `/intake/success` instead.
- Make sure `INTAKE_SESSION_SECRET` is set in `.env.local` before submitting the form locally, otherwise the server action will throw.
- After a successful payment the user lands on their dashboard; no case is ever created before Stripe confirms.

### Stripe fraud protections

- `/intake/success` re-retrieves the Checkout Session with expanded line items and rejects anything that is not both `status === "complete"` and `payment_status === "paid"`.
- Only the configured `STRIPE_PRICE_ID` is accepted, quantity must be one, and the session’s `amount_total`/currency must match the price’s `unit_amount`/currency—blocking callbacks that try to spoof cheaper products.
- If the metadata `userId` or `client_reference_id` fails to match the signed-in user we abort and keep the intake payload encrypted in the session.
- Any mismatch sends the user back to `/intake` with an actionable error so they can contact support with the Stripe receipt for investigation.

#### Suggested Stripe Radar rules

1. **Auto-block `risk_level: highest`.** This catches the cards Stripe already flags as fraudulent before they ever reach checkout success.
2. **Require 3D Secure when available** (`request_three_d_secure = "any"`) for cards with elevated `risk_score` or countries with higher fraud rates.
3. **Manual review when billing country ≠ IP country** to catch proxied purchases; Stripe exposes both signals to Radar.
4. **Block repeated attempts per payment method fingerprint** (e.g., more than 3 declines in 24 hours) to stop brute-force behavior against the fixed-price product.

### Admin case tracker

- `/admin/cases` requires sign-in with one of the `ADMIN_EMAILS` addresses and surfaces every case with user email, platform link, evidence links, created timestamp, and live status.
- Each row has an inline status selector that uses a server action, so staff can manually advance or roll back cases without touching the database.
- The “Download CSV” button calls `/admin/cases/export`, streaming a spreadsheet-friendly snapshot (case number, customer email, platform link, timestamp, screenshot URLs, status) for audits or offline analysis.
Deployed from Mac on 2025-11-27.