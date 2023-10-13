import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}