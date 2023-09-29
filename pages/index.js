import React from 'react';
import PageContent from '../componentes/PageContent/PageContent';

const PAGE_NAME = 'Home'

const Home = ({ Component, pageProps }) => {

  return (
    <PageContent pageProps={pageProps} pageName={PAGE_NAME}>
      <h1>{PAGE_NAME}</h1>
    </PageContent>
  );
};

export default Home;
