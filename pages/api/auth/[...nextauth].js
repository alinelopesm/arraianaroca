// next-auth.js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { UsuarioService } from "../../../services/Usuario";
import { config as dotenvConfig } from "dotenv";
import { redirect } from "next/dist/server/api-utils";

// Carregue as variáveis de ambiente do arquivo .env.local
dotenvConfig();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: {  label: "Senha",  type: "password" },
      },
      authorize: async (credentials) => {
        // Faça a validação do usuário usando seu serviço de usuário
        const usuarios = await UsuarioService.listAll();
        const userAdapter = await usuarios.find(
          (u) => u.nome === credentials.username
        );

        if (userAdapter) {
          if (userAdapter.senha === credentials.password) {
            const user = {
              name: userAdapter.nome, // Use userAddapter instead of user
              email: userAdapter.email,
              image: userAdapter.foto_usuario || '',
              token: credentials.csrfToken,
            }
            return Promise.resolve(user);
          }
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  session: {
    jwt: true, // Use JWT para armazenar informações de sessão
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY, // Chave privada de assinatura
    encryptionKey: process.env.JWT_ENCRYPTION_PRIVATE_KEY,
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async signIn({ credentials }) {
      if(credentials.csrfToken && credentials.username) {
        return true
      }
      return false
    },
    async redirect({ baseUrl }) {
      return baseUrl
    },
    async session({ session, token }) {
      session.token = token
      return session
    },
    async jwt({ token }) {
      return token
    }
  }
});
