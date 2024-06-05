// components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ py: 3, textAlign: 'center', backgroundColor: 'grey.800', color: 'white' }}>
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} Arraiá na Roça. Todos os direitos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
