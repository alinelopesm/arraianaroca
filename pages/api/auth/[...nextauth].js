// next-auth.js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { UsuarioService } from "../../../services/Usuario";
import { config as dotenvConfig } from "dotenv";

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
        const userAddapter = usuarios.find(
          (u) => u.nome === credentials.username && u.senha === credentials.password
        );

        const user = {
          name: user.nome,
          email: user.email,
          image: user.foto_usuario || '',
          token: credentials.csrfToken,
        }
        if (userAddapter) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
      credentials: {
        domain: {
          label: "Receitas Gourmet",
          type: "text ",
          placeholder: "Receitas Gourmet",
          value: "Receitas",
        },
        username: { label: "Nome", type: "text ", placeholder: "Digite" },
        password: { label: "Senhas", type: "password" },
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
    async signIn({ user, account, profile, email, credentials }) {
      if(credentials.csrfToken && credentials.username) {
        return true
      }
      return false
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, token, user, newSession, trigger }) {
      return session
    },
    async jwt({ token }) {
      return token
    }
}
//   pages: {
//     signIn: "/login", // Define a rota de login personalizada
//   },
});
