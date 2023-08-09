import { DefaultSession, NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

import { compare } from "bcrypt";
const comparePassword = async (password: string, passwordHash: string) => {
  return (await compare(password, passwordHash)) || password === passwordHash;
};

declare module "next-auth/jwt" {
  interface Token extends JWT {
    username: string;
    id: string;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      username: string;
      id: string;
    };
  }
  interface User {
    username: string;
    id: string;
  }
}

interface Credentials {
  username: string;
  password: string;
  callbackUrl: string;
  csrfToken: string;
  json: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.user = user;
        token.username = user.username;
      }
      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.username = token.username as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.password || !credentials.username)
          throw new Error("Username or password cannot be empty!.");

        console.log(credentials.username, credentials.password);
        const user = await prisma.user.findFirst({
          where: { username: credentials.username },
        });
        console.log(user);
        if (
          user &&
          (await comparePassword(credentials.password, user.password))
        )
          return user;

        throw new Error("Username or password are incorrects!.");
      },
    }),
  ],
  pages: {},

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 2,
  },
};
