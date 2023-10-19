import React, { useState } from "react";
import { PlusOutlined, CloseOutlined, MinusCircleOutlined} from "@ant-design/icons";
import { Form, Input, InputNumber, Select, Upload, Button, Switch, Card, Space, Typography, Image } from 'antd';
import PageContent from '../../componentes/PageContent/PageContent';
import { MedidaService } from "../../services/Medida";
import { IngredienteService } from '../../services/Ingrediente';
import { CategoriaService } from '../../services/Categoria';
import { getSession } from "next-auth/react";
import { ReceitaService } from "../../services/Receita";
import { IngredienteReceitaService } from '../../services/IngredienteReceita'
import { useRouter } from "next/router";
import { InboxOutlined } from '@ant-design/icons';

const PAGE_NAME = 'Cadastro de Receitas'
const HEAD_NAME = 'Receitas'

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const CadastroReceita = ({ receitaData, userId, categoriaOptions, ingredientesOptions, medidasOptions}) => {
  const router = useRouter();
  const [form, setForm] = Form.useForm();
  const [categorias] = useState(categoriaOptions);
  const [medidas] = useState(medidasOptions);
  const [ingredientes] = useState(ingredientesOptions);
  const [dataReceita] = useState(receitaData)

  const propsForm = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    imagePreview: dataReceita?.foto,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        setImagePreview(imagePath= `${info.file.thumbUrl}`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
  
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const onFinish = async (values) => {
    const file = values?.dragger?.length > 0 && values?.dragger[0]?.thumbUrl || '';
    const imagePreview = `${file}`

    const payloadReceita = {
      cod_usuario: userId,
      cod_categoria: values.cod_categoria,
      foto: imagePreview,
      nome_receita: values.nome_receita,
      tempo_preparo: parseFloat(values.tempo_preparo),
      modo_preparo: values.modo_preparo,
      status_receita: 'ativo',
    };

    const payloadIngrediente = {
      cod_receita: dataReceita?.cod_receita || null,
      ingredientes: values?.items.filter((item) => !item?.cod_ingred_receita)
    }

    if (!dataReceita?.cod_receita) {
      const codReceita = await cadastroReceita(payloadReceita)

      if (codReceita?.length > 0) {
        payloadIngrediente.cod_receita = codReceita[0]
        const responseIngrediente = await cadastroIngredientes(payloadIngrediente)
      }
    } else {
      const alteracaoReceitaRes = await alteracaoReceita(payloadReceita, dataReceita.cod_receita)

      if (values?.items?.length > 0) {
        let novosIngrediente = []
        let oldIngredientes = []
        novosIngrediente = values?.items.filter((item) => !item?.cod_ingred_receita)
        oldIngredientes = values?.items.filter((item) => item?.cod_ingred_receita)

        if (oldIngredientes?.length > 0) {
          payloadIngrediente.ingredientes = oldIngredientes
          const response = await alteracaoIngredientes(payloadIngrediente)
        }
        if (novosIngrediente?.length > 0) {
          payloadIngrediente.ingredientes = novosIngrediente
          const cadastroMedida = await cadastroIngredientes(payloadIngrediente, dataReceita?.cod_receita)
        }
      }
    }

    router.push('/receitas')
  };

  const cadastroReceita = (payloadReceita) => {
    return ReceitaService.create(payloadReceita);
  }

  const cadastroIngredientes = (payloadIngrediente) => {
    return IngredienteReceitaService.create(payloadIngrediente);
  }

  const alteracaoReceita = (payloadReceita, idReceita) => {
    return ReceitaService.update(payloadReceita, idReceita);
  }

  const alteracaoIngredientes = (payloadIngrediente) => {
    const error = null
    payloadIngrediente.ingredientes?.map((item) => {
      const response = IngredienteReceitaService.update(item, item.cod_ingred_receita);
    })
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
          initialValue={dataReceita?.cod_usuario || userId}
        >
          <Input disabled />
        </Form.Item>
        {dataReceita?.cod_receita &&
          <Form.Item
            label="Codigo da receita"
            name="cod_receita"
            initialValue={dataReceita?.cod_receita}
          >
            <Input disabled />
          </Form.Item>
        }
        
        <Form.Item
          label="Nome da receita"
          name="nome_receita"
          initialValue={dataReceita?.nome_receita}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tempo preparo"
          name="tempo_preparo"
          initialValue={dataReceita?.tempo_preparo}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Categorias" name='cod_categoria' initialValue={dataReceita?.cod_categoria}>
          <Select>
            {categorias?.map((option) => {
              return (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.List name="items" layout="vertical" initialValue={dataReceita?.items}>
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
                      {ingredientes?.map((option) => {
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
                      {medidas?.map((option) => (
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

        <Form.Item label="Modo de preparo" initialValue={dataReceita?.modo_preparo} name='modo_preparo'>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label='ImagePreview'>
          <Image
            width={200}
            src={dataReceita?.foto}
          />
        </Form.Item>
        <Form.Item label="Foto Receita">
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger props={propsForm} name="files" listType="picture">
              <p className="ant-upload-drag-icon">
                <InboxOutlined /> 
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" style={{background: '#1677ff', color: 'white', width: '100%' }} type="primary" >Salvar</Button>
        </Form.Item>
      </Form>
    </PageContent>
  );
};

export default CadastroReceita;

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