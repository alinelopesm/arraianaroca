import { useEffect, useState } from "react"
import PageContent from "../../componentes/PageContent/PageContent"
import { MedidaService } from "../../services/Medida"
import { Row, Col, Button, Card, Avatar } from "antd";
import {
  EditOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

const user = 'admin'
const PAGE_NAME = 'Listagem de Unidade de Medidas:'
const HEAD_NAME = 'Unidade de Medidas'

export default function Medidas() {
  const router = useRouter();
  const [listaMedidas, setListaMedidas] = useState([])

  useEffect(() => {
    async function getMedidas() {
      const medidas = await MedidaService.listAll()
      setListaMedidas(medidas)
    }

    getMedidas()
  })

  return (
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME}>
      <Button
        style={{ position: 'fixed', right: '40px' }}
        onClick={() => router.push('/medidas/cadastro')}
      >
        Cadastrar Nova Medida
      </Button>
      <Row gutter={16} style={{ marginTop: '48px' }}>
        {listaMedidas.map((medida) => {
          return (
            <Col key={medida.cod_un_medida} xs={12} sm={8} md={6} lg={4}>
              <Card
                xs={12} sm={8} md={6} lg={4}
                style={{ marginBottom: '20px', width: '100%', height: '95%' }}
                actions={user.includes('admin') && [
                  <EditOutlined
                    key="edit"
                    onClick={() => router.push(`/medidas/${medida.cod_un_medida}`)}
                  />,
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

