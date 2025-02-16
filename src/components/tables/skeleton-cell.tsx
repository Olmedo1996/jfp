import React, { useEffect, useState } from 'react';

const SkeletonCell = () => {
  const [width, setWidth] = useState('50%');

  useEffect(() => {
    setWidth(`${Math.floor(Math.random() * 50 + 50)}%`);
  }, []);

  return (
    <div
      className="bg-sidebar-accent h-4 animate-pulse rounded"
      style={{ width }}
    />
  );
};

export default SkeletonCell;
