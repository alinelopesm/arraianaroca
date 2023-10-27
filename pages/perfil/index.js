import { Card, Avatar, Button, List, Modal, Image, Flex, Segmented  } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { UsuarioService } from "../../services/Usuario"
import { getSession } from "next-auth/react";
import PageContent from "../../componentes/PageContent/PageContent";
import convertImage64 from '../../helpers/convertImage64'
import { useRouter } from "next/router";
import { ReceitaService } from "../../services/Receita"

const { Meta } = Card;
const user = 'admin'
const PAGE_NAME = 'Perfil do usuário'
const HEAD_NAME = 'Usuário'
/* Pegar o tipo do usuario na variavel de ambiente */
const TYPE_USER = process.env.NEXT_PUBLIC_TYPE_USER ;

const Profile = ({userDataServer, minhasReceitas}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const user = {
    name: userDataServer.nome,
    email: userDataServer.email,
    imageUrl: convertImage64(userDataServer?.foto_usuario),
    receitas: minhasReceitas,
  };

  const editProfile = () => {
    router.push(`/usuarios/${userDataServer.cod_usuario}`)
  };

  return (
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME}>
      <Card
        style={{ width: 300 }}
        cover={<Image
          width="100%"
          src={user?.imageUrl}
        />}
        actions={[
          <Button icon={<EditOutlined />} onClick={editProfile}>
            Editar Perfil
          </Button>
        ]}
      >
        <Meta title={user.name} />
        <Meta title={user.email} />
      </Card>

     
      <Flex style={{ width: '100%', marginTop: '48px' }} justify="space-between" align="center">
        <span style={{ fontSize: '20px' }} >Minhas receitas</span>
        <Button onClick={() => router.push(`/receitas/cadastro`)} style={{ background: '#1677ff', color: 'white', width: '20%' }} type="primary" icon={<PlusOutlined />}>
          Adicionar Receita
        </Button>
      </Flex>

      <List
        dataSource={user.receitas}
        renderItem={receita => (
          <List.Item>
            <List.Item.Meta title={`${receita.cod_receita} - ${receita.nome_receita}`} />
            <List.Item.Meta title={receita.title} />
            <Button onClick={() => router.push(`/receitas/${receita.cod_receita}`)} style={{ position: 'fixed', right: '40px' }} icon={<EditOutlined/>}>Editar</Button>
          </List.Item>
        )}
      />

      
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

  const receitas = await ReceitaService.listAll()
  const minhasReceitas = receitas?.filter((item) => item.cod_usuario === userDataServer.cod_usuario)
  console.log('Sou receitas', minhasReceitas);

  return {
    props: {
      userDataServer,
      minhasReceitas
    },
  };
}
