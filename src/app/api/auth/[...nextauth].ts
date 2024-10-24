import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';


declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }
}
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials provided');
        }
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email },
          include : {notes: true}
        });

        if (!user) {
          throw new Error('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) 
        {
          throw new Error('Invalid email or password');
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
});
