import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { organization } from "better-auth/plugins";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "@/constants";

const prisma = new PrismaClient();

export const auth = betterAuth({
  plugins: [admin(), organization()],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },

  onSession: async ({
    session,
    user,
  }: {
    session: any;
    user: PrismaUser | null;
  }) => {
    if (user && session) {
      session.role = user.role; // Adiciona a role do usuário à sessão
    }
    return session;
  },
  socialProviders: {
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    },
  },
});
