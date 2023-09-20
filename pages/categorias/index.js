import Head from "next/head"
import { useEffect, useState } from "react"
import { CategoriaService } from "../../services/Categoria"
import { List, ListItem } from "@mui/material"

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
          return <ListItem key={categoria.cod_categoria}>
            {categoria.nome}
          </ListItem>
        })}
      </List>
    </div>
  )
}

