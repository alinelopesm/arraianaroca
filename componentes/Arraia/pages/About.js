// components/About.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import TextoArraia from '../components/TextoArraia';

const About = () => {
  return (
    <Container id="about" sx={{ py: 5, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 1 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Informações da Festa
      </Typography>
      <TextoArraia />
    </Container>
  );
};

export default About;
