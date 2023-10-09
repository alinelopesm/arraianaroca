import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Trata a Promise e atualiza o estado quando ela é resolvida
    getSession().then((resolvedSession) => {
      setSession(resolvedSession);
    });
  }, [session]);

  if (session === null) {
    // Aguardando a resolução da Promise
    return <p>Aguardando autenticação...</p>;
  }

  return (
    <SessionProvider session={pageProps.session}>
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
  };drdrrdrdrb
}