import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './prisma';
import bcrypt from 'bcryptjs';


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }
}


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const email = credentials.email.trim().toLowerCase();
        const password = credentials.password;

        const user = await prisma.user.findUnique({
          where: { email },
          
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) 
        {
          return null;
        }
        return { id: user.id.toString(), email: user.email };
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt', 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email; 
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ? token.sub.toString() : ''; 
        session.user.email = token.email ? token.email : '';

      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};
