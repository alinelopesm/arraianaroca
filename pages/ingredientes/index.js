import Head from "next/head"
import { useEffect, useState } from "react"
import { IngredienteService } from "../../services/Ingrediente"
import { List, ListItem } from "@mui/material"

export default function Ingredientes() {
  const [listaIngredientes, setListaIngredientes] = useState([])

  useEffect(() => {
    async function getIngredientes() {
      const ingredientes = await IngredienteService.listAll()
      setListaIngredientes(ingredientes)
    }

    getIngredientes()
  })

  return (
    <div>
      <Head>
      <title>Categorias</title>
      </Head>

      Lista Categorias:
      <List>
        {listaIngredientes.map((ingrediente) => {
          return <ListItem key={ingrediente.cod_ingrediente}>
            {categoria.nome}
          </ListItem>
        })}
      </List>
    </div>
  )
}

