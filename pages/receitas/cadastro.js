import React, { useState } from "react";
import { PlusOutlined, CloseOutlined  } from "@ant-design/icons";
import { Form, Input, InputNumber, Select, Upload, Button, Switch, Card, Space, Typography  } from 'antd';
// import TextArea from 'antd/lib/input/TextArea';
import { MedidaService } from "../../services/Medida";
import { IngredienteService } from '../../services/Ingrediente';
import { CategoriaService } from '../../services/Categoria';
import { getSession } from "next-auth/react";

const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const RecipeForm = ({ userId, categoriaOptions, ingredientesOptions, medidasOptions }) => {
  const [form] = Form.useForm();
  console.log('Sou form', form.getFieldsValue());
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [listaIngredientes, setListaIngredientes] = useState([])
  console.log('Sou listaIngredientes', listaIngredientes);

  const [categorias] = useState(categoriaOptions);

  const [medidas] = useState(medidasOptions);

  const [ingredientes] = useState(ingredientesOptions);

  const dataReceita = {
    foto: "",
    cod_usuario: "1",
    cod_receita: "1",
    nome_receita: "Receita test",
    tempo_preparo: "12",
    cod_categoria: "1",
    modo_preparo: "colocar no fogo",
    status: "ativo",
    dataIngredientes: [
      {
        cod_ingred_receita: "123",
        cod_receita: "1",
        quantidade: "1",
        cod_ingrediente: "1",
        cod_un_medida: "1"
      }
    ]
  };

  const onFinish = (values) => {
    // Aqui, 'values' conterá todos os dados do formulário quando o formulário for submetido.
    console.log('Dados do formulário:', values);
    // Você pode enviar esses dados para a API ou fazer o que desejar com eles.
  };

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        // disabled={componentDisabled}
        style={{ maxWidth: 600 }}
        form={form}
        initialValues={{
          items: [{}],
        }}
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
        <Form.Item label="Categorias">
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
        <Form.Item label="Ingredientes" name='dataIngredientes'>
          <Select mode="multiple" onChange={(values, value) => { setListaIngredientes(value.value)}}>
            {ingredientes.map((option) => {
              return (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.List name="items">
        {(fields, { add, remove }) => (
          <div
            style={{
              display: 'flex',
              rowGap: 16,
              flexDirection: 'column',
            }}
          >
            {fields.map((field) => (
              <Card
                size="small"
                title={`Ingredientes${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Form.Item label="Name" name={[field.name, 'name']}>
                  <Input />
                </Form.Item>

                {listaIngredientes.map((ingredient, index) => (
                  <Form.Item
                    label={`Selected Ingredient ${index + 1}`}
                    name={[field.name, 'listaIngredientes', index]}
                  >
                    <Input value={ingredient} disabled />
                  </Form.Item>
                ))}

                {/* Nest Form.List */}
                <Form.Item label="List">
                  <Form.List name={[field.name, 'list']}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, 'first']}>
                              <Input placeholder="first" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, 'second']}>
                              <Input placeholder="second" />
                            </Form.Item>
                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button type="dashed" onClick={() => subOpt.add()} block>
                          + Add Sub Item
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Item
            </Button>
          </div>
        )}
      </Form.List>
      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>

        <Form.Item label="Modo de preparo">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Status" valuePropName="checked">
          <Switch
            defaultChecked={dataReceita.status === "ativo" ? true : false}
          />
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
          <Button type="primary" onClick={() => form.submit()}>Salvar</Button>
        </Form.Item>
      </Form>
    </>
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