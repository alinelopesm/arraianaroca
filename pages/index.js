import React from 'react';
import PageContent from '../componentes/PageContent/PageContent';
import { useSession } from 'next-auth/react';


const PAGE_NAME = 'Home'

const Home = ({ Component, pageProps }) => {
  const { data: session } = useSession();

  return (
    <PageContent pageProps={pageProps} pageName={PAGE_NAME}>
      <h1>{PAGE_NAME}</h1>
      {session ? (
        <div>
          <p>Username: {session.user.name}</p>
          <p>Email: {session.user.email}</p>
        </div>
      ) : (
        <p>O usuário não está autenticado.</p>
      )}
    </PageContent>
  );
};

export default Home;
