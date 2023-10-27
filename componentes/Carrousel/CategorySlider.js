import { useEffect, useState } from "react";
import React from 'react';
import { useRouter } from "next/router";
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Container, Grid, Typography } from '@mui/material';
import convertImage64 from '../../helpers/convertImage64';
import Link from 'next/link';

function CategorySlider({ categorias }) {
  const [currentCategory, setCurrentCategory] = useState(0);

  return (
    <Container style={{zIndex: 0}}>
        <Carousel animation="slide" style={{zIndex: 0}}>
          {categorias?.map((item, index) => (
              <Item key={index} item={item} />
          ))}
        </Carousel>
    </Container>
  );
}

function Item(props) {
  const router = useRouter();
  const imageStyle = {
    width: '100%', // Ajusta a largura da imagem para ocupar o container todo
    height: '300px', // Ajusta a altura da imagem para ocupar o container todo
    objectFit: 'cover', // Mantém a proporção da imagem e cobre todo o espaço disponível
  };
  
  const paperStyle = {
    position: 'relative', // Define a posição relativa para que possamos posicionar o texto absolutamente dentro do Paper.
  };

  const textContainerStyle = {
    position: 'absolute',
    top: 0, // Posicione o texto no topo do Paper.
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adicione um fundo semi-transparente para legibilidade.
    padding: '10px', // Ajuste o preenchimento conforme necessário.
    color: 'white', // Cor do texto.
  };

  const titleStyle = {
    textAlign: 'center', // Centraliza o título horizontalmente.
  };
      
  return (
    <Paper style={paperStyle} onClick={() => router.push(`/categorias/${props.item?.cod_categoria}`)}>
      <Link href={`/categorias/${props.item.cod_categoria}`} passHref>
      <img src={convertImage64(props.item.foto_categoria)} alt={props.item.nome} style={imageStyle}/>
      <div style={textContainerStyle}>
        <Typography variant="h5" style={titleStyle}>{props.item.nome}</Typography>
        <Typography variant="body1">{props.item.description}</Typography>
      </div>
      </Link>
    </Paper>
  );
}

export default CategorySlider;
