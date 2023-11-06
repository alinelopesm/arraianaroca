import { useSession } from 'next-auth/react';
import { UsuarioService } from "../../services/Usuario"
import { getSession } from "next-auth/react";
import PageContent from "../../componentes/PageContent/PageContent";
import convertImage64 from '../../helpers/convertImage64'
import { useRouter } from "next/router";
import { ReceitaService } from "../../services/Receita"
import { CategoriaService } from "../../services/Categoria"
import { EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Avatar, Button, List, Modal, Image, Flex, Divider, Row, Typography  } from 'antd';

const { Title } = Typography;
const { Meta } = Card;
const PAGE_NAME = 'Perfil do usuário'
const HEAD_NAME = 'Usuário'
/* Pegar o tipo do usuario na variavel de ambiente */
const TYPE_USER = process.env.NEXT_PUBLIC_TYPE_USER ;

const Profile = ({userDataServer, minhasReceitas, listaCategorias}) => {
  const { data: session } = useSession();
  const isAuthenticated = session ? true : false;
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
      {/* <Title level={3}>Categoria: {categoriaData.nome}</Title> */}
      <Card 
        style={{ height: `${user?.imageUrl ? '250px' : '57px'}` }}
        cover={user?.imageUrl ? <Image
          width="20%"
          height={ 150 }
          src={user?.imageUrl}
        /> : null} 
        title={`${user.name}`} 
        extra={<a href={`/usuarios/${userDataServer.cod_usuario}`}>Editar Perfil</a>}
      />
      
      <Flex style={{ width: '100%', marginTop: '48px' }} justify="space-between" align="center">
        <span style={{ fontSize: '20px' }} >Minhas receitas</span>
        <Button onClick={() => router.push(`/receitas/cadastro`)} style={{ background: '#1677ff', color: 'white', width: '20%' }} type="primary" icon={<PlusOutlined />}>
          Adicionar Receita
        </Button>
      </Flex>
      <Divider />
      
      <Row gutter={16}>
        <List
          style={{marginTop: '-16px', width: '100%'}}
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 4,
            xl: 4,
            xxl: 3,
          }}
          header={`${user?.receitas?.length ? `${user?.receitas?.length} Receitas encontradas`: ''}`}
          dataSource={user?.receitas}
          renderItem={(item) => (
            <List.Item >
              <Card
                // title={item.nome_receita}
                hoverable={TYPE_USER !== 'admin'}// Defina a altura do Card
                cover={
                  convertImage64(item?.foto) !== '' ?
                  <img
                    alt="example"
                    src={convertImage64(item?.foto)}
                    style={{
                      width: '100%', // Defina a largura da imagem como 100%
                      height: '200px', // Defina a altura da imagem como 100%
                    }}
                  /> : null
                }
                onClick={() => !isAuthenticated || TYPE_USER !== 'admin' ? router.push(`/receitas/${item?.cod_receita}`) : null}
                actions={isAuthenticated  && TYPE_USER === 'admin' ? [
                  <EditOutlined key="edit" onClick={() => router.push(`/receitas/cadastro/${item?.cod_receita}`)}/>, 
                  <EyeOutlined key="view" onClick={() => router.push(`/receitas/${item?.cod_receita}`)}/>
                ]:[
                  <EyeOutlined key="view" onClick={() => router.push(`/receitas/${item?.cod_receita}`)}/>
                ]}
                size="small"
              >
                <Meta
                  avatar={<Avatar >{item?.tempo_preparo} Min</Avatar>}
                  title={item.nome_receita}
                  description={`Categoria: ${listaCategorias?.find((categ) => categ.cod_categoria === item.cod_categoria)?.nome}` || ''}
                />
              </Card>
            </List.Item>
          )}
        />
      </Row>
    </PageContent>
  );
};

export default Profile;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let minhasReceitas = []

  if (!session || (!session.user.id && !session?.token?.sub)) {
    return {
      redirect: {
        destination: "/api/auth/signin", // Redirecionar para a página de login se o usuário não estiver autenticado
        permanent: false,
      },
    };
  }

  const userIdServer = session.user.id || session?.token?.sub
  const response = await UsuarioService.get(session?.token?.sub);
  const userDataServer = response[0] || {}

  const receitas = await ReceitaService.listAll()
  if(receitas && userDataServer?.cod_usuario) {
    minhasReceitas = receitas?.filter((item) => item.cod_usuario === userDataServer?.cod_usuario)
  }

  const listaCategorias = await CategoriaService.listAll();

  return {
    props: {
      userDataServer,
      minhasReceitas,
      listaCategorias
    },
  };
}
