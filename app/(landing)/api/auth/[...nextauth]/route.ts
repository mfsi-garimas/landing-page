import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email:{label:"Email", type:"text"},
                password:{label:"Password", type:"password"}
            },
            async authorize(
                credentials: Record<"email" | "password", string> | undefined,
                req: any ): Promise<{ id: string; name: string; email: string; role: string } | null>  {
                if(!credentials?.email || !credentials?.password) return null
                const user = await prisma.user.findUnique({where : {email: credentials.email}})
                if(!user) return null
                const valid = await bcrypt.compare(credentials.password, user.password)
                if(!valid) return null
                return {id: user.id.toString(), name: user.name ?? "", email: user.email, role: user.role}
            }
        })
    ],
    session: {
        strategy: "jwt" as const
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}