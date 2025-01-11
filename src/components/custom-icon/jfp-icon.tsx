import React from 'react';

type Props = {
  className?: string;
};

const JfpIcon = (props: Props) => {
  return (
    <>
      <svg viewBox="0 0 250 400" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect
          x="25"
          y="10"
          rx="30"
          ry="30"
          width="240"
          height="60"
          fill="#004fc3"
        />
        <rect
          x="25"
          y="90"
          rx="30"
          ry="30"
          width="190"
          height="60"
          fill="#ff9b32"
        />
        <rect
          x="25"
          y="170"
          rx="30"
          ry="30"
          width="150"
          height="60"
          fill="#ffe04c"
        />
        <rect
          x="25"
          y="250"
          rx="30"
          ry="30"
          width="120"
          height="60"
          fill="#5ac144"
        />
      </svg>
    </>
  );
};

export default JfpIcon;
