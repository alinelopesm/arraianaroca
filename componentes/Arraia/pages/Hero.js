import React from 'react';
import { Typography, Box, Button, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const themeProvider = createTheme({
  typography: {
    fontFamily: '"Amatic SC", cursive',
  },
});

const typographyStyle = {
  color: '#FFFFFF',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  fontWeight: 'bold',
  marginBotoom: '20px',
  backgroundImage: 'url(/utils/img/banner.jpeg)',
  backgroundSize: 'cover',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};



const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        height: '85vh',
        backgroundImage: 'url(/utils/img/banner.png)',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isMobile ? 'center' : 'end',
        alignItems: isMobile ?  'flex-end' : 'center',
        textAlign: 'center',
        paddingRight: isMobile ? 2 : 0,
      }}
    >
      <Link href="https://loja.infinitepay.io/aamatias" passHref>
        <Button
          variant="contained"
          color="primary"
          size="large"
          style={{ backgroundImage: 'url(/utils/img/banner.jpeg)', color: 'white' }}
        >
          Comprar ingresso
        </Button>
      </Link>
      <Typography className='respons' variant="h5" component="p" gutterBottom style={{paddingTop: 20 }}>
        Ingressos a venda, garanta já o seu
      </Typography>
      <ThemeProvider theme={themeProvider}>
        <Typography className='respons' variant="h1" component="h1" gutterBottom style={{ ...typographyStyle}}>
          Arraia na Roça
        </Typography>
      </ThemeProvider>
    </Box>
  );
};

export default Hero;
