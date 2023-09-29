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

const PAGE_NAME = 'Listagem de Categorias'
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

const CadastroCategoria = (props) => {
  const { categoria } = props;
  console.log('sou props', categoria);
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState()
  const [categoriaFrom, setCategoriaFrom] = useState(categoria || {})

  console.log('Sou inicio', form);

  const propsForm = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    imagePreview: {imagePreview},
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
    const file = values?.dragger[0].thumbUrl;
    setImagePreview(`${file}`)
    let payload = {
      nome: values?.nome,
      foto_categoria: `${file}`,
    };

    const cadastroCategoria = await CategoriaService.create(payload);
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
          initialValue={categoriaFrom.nome || ''}
          tooltip="Como você quer que os outros te chamem?"
          rules={[
            {
              required: true,
              message: 'Por favor, insira seu nome!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='ImagePreview'>
          <Image
            width={200}
            src={imagePreview}
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
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Space>
            <Button htmlType="submit" style={{background: '#1677ff', color: 'white'}}>
              Submit
            </Button>
            <Button type='' htmlType="reset">reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </PageContent>
  );
};
export default CadastroCategoria;
