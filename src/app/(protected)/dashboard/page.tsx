'use client';

import { useEffect } from 'react';

import { LoginResponse } from '@/modules/auth/core/interface/login.interface';
import axios from '@/modules/auth/services/api';

const Page = () => {
  const getTutors = async () => {
    const response = await axios.get<LoginResponse>('beneficiaries/');
    const data = await response.data;
    return data;
  };

  useEffect(() => {
    getTutors();
  }, []);

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <br />
        <pre>
          <code>Dashboard</code>
        </pre>
      </div>
    </>
  );
};

export default Page;
