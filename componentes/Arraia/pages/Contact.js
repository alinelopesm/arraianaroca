// components/Contact.js
import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
// import Map from '../components/Mapa/index';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Mapa/index'), { ssr: false });

const Contact = () => {
  return (
    <Container id="contact" sx={{ py: 5 }}>
      <Map />
    </Container>
  );
};

export default Contact;
