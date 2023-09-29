import Head from "next/head"
import { useEffect, useState } from "react"
import PageContent from "../../componentes/PageContent/PageContent"
import { IngredienteService } from "../../services/Ingrediente"
import { List, ListItem } from "@mui/material"

const PAGE_NAME = 'Listagem de Ingredientes'
const HEAD_NAME = 'Ingredientes'

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
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME}>
      <List>
        {listaIngredientes.map((ingrediente) => {
          return <ListItem key={ingrediente.cod_ingrediente}>
            {ingrediente.nome}
          </ListItem>
        })}
      </List>
    </PageContent>
  )
}

