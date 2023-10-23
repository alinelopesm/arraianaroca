import { useEffect, useState } from "react";
// import { Carousel, Button } from 'antd';
import { CategoriaService } from "../../services/Categoria";
import convertImage64 from '../../helpers/convertImage64';

const listaCategorias = [
  { category: 'Categoria 1', image: 'imagem1.jpg' },
  { category: 'Categoria 2', image: 'imagem2.jpg' },
  // Adicione mais categorias conforme necessário
];

import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Container, Grid, Typography } from '@mui/material';

const items = [
  {
    name: 'Item 1',
    description: 'Descrição do Item 1',
    image: 'url-da-imagem-1.jpg',
  },
  {
    name: 'Item 2',
    description: 'Descrição do Item 2',
    image: 'url-da-imagem-2.jpg',
  },
  {
    name: 'Item 3',
    description: 'Descrição do Item 3',
    image: 'url-da-imagem-3.jpg',
  },
];

function MyCarousel(props) {
    const [currentCategory, setCurrentCategory] = useState(0);
    const [listaCategorias, setListaCategorias] = useState([]);
  
    useEffect(() => {
        async function getCategorias() {
          const categorias = await CategoriaService.listAll();
          setListaCategorias(categorias);
        }
        getCategorias();
      }, []);

  return (
    <Container style={{zIndex: 0}}>
        <Carousel animation="slide">
        {listaCategorias.map((item, index) => (
            <Item key={index} item={item} />
        ))}
        </Carousel>
    </Container>
  );
}

function Item(props) {
  console.log('Sou o que', props);
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
    <Paper style={paperStyle}>
      <img src={convertImage64(props.item.foto_categoria)} alt={props.item.name} style={imageStyle}/>
      <div style={textContainerStyle}>
        <Typography variant="h5" style={titleStyle}>{props.item.nome}</Typography>
        <Typography variant="body1">{props.item.description}</Typography>
      </div>
    </Paper>
  );
}

export default MyCarousel;
