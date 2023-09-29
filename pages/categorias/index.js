import Head from "next/head";
import { useEffect, useState } from "react";
import PageContent from "../../componentes/PageContent/PageContent";
import { CategoriaService } from "../../services/Categoria";
import { Row, Col, Button, Card, Avatar } from "antd";
import {
  EditOutlined,
  SettingOutlined,
  EllipsisOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import convertImage64 from '../../helpers/convertImage64';
import { useRouter } from "next/router";

const PAGE_NAME = 'Listagem de Categorias'
const HEAD_NAME = 'Categorias'

export default function Categorias() {
  const user = 'user'
  const router = useRouter();
  const [listaCategorias, setListaCategorias] = useState([]);

  useEffect(() => {
    async function getCategorias() {
      const categorias = await CategoriaService.listAll();
      setListaCategorias(categorias);
    }
    getCategorias();
  }, []);

  return (
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME}>
      <Button
        // type="primary"
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        onClick={() => router.push('/categorias/cadastro')}
      >
        Cadastrar Nova Categoria
      </Button>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        {listaCategorias.map((categoria) => {
          const imagePath = categoria?.foto_categoria ? convertImage64(categoria?.foto_categoria) : '';
          return (
            <Col key={categoria.cod_categoria} xs={12} sm={8} md={6} lg={4}>
              <Card
                xs={12} sm={8} md={6} lg={4}
                style={{ marginBottom: '20px', width: '100%', height: '95%' }}
                actions={user.includes('admin') && [
                  <SettingOutlined key="setting" />,
                  <EditOutlined
                    key="edit"
                    onClick={() => router.push(`/cadastro?idcategoria=${categoria.cod_categoria}`)}
                  />,
                  <EllipsisOutlined key="ellipsis" />,
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
                  title={categoria.nome}
                  description="This is the description"
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </PageContent>
  );
}
