import Head from "next/head"
import { useEffect, useState } from "react"
import { CategoriaService } from "../../services/Categoria"
import { List, ListItem } from "@mui/material"
import { Image } from 'antd';

export default function Categorias() {
  const [listaCategorias, setListaCategorias] = useState([])

  useEffect(() => {
    async function getCategorias() {
      const categorias = await CategoriaService.listAll()
      setListaCategorias(categorias)
    }
    getCategorias()
  })

  function convertImage(imageArrayFromDatabase) {
    const base64ImageFromDatabase = imageArrayFromDatabase.data.map(byte => String.fromCharCode(byte)).join("");
    return `${base64ImageFromDatabase}`
  }

  return (
    <div>
      <Head>
      <title>Categorias</title>
      </Head>

      Lista Categorias:
      <List>
        {listaCategorias.map((categoria) => {
          const imagePath = categoria?.foto_categoria ? convertImage(categoria?.foto_categoria) : ''
          return <>
          <ListItem key={categoria.cod_categoria}>
            nome={categoria.nome}<br/>
          </ListItem>
          <Image
              width={200}
              src={imagePath}
            />
          </>
        })}
      </List>
    </div>
  )
}

