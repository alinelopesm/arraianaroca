import React, { useState } from "react";
import { PlusOutlined, CloseOutlined, MinusCircleOutlined} from "@ant-design/icons";
import { Form, Input, InputNumber, Select, Upload, Button, Switch, Card, Space, Typography  } from 'antd';
import PageContent from '../../componentes/PageContent/PageContent';
import { MedidaService } from "../../services/Medida";
import { IngredienteService } from '../../services/Ingrediente';
import { CategoriaService } from '../../services/Categoria';
import { getSession } from "next-auth/react";
import { ReceitaService } from "../../services/Receita";
import { IngredienteReceitaService } from '../../services/IngredienteReceita'

const PAGE_NAME = 'Cadastro de Receitas'
const HEAD_NAME = 'Receitas'

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const RecipeForm = ({ userId, categoriaOptions, ingredientesOptions, medidasOptions }) => {
  const [form, setForm] = Form.useForm();
  const [categorias] = useState(categoriaOptions);
  const [medidas] = useState(medidasOptions);
  const [ingredientes] = useState(ingredientesOptions);
  const [dataReceita] = useState({
    foto: "",
    cod_usuario: userId,
    cod_receita: null,
    nome_receita: "Receita test",
    tempo_preparo: null,
    cod_categoria: null,
    modo_preparo: "",
    status_receita: true,
    items: []
  })

  const onFinish = (values) => {
    console.log('Dados do formulário:', values);
    cadastroReceita(values)
  };

  const cadastroReceita = async (dataReceita) => {
    const payloadReceita= {
      cod_usuario: userId,
      cod_categoria: dataReceita.cod_categoria,
      foto: dataReceita.foto || '',
      nome_receita: dataReceita.nome_receita,
      tempo_preparo: parseFloat(dataReceita.tempo_preparo),
      modo_preparo: dataReceita.modo_preparo,
      status_receita: 'ativo',
    };

    const codReceita = await ReceitaService.create(payloadReceita);
    if (codReceita?.length > 0) cadastroIngredientes(dataReceita, codReceita[0])
  }

  const cadastroIngredientes = async (dataIngrediente, codReceita) => {
    const payloadIngrediente = {
      cod_receita: codReceita,
      ingredientes: dataIngrediente.items
    }
    
    const cadastroMedida = await IngredienteReceitaService.create(payloadIngrediente);
  }

  return (
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME}>
      <Form
        labelCol={{ span: 12 }}
        wrapperCol={{
          span: 18,
        }}
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Codigo Usuário"
          name="cod_usuario"
          initialValue={dataReceita.cod_usuario}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Codigo da receita"
          name="cod_receita"
          initialValue={dataReceita.cod_receita}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Nome da receita"
          name="nome_receita"
          initialValue={dataReceita.nome_receita}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tempo preparo"
          name="tempo_preparo"
          initialValue={dataReceita.tempo_preparo}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Categorias" name='cod_categoria' initialValue={dataReceita.cod_categoria}>
          <Select>
            {categorias.map((option) => {
              return (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.List name="items" layout="vertical" initialValue={dataReceita.items}>
          {(fields, { add, remove }) => (
            <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
              {fields.map(({ name, key }) => (
                <Space key={key} >
                  <Form.Item label="Ingredientes" name={[name, 'cod_ingrediente']} key={[key, 'cod_ingrediente']}>
                    <Select>
                      {ingredientes.map((option) => {
                        return (
                          <Select.Option key={option.value} value={option.value} children={option.label}>
                            {option.label}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={[name, 'quantidade']}
                    key={[key, 'quantidade']}
                    label='Quantidade'
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={[name, 'cod_un_medida']}
                    key={[key, 'cod_un_medida']}
                    label='Medidas'
                  >
                    <Select>
                      {medidas.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                          {option.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Adicionar Ingrediente
                </Button>
              </Form.Item>
            </div>
            
          )}
        </Form.List>

        <Form.Item label="Modo de preparo" initialValue={dataReceita.modo_preparo} name='modo_preparo'>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Foto receita"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" style={{background: '#1677ff', color: 'white', width: '100%' }} type="primary" onClick={() => form.submit()}>Salvar</Button>
        </Form.Item>
        {/* <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item> */}
      </Form>
    </PageContent>
  );
};

export default RecipeForm;

// Restante do código (getServerSideProps) permanece o mesmo


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

  const userId = session?.token?.sub
  const listaCategorias = await CategoriaService.listAll();
  const listaIngredientes = await IngredienteService.listAll();
  const listaMedidas = await MedidaService.listAll();

  const categoriaOptions = listaCategorias.map((item) => {
    return {value: item.cod_categoria, label: item.nome}
  })

  const ingredientesOptions = listaIngredientes.map((item) => {
    return {value: item.cod_ingrediente, label: item.nome}
  })

  const medidasOptions = listaMedidas .map((item) => {
    return {value: item.cod_un_medida, label: item.nome}
  })

  return {
    props: { 
      userId,
      categoriaOptions,
      ingredientesOptions,
      medidasOptions,
    },
  };
}