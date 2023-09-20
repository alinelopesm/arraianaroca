import Head from "next/head"
import { useEffect, useState } from "react"
import { MedidaService } from "../../services/Medida"
import { List, ListItem } from "@mui/material"

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
    <div>
      <Head>
      <title>Unidade de Medidas</title>
      </Head>

      Lista Unidade de Medidas:
      <List>
        {listaMedidas.map((medida) => {
          return <ListItem key={medida.cod_un_medida}>
            {medida.nome}
          </ListItem>
        })}
      </List>
    </div>
  )
}

