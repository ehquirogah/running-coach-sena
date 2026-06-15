import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcryptjs";
import { usuarioSchema } from "./validations/usuario.schema";
import { MOCK_USERS } from "./mock-data";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        documento: { label: "Documento", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.documento || !credentials?.password) return null;

        // 1. MOCK BYPASS (For Demo Mode without DB)
        const mockUser = MOCK_USERS.find(u => u.documento === credentials.documento);
        if (mockUser && credentials.password === "Password123") {
          return {
            id: mockUser.id,
            name: mockUser.nombre,
            email: mockUser.email,
            rol: mockUser.rol,
            documento: mockUser.documento,
          };
        }

        // 2. REAL AUTH (Only tried if mock fails and DB is available)
        try {
          const user = await prisma.usuario.findUnique({
            where: { documento: credentials.documento as string },
          });

          if (!user || !user.password) return null;

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isPasswordCorrect) return null;

          return {
            id: user.id,
            name: user.nombre,
            email: user.email,
            rol: user.rol,
            documento: user.documento,
          };
        } catch (error) {
          console.error("Auth Error (DB possibly down):", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.rol = (user as any).rol;
        token.documento = (user as any).documento;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).rol = token.rol;
        (session.user as any).documento = token.documento;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
