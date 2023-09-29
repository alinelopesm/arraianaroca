import { useEffect, useState } from "react"
import PageContent from "../../componentes/PageContent/PageContent"
import { UsuarioService } from "../../services/Usuario"
import { List, ListItem } from "@mui/material"

const PAGE_NAME = 'Listagem de usuários'
const HEAD_NAME = 'Usuário'

export default function Usuario() {
  const [listaUsuarios, setListaUsuarios] = useState([])

  useEffect(() => {
    async function getUsuarios() {
      const usuarios = await UsuarioService.listAll()
      setListaUsuarios(usuarios)
    }

    getUsuarios()
  })

  return (
    <PageContent pageName={PAGE_NAME} headName={HEAD_NAME}>
      <List>
        {listaUsuarios.map((usuario) => {
          return <ListItem key={usuario.cod_usuario}>
            {usuario.nome}
          </ListItem>
        })}
      </List>
    </PageContent>
  )
}

