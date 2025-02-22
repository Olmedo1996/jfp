import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

export const dynamic = 'force-dynamic';
const Page = (props: Props) => {
  return (
    <div>
      <h1>{props.params.id}</h1>
    </div>
  );
};

export default Page;
