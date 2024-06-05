import React from 'react';
import Header from './components/StructPage/Header';
import Hero from './pages/Hero';
import About from './pages/About';
import CustomCarousel from './components/Carousel/CustomCarousel';
import Contact from './pages/Contact';
import Footer from './components/StructPage/Footer';
import { Grid } from '@mui/material';
import ScrollToTop from './components/ScrollToTop';
import { Box } from '@mui/material';
import ButtonPay from './components/ButtonPay';

const Home = () => {
  return (
    <>
      <Header />
      <ButtonPay />
      <Box sx={{ position: 'relative' }}> {/* Adicionado position: relative */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                height: '85vh',
                backgroundImage: 'url(/utils/img/testemadeira.jpeg)',
                backgroundRepeat: 'no-repeats',
              }}
            >
              <Hero />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <About />
          </Grid>
          <Grid item xs={12}>
            <CustomCarousel />
          </Grid>
          <Grid item xs={12}>
            <Contact />
          </Grid>
          <Grid item xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </Box>
      <ScrollToTop />
    </>
  );
};

export default Home;
