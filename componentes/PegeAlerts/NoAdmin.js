// pages/admin-only.js

import React from 'react';
import { Result, Button } from 'antd'; 
import { useRouter } from 'next/router';

const AdminOnly = () => {
    const router = useRouter();
  
    return (
        <Result
        status="403"
        title="Você não é um administrador"
        subTitle="Esta página é permitida apenas para usuários administradores."
        extra={
          <Button type="primary" style={{background: '#1677ff', color: 'white'}} onClick={() => router.push('/')}>
            Voltar para o Dashboard
          </Button>
        }
      />
    );
};

export default AdminOnly;
