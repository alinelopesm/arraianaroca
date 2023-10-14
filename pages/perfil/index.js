import { Card, Avatar, Button, List, Modal, Image } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { UsuarioService } from "../../services/Usuario"
import { getSession } from "next-auth/react";
import PageContent from "../../componentes/PageContent/PageContent";
import convertImage64 from '../../helpers/convertImage64'
import { useRouter } from "next/router";

const { Meta } = Card;
const user = 'admin'
const PAGE_NAME = 'Perfil do usuário'
const HEAD_NAME = 'Usuário'

const Profile = ({userDataServer}) => {
  const router = useRouter();
  const user = {
    name: userDataServer.nome,
    imageUrl: convertImage64(userDataServer?.foto_usuario),
    recipes: [
      { id: 1, title: 'Receita 1' },
      { id: 2, title: 'Receita 2' },
    ],
  };

  const editProfile = () => {
    router.push(`/usuarios/${userDataServer.cod_usuario}`)
  };

  return (
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME}>
      <Card
        style={{ width: 300 }}
        cover={<Image
          width={200}
          src={user?.imageUrl}
        />}
        actions={[
          <Button icon={<EditOutlined />} onClick={editProfile}>
            Editar Perfil
          </Button>
        ]}
      >
        <Meta title={user.name} />
      </Card>

      <h2>Suas Receitas</h2>
      <List
        dataSource={user.recipes}
        renderItem={recipe => (
          <List.Item>
            <List.Item.Meta title={recipe.title} />
            <Button icon={<EditOutlined />}>Editar</Button>
          </List.Item>
        )}
      />

      <Button type="primary" icon={<PlusOutlined />}>Adicionar Receita</Button>
    </PageContent>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin", // Redirecionar para a página de login se o usuário não estiver autenticado
        permanent: false,
      },
    };
  }

  const response = await UsuarioService.get(session?.token?.sub);
  const userDataServer = response[0] || {}

  return {
    props: {
      userDataServer
    },
  };
}
