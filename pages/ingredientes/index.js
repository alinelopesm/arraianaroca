import { useEffect, useState } from "react";
import PageContent from "../../componentes/PageContent/PageContent";
import { Row, Col, Button, Card, Avatar } from "antd";
import {
  EditOutlined, DeleteOutlined
} from "@ant-design/icons";
import { IngredienteService } from "../../services/Ingrediente"
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';

const user = 'admin'
const PAGE_NAME = 'Listagem de Ingredientes'
const HEAD_NAME = 'Ingredientes'
/* Pegar o tipo do usuario na variavel de ambiente */
const TYPE_USER = process.env.NEXT_PUBLIC_TYPE_USER ;

export default function Ingredientes() {
  const { data: session } = useSession();
  const isAuthenticated = session ? true : false
  const router = useRouter();
  const [listaIngredientes, setListaIngredientes] = useState([])

  async function getIngredientes() {
    const ingredientes = await IngredienteService.listAll()
    setListaIngredientes(ingredientes)
  }

  useEffect(() => {
    getIngredientes()
  })

  async function removeItem(id) {
    const response = await IngredienteService.remove(id);
    getIngredientes()
  }

  return (
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME}>
      <Row gutter={16} justify='end'>
        {isAuthenticated &&
          <Button
            style={{ background: '#1677ff', color: 'white', zIndex: 3  }}
            onClick={() => router.push('/ingredientes/cadastro')}
          >
            Cadastrar Ingrediente
          </Button>
        }
      </Row>
      <Row gutter={16} style={{ marginTop: '48px' }}>
        {listaIngredientes.map((ingrediente) => {
          return (
            <Col key={ingrediente.cod_ingrediente} xs={12} sm={8} md={6} lg={4}>
              <Card
                xs={12} sm={8} md={6} lg={4}
                style={{ marginBottom: '20px', width: '100%', height: '95%' }}
                actions={isAuthenticated && [
                  <EditOutlined
                    key="edit"
                    style={{color: 'blue'}}
                    onClick={() => router.push(`/ingredientes/${ingrediente.cod_ingrediente}`)}
                  />,
                  <DeleteOutlined style={{color: 'red'}} key="clouse" onClick={() => removeItem(ingrediente.cod_ingrediente)}/>
                ]}
              >
                <Card.Meta
                  title={ingrediente.nome}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </PageContent>
  );
}