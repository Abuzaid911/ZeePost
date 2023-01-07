import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
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
    GithubProvider({clientId: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET, style: {
      logo: "",
      logoDark: "",
      bg: "#fff",
      bgDark: "#fff",
      text: "#000",
      textDark: "#000"
    },}),
    GoogleProvider({clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET, style: {
      logo: "",
      logoDark: "",
      bgDark: "#fff",
      bg: "#fff",
      text: "#000",
      textDark: "#000"
    },})
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);

