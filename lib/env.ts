type EnvValue = string & { __brand: "EnvValue" };

function requireEnv(key: string): EnvValue {
  const value = process.env[key];
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value as EnvValue;
}

function optionalEnv(key: string): string {
  return process.env[key] ?? "";
}

export const env = {
  databaseUrl: requireEnv("DATABASE_URL"),
  stripeSecretKey: requireEnv("STRIPE_SECRET_KEY"),
  stripeWebhookSecret: requireEnv("STRIPE_WEBHOOK_SECRET"),
  stripePriceId: requireEnv("STRIPE_PRICE_ID"),
  nextPublicStripePriceId: optionalEnv("NEXT_PUBLIC_STRIPE_PRICE_ID"),
  nextPublicStripePublishableKey: optionalEnv("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
  nextAuthSecret: requireEnv("NEXTAUTH_SECRET"),
  nextAuthUrl: optionalEnv("NEXTAUTH_URL"),
  googleClientId: optionalEnv("GOOGLE_CLIENT_ID"),
  googleClientSecret: optionalEnv("GOOGLE_CLIENT_SECRET"),
  resendApiKey: requireEnv("RESEND_API_KEY"),
  emailFrom: optionalEnv("EMAIL_FROM") || "StopTheTea Support <support@stopthetea.com>",
  uploadthingSecret: requireEnv("UPLOADTHING_SECRET"),
  uploadthingAppId: requireEnv("UPLOADTHING_APP_ID"),
};

export type Env = typeof env;
