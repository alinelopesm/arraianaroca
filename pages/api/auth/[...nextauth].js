// next-auth.js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { UsuarioService } from "../../../services/Usuario";
import { AuthUser } from "../../../services/AuthUser";
import { config as dotenvConfig } from "dotenv";
import { redirect } from "next/dist/server/api-utils";

// Carregue as variáveis de ambiente do arquivo .env.local
dotenvConfig();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: {  label: "Senha",  type: "password" },
      },
      authorize: async (credentials) => {
        const payload = {
          email: credentials.email,
          senha: credentials.password
        }
        const responseAuth = await AuthUser.create(payload);

        if (responseAuth.statusCode === 200) {
          console.log('responseAuth', responseAuth);
          const user = await {
            id: responseAuth?.data?.usuario?.cod_usuario,
            name: responseAuth?.data?.usuario?.nome || responseAuth?.email, // Use userAddapter instead of user
            email: responseAuth?.data?.usuario?.email,
            token: credentials?.csrfToken,
          }
          return Promise.resolve(user);
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
    async session({ session, token, user }) {
      session.token = token;
      session.user.id = token.sub;
      return session;
    },
  }
});
