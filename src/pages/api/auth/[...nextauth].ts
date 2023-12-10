// import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import prisma from "../../../../modules/db"

export const auth = {
    // adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ],
    pages: {
        signIn: '/auth/login',
        signOut: '/',
    },
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt',
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    callbacks: {
        async session(session: any) {
            return session
        },
        async redirect(url: any) {
            return url.baseUrl;
        }
    },
}

export default NextAuth(auth as any)