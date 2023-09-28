import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Space,
  Upload,
  Input,
  message
} from 'antd';
import { CategoriaService } from "../../services/Categoria"

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

const props = {
  name: 'file',
  multiple: false,
  accept: 'image/*',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const cadastroCategoria = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const file = values?.dragger[0].thumbUrl;
    let categoria = {
      nome: values?.nome,
      filePath: `${file}`,
    };

    const cadastroCategoria = await CategoriaService.create(categoria);
  };
  
  return (
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
      <Form.Item label="Dragger">
        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
          <Upload.Dragger {...props} name="files" listType="picture">
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="reset">reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default cadastroCategoria;