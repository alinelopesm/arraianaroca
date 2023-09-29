import { useEffect, useState } from "react"
import PageContent from "../../componentes/PageContent/PageContent"
import { MedidaService } from "../../services/Medida"
import { List, ListItem } from "@mui/material"

const PAGE_NAME = 'Listagem de Unidade de Medidas:'
const HEAD_NAME = 'Unidade de Medidas'

export default function Medidas() {
  const [listaMedidas, setListaMedidas] = useState([])

  useEffect(() => {
    async function getMedidas() {
      const medidas = await MedidaService.listAll()
      setListaMedidas(medidas)
    }

    getMedidas()
  })

  return (
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME}>
      <List>
        {listaMedidas.map((medida) => {
          return <ListItem key={medida.cod_un_medida}>
            {medida.nome}
          </ListItem>
        })}
      </List>
    </PageContent>
  )
}

