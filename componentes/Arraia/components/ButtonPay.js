import React from 'react';
import { useScrollTrigger, Zoom, Box, Button, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';

const ButtonPay = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 270,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Zoom in={isMobile || trigger}>
      <Box
        role="presentation"
        sx={{
          position: 'fixed',
          top: !isMobile ? 80 : 'none',
          bottom: isMobile ? 15 : 'none',
          right: !isMobile ? 16 : 'none',
          left: isMobile ? 20 : 'none',
          zIndex: 9999, // Ensures it overlays everything
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
      </Box>
    </Zoom>
  );
};

export default ButtonPay;
