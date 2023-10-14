import { useEffect, useState } from "react";
import PageContent from "../../componentes/PageContent/PageContent";
import { UsuarioService } from "../../services/Usuario"
import { Row, Col, Button, Card, Avatar } from "antd";
import {
  EditOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import convertImage64 from '../../helpers/convertImage64';
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';

const user = 'admin'
const PAGE_NAME = 'Listagem de usuários'
const HEAD_NAME = 'Usuário'

export default function Usuario() {
  const { data: session } = useSession();
  const isAuthenticated = session ? true : false
  const router = useRouter();
  const [listaUsuarios, setListaUsuarios] = useState([])

    useEffect(() => {
      async function getUsuarios() {
        const usuarios = await UsuarioService.listAll()
        setListaUsuarios(usuarios)
      }

      getUsuarios()
    })

  return (
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME}>
      <Button
        style={{ position: 'fixed', right: '40px' }}
        onClick={() => router.push('/signup')}
      >
        Cadastrar Novo Usuário
      </Button>
      <Row gutter={16} style={{ marginTop: '48px' }}>
        {listaUsuarios.map((usuario) => {
          const imagePath = usuario?.foto_usuario ? convertImage64(usuario?.foto_usuario) : '';
          return (
            <Col key={usuario.cod_usuario} xs={12} sm={8} md={6} lg={4}>
              <Card
                xs={12} sm={8} md={6} lg={4}
                style={{ marginBottom: '20px', width: '100%', height: '95%' }}
                actions={isAuthenticated && user.includes('admin') && [
                  <EditOutlined
                    key="edit"
                    onClick={() => router.push(`/usuarios/${usuario.cod_usuario}`)}
                  />,
                ]}
              >
                <div style={{ maxWidth: '100%', maxHeight: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Avatar
                    size={{ xs: 32, sm: 32, md: 64, lg: 100, xl: 80, xxl: 100 }}
                    icon={imagePath ? null : <PictureOutlined />} 
                    src={imagePath || undefined} // Define o src como undefined se não houver imagePath
                    shape="square"
                  />
                </div>
                <Card.Meta
                  title={usuario.nome}
                  style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft:'30px'}}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </PageContent>
  );
}


//   return (
//     <PageContent pageName={PAGE_NAME} headName={HEAD_NAME}>
//       <List>
//         {listaUsuarios.map((usuario) => {
//           return <ListItem key={usuario.cod_usuario}>
//             {usuario.nome}
//           </ListItem>
//         })}
//       </List>
//     </PageContent>
//   )
// }

