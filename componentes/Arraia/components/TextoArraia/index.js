import React from 'react';
import Typography from '@mui/material/Typography';
import styles from './index.module.css';
import { useMediaQuery, useTheme } from '@mui/material';

const TextArraia = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      {!isMobile &&
        <header className={styles.header}>
          <Typography variant="body1" component="p">
            🎉 Venha participar do nosso tradicional Arraiá da Roça no dia <strong>29 de junho de 2024</strong>, um sábado que promete muita diversão e alegria para toda a família!
          </Typography>
        </header>
      }

      <article className={styles.article}>
        <Typography variant="body1" component="p">
          🕢 <strong>Data e Horário:</strong> 29 de junho de 2024 - A partir das 18h
        </Typography>
      </article>

      {!isMobile &&
        <article className={styles.article}>
          <Typography variant="body1" component="p">
            🌽 <strong>Comidas Típicas</strong>
          </Typography>
          <ul className={styles.ul}>
            <li>Milho verde</li>
            <li>Pipoca</li>
            <li>Canjica</li>
            <li>Paçoca</li>
            <li>Quentão</li>
            <li>E muito mais!</li>
          </ul>
        </article>
      }

      <article className={styles.article}>
        <Typography variant="body1" component="p">
          🎶 <strong>Atração Musical</strong>
        </Typography>
        <Typography variant="body1" component="p">
          Para animar a noite, contaremos com a presença da incrível <strong>Joe's Pub</strong>, com um repertório pra lá de especial!
        </Typography>
      </article>

      <article className={styles.article}>
        <Typography variant="body1" component="p">
          👒 <strong>Traje Típico</strong>
        </Typography>
        <Typography variant="body1" component="p">
          Vista sua melhor roupa caipira e entre no clima da festa! Haverá prêmios para os trajes mais criativos e autênticos.
        </Typography>
      </article>

      <article className={styles.article}>
        <Typography variant="body1" component="p">
          🚨 <strong>Ingressos:</strong>
        </Typography>
        <Typography variant="body1" component="p">
          Garanta já o seu ingresso! Eles estão à venda no link aqui na pagina. Os ingressos são limitados, então corra e não fique de fora!
        </Typography>
      </article>
    </div>
  );
};

export default TextArraia;
