import React from 'react';
import { Typography, Card, CardContent, Box, Button } from '@mui/material';

const Map = () => {
  const handleShareLocation = () => {
    const locationUrl = `https://maps.app.goo.gl/kqRFexxUf8Ug4UU77`;
    navigator.clipboard.writeText(locationUrl);
    alert('Localização copiada para a área de transferência!');
  };

  const handleOpenInMaps = () => {
    window.open('https://maps.app.goo.gl/kqRFexxUf8Ug4UU77', '_blank');
  };

  return (
    <Box sx={{ mt: 5, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
      <Box sx={{ order: { xs: 2, md: 1 } }}>
        <Typography variant="body1" component="p" sx={{ mb: 1 }}>
          Traga sua família e amigos para celebrar essa noite mágica conosco! Vamos juntos fazer um arraiá inesquecível!
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 1 }}>
          📅 <strong>Data:</strong> 29/06/2024 (Sábado)
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 1 }}>
          📍 <strong>Local:</strong> Nome do Local - Endereço
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 1 }}>
          🕢 <strong>Horário:</strong> A partir das 18h
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 1 }}>
          Para mais informações, siga nossas redes sociais ou entre em contato pelo telefone [número do telefone].
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 2 }}>
          Viva São João! Esperamos por você! 🌟🎉🌽🎶
        </Typography>
      </Box>
      <Box sx={{ order: { xs: 1, md: 2 }, position: 'relative' }}>
        <Card>
          <CardContent>
            <img src='/utils/img/chacara.png' alt='localização' style={{ width: '100%' }} />
            <Box sx={{ position: 'absolute', bottom: 25, right: 15, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pt: 1, pr: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleShareLocation}
                sx={{ mb: 1 }}
              >
                Copiar Localização
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenInMaps}
              >
                Abrir no Maps
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Map;
