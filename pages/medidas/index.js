import { useEffect, useState } from "react"
import PageContent from "../../componentes/PageContent/PageContent"
import { MedidaService } from "../../services/Medida"
import { Row, Col, Button, Card, Avatar } from "antd";
import {
  EditOutlined, DeleteOutlined
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';

const user = 'admin'
const PAGE_NAME = 'Listagem de Unidade de Medidas:'
const HEAD_NAME = 'Unidade de Medidas'
/* Pegar o tipo do usuario na variavel de ambiente */
const TYPE_USER = process.env.NEXT_PUBLIC_TYPE_USER ;

export default function Medidas() {
  const { data: session } = useSession();
  const isAuthenticated = session ? true : false

  const router = useRouter();
  const [listaMedidas, setListaMedidas] = useState([])

  async function getMedidas() {
    const medidas = await MedidaService.listAll()
    setListaMedidas(medidas)
  }

  useEffect(() => {
    getMedidas()
  })

  async function removeItem(id) {
    const response = await MedidaService.remove(id);
    getMedidas()
  }

  return (
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME} >
      <Row gutter={16} justify='end'>
        {isAuthenticated &&
          <Button
          style={{ background: '#1677ff', color: 'white', zIndex: 3 }}
            onClick={() => router.push('/medidas/cadastro')}
          >
            Cadastrar Nova Medida
          </Button>
        }
      </Row>
      <Row gutter={16} style={{ marginTop: '48px' }}>
        {listaMedidas.map((medida) => {
          return (
            <Col key={medida.cod_un_medida} xs={12} sm={8} md={6} lg={4}>
              <Card
                xs={12} sm={8} md={6} lg={4}
                style={{ marginBottom: '20px', width: '100%', height: '95%' }}
                actions={isAuthenticated && user.includes('admin') && [
                  <EditOutlined
                    key="edit"
                    onClick={() => router.push(`/medidas/${medida.cod_un_medida}`)}
                  />,
                  <DeleteOutlined style={{color: 'red'}} key="clouse" onClick={() => removeItem(medida.cod_un_medida)}/>
                ]}
              >
                <Card.Meta
                  title={medida.nome}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </PageContent>
  )
}

