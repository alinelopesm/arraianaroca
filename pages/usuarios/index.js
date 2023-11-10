import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';
import { Row, Col, Button, Card, Avatar } from "antd";
import {
  EditOutlined,
  PictureOutlined,
  DeleteOutlined 
} from "@ant-design/icons";
import convertImage64 from '../../helpers/convertImage64';
import AdminOnly from '../../componentes/PegeAlerts/NoAdmin';
import PageContent from "../../componentes/PageContent/PageContent";
import { UsuarioService } from "../../services/Usuario";

const PAGE_NAME = 'Listagem de usuários';
const HEAD_NAME = 'Usuário';
/* Pegar o tipo do usuario na variavel de ambiente */
const TYPE_USER = process.env.NEXT_PUBLIC_TYPE_USER;

export default function Usuario() {
  const router = useRouter();
  const { data: session } = useSession();
  const isAuthenticated = session ? true : false;
  const [listaUsuarios, setListaUsuarios] = useState([]);

  async function getUsuarios() {
    const usuarios = await UsuarioService.listAll();
    setListaUsuarios(usuarios);
  }

  useEffect(() => {
    getUsuarios()
  })

  async function removeItem(id) {
    const response = await UsuarioService.remove(id);
    getUsuarios()
  }

  return (
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME}>
      {isAuthenticated && TYPE_USER === 'admin' ?
        <>
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
                    actions={[
                      <EditOutlined
                        key="edit"
                        onClick={() => router.push(`/usuarios/${usuario.cod_usuario}`)}
                      />,
                      <DeleteOutlined style={{color: 'red'}} key="clouse" onClick={() => removeItem(usuario.cod_usuario)}/>
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
        </>
        :
        <AdminOnly />
      }
    </PageContent>
  );
}

