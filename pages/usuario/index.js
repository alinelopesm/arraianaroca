import Head from "next/head"
import { useEffect, useState } from "react"
import { UsuarioService } from "../../services/Usuarios"
import { List, ListItem } from "@mui/material"

export default function Usuario() {
  const [listaUsuarios, setListaUsuarios] = useState([])

  useEffect(() => {
    async function getUsuarios() {
      const usuarios = await UsuarioService.listAll()
      setListaUsuarios(usuarios)
    }

    getUsuarios()
  })

  console.log('Sou lista', listaUsuarios)
  return (
    <div>
      <Head>
      <title>Usuario</title>
      </Head>

      Lista de Usuarios:
      <List>
        {listaUsuarios.map((usuario) => {
          return <ListItem key={usuario.cod_usuario}>
            {usuario.nome}
          </ListItem>
        })}
      </List>
    </div>
  )
}

