import { useEffect, useState } from "react"
import PageContent from "../../componentes/PageContent/PageContent"
import { ReceitaService } from "../../services/Receita"
import { Row, Col, Button, Card, Avatar } from "antd";
import {
  EditOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';

const user = 'admin'
const PAGE_NAME = 'Listagem de Receitas'
const HEAD_NAME = 'Receitas'

export default function Receitas() {
  const { data: session } = useSession();
  const isAuthenticated = session ? true : false

  const router = useRouter();
  const [listaReceitas, setListaReceitas] = useState([])

  useEffect(() => {
    async function getReceitas() {
      const receitas = await ReceitaService.listAll()
      setListaReceitas(receitas)
    }

    getReceitas()
  })

  return (
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME} >
      {isAuthenticated &&
        <Button
          style={{ position: 'fixed', right: '40px' }}
          onClick={() => router.push('/receitas/cadastro')}
        >
          Cadastrar Nova Receita
        </Button>
      }
      <Row gutter={16} style={{ marginTop: '48px' }}>
        {listaReceitas.map((receita) => {
          return (
            <Col key={receita.cod_receita} xs={12} sm={8} md={6} lg={4}>
              <Card
                xs={12} sm={8} md={6} lg={4}
                style={{ marginBottom: '20px', width: '100%', height: '95%' }}
                actions={isAuthenticated && user.includes('admin') && [
                  <EditOutlined
                    key="edit"
                    onClick={() => router.push(`/receitas/${receita.cod_receita}`)}
                  />,
                ]}
              >
                <Card.Meta
                  title={receita.nome_receita}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </PageContent>
  )
}

