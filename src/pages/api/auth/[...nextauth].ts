import NextAuth, { type NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import GithubProvider from "next-auth/providers/github";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: env.Twitter_CLIENT_ID,
      clientSecret: env.Twitter_CLIENT_SECRET,
      version: "2.0"
    }),
    GithubProvider({clientId: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET}),
    GoogleProvider({clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET})
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
function GoogleProvider(arg0: { clientId: string; clientSecret: string; }): import("next-auth/providers/index.js").Provider {
  throw new Error("Function not implemented.");
}

