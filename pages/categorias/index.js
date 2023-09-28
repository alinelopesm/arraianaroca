import Head from "next/head"
import { useEffect, useState } from "react"
import { CategoriaService } from "../../services/Categoria"
import { List, ListItem } from "@mui/material"
import { Image } from 'antd';
import convertImage64 from '../../helpers/convertImage64'

export default function Categorias() {
  const [listaCategorias, setListaCategorias] = useState([])

  useEffect(() => {
    async function getCategorias() {
      const categorias = await CategoriaService.listAll()
      setListaCategorias(categorias)
    }
    getCategorias()
  })

  return (
    <div>
      <Head>
      <title>Categorias</title>
      </Head>

      Lista Categorias:
      <List>
        {listaCategorias.map((categoria) => {
          const imagePath = categoria?.foto_categoria ? convertImage64(categoria?.foto_categoria) : ''
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

