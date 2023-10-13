import React, { useState, useEffect } from 'react';
import PageContent from '../../componentes/PageContent/PageContent';
import { InboxOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Space,
  Upload,
  Input,
  message,
  Image
} from 'antd';
import { CategoriaService } from "../../services/Categoria"
import { useRouter } from "next/router";

const PAGE_NAME = 'Cadastro de Categorias'
const HEAD_NAME = 'Categorias'

const method = 'editar'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const CadastroCategoria = ({categoriaData}) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [categoriaForm, setCategoriaForm] = useState(categoriaData)

  const propsForm = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    imagePreview: categoriaForm?.imagePreview,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        console.log('como estou', info);
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

    let payload = {
      nome: values?.nome,
      foto_categoria: imagePreview,
    };

    if(categoriaData?.codCategoria) {
      const id = categoriaData?.codCategoria
      const edicaoCategoria = await CategoriaService.update(payload, id);
      console.log('fui alterar', edicaoCategoria);

      if (edicaoCategoria) router.push('/categorias')
      return
    }
    console.log('indo', payload);

    const cadastroCategoria = await CategoriaService.create(payload);
    router.push('/categorias')
  };
  
  return (
    <PageContent headName={HEAD_NAME} pageName={PAGE_NAME}>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="nome"
          label="Nome"
          initialValue={categoriaForm?.nome || ''}
          tooltip="Como você quer que a categoria seja identificada?"
          rules={[
            {
              required: true,
              message: 'Por favor, insira um nome para a categoria!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='ImagePreview'>
          <Image
            width={200}
            src={categoriaForm?.imagePreview}
          />
        </Form.Item>

        <Form.Item label="Dragger">
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

        <Form.Item
          style={{
            display: 'flex',
            flexDirection: 'column', // Para empilhar os botões verticalmente
            alignItems: 'flex-end', // Para alinhar os botões à direita
          }}
        >
          <Space style={{ width: '100%' }}>
            <Button style={{ width: '100%' }} type='' htmlType="reset">Limpar</Button>
            <Button htmlType="submit" style={{background: '#1677ff', color: 'white', width: '100%' }}>
              {categoriaForm?.codCategoria ? 'Alterar' : 'Salvar'}
            </Button>
            
          </Space>
        </Form.Item>
      </Form>
    </PageContent>
  );
};
export default CadastroCategoria;
