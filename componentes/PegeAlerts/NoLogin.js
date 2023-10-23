// pages/admin-only.js

import React from 'react';
import { Result, Button } from 'antd'; 

const LoginOnly = () => {
  
    return (
        <Result
        status="403"
        title="Você não esta logado"
        subTitle="Esta página é permitida apenas para usuários logados"
        extra={
          <>
          <Button type="primary" style={{background: '#1677ff', color: 'white'}} onClick={() => router.push('/api/auth/signin')}>
            Fazer Login
          </Button>
          <Button type="primary" style={{background: '#1677ff', color: 'white'}} onClick={() => router.push('/signup')}>
            Cadastrar
          </Button>
          </>
        }
      />
    );
};

export default LoginOnly;
