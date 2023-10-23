import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import { getSession } from 'next-auth/react';
import { config as dotenvConfig } from "dotenv";
dotenvConfig()

/* Montagem da aplicação */
function MyApp({ Component, pageProps, session}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} session={session}/>
    </SessionProvider>
  );
}
export default MyApp;

/* Chamada do servidor next para iniciar sessão */
export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  return {
    props: {
      session,
    },
  };
}