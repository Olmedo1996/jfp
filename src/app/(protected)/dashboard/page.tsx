'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';

const Page = () => {
  const [tutors, setTutors] = useState([]);

  const getTutors = async () => {
    const response = await api.get('beneficiaries/');
    const data = await response.data;
    setTutors(data);
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
          <p>Bienvenido al dashboard</p>
          <pre>{JSON.stringify(tutors, null, 2)}</pre>
        </pre>
      </div>
    </>
  );
};

export default Page;
