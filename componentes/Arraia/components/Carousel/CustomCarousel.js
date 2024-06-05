import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import styles from './styles.module.css';

const itemsCarousel = [
  {
    title: 'Milho',
    description: 'Milho verde assado',
    image: '/utils/img/milho.jpeg',
  },
  {
    title: 'Caldo de Mandioca',
    description: 'Delicioso caldo para aquecer a família',
    image: '/utils/img/caldo.jpeg',
  },
  {
    title: 'Pipoca',
    description: 'Crianças de 3 a 12 anos. Inclui open food, passagem livre para prinquedos e kit surpresa',
    image: '/utils/img/pipoca.jpeg',
  },
  {
    title: 'Paçoquinha',
    image: '/utils/img/pacoca.jpeg',
  },
];

const CustomCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? itemsCarousel.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === itemsCarousel.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Container id="custom-carousel" sx={{ py: 5 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Cardápio
      </Typography>
      <div className={styles.carouselContainer}>
        <IconButton
          className={`${styles.carouselButton} ${styles.prev}`}
          onClick={handlePrev}
          sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' } }}
        >
          <ArrowBackIos />
        </IconButton>
        <div
          className={styles.carouselWrapper}
          style={{ transform: `translateX(-${currentIndex * (100 / itemsCarousel.length)}%)` }}
        >
          {itemsCarousel.map((service, index) => (
            <div className={styles.carouselItem} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <img src={service.image} alt={service.title} className={styles.carouselImage} />
                  <Typography variant="h5" component="h3">
                    {service.title}
                  </Typography>
                  {service.description && (
                    <Typography variant="body2" component="p">
                      {service.description}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <IconButton
          className={`${styles.carouselButton} ${styles.next}`}
          onClick={handleNext}
          sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)', color: 'white' } }}
        >
          <ArrowForwardIos />
        </IconButton>
      </div>
    </Container>
  );
};

export default CustomCarousel;
