import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import { getSession } from 'next-auth/react';
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

function MyApp({ Component, pageProps, session}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  return {
    props: {
      session,
    },
  };
}