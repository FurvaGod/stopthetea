import NextAuth, { getServerSession, type NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { createCaseForUser } from "@/lib/cases";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || !googleClientSecret) {
  console.warn("Google OAuth credentials are not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.");
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: googleClientId ?? "",
      clientSecret: googleClientSecret ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      if (!user.id) {
        return;
      }
      try {
        await createCaseForUser(user.id, {
          description: "Initial placeholder case created at sign-up.",
          targetPlatform: "Tea",
        });
      } catch (error) {
        console.error("Failed to create default case", error);
      }
    },
  },
};

const handler = NextAuth(authOptions);

export const auth = () => getServerSession(authOptions);

export { handler as GET, handler as POST };
