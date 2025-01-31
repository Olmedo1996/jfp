'use client';

import { FC } from 'react';

interface FolderIconProps {
  color?: string;
  size?: number;
  isOpen?: boolean;
}

export const FolderIcon: FC<FolderIconProps> = ({
  color = '#4F46E5',
  size = 64,
  isOpen = false,
}) => {
  const folderColor = color;
  const paperColor = '#ffffff';
  const secondPaper = '#ededed';
  const thirdPaper = '#c9c9c9';

  return (
    <div
      className="transition-all duration-200 ease-in"
      style={{
        width: size,
        height: size * 0.8,
      }}
    >
      {/* Parte trasera del folder */}
      <div
        className="relative size-full"
        style={{
          backgroundColor: `${folderColor}CC`, // Añade transparencia
          borderRadius: '0px 5px 5px 5px',
        }}
      >
        {/* Parte superior izquierda */}
        <div
          className="absolute bottom-full left-0"
          style={{
            width: size * 0.3,
            height: size * 0.1,
            backgroundColor: `${folderColor}CC`,
            borderRadius: '5px 5px 0 0',
          }}
        />

        {/* Papeles */}
        <div
          className="absolute bottom-[10%] left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out"
          style={{
            width: '70%',
            height: '80%',
            backgroundColor: `${thirdPaper}`,
            borderRadius: '5px',
            transform: isOpen
              ? 'translate(-50%, -10%)'
              : 'translate(-50%, 10%)',
          }}
        />
        <div
          className="absolute bottom-[10%] left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out"
          style={{
            width: '80%',
            height: '70%',
            backgroundColor: `${secondPaper}`,
            borderRadius: '5px',
            transform: isOpen
              ? 'translate(-50%, -20%)'
              : 'translate(-50%, 10%)',
          }}
        />
        <div
          className="absolute bottom-[10%] left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out"
          style={{
            width: '90%',
            height: '60%',
            backgroundColor: paperColor,
            borderRadius: '5px',
            transform: isOpen
              ? 'translate(-50%, -30%)'
              : 'translate(-50%, 10%)',
          }}
        />

        {/* Parte frontal del folder */}
        <div
          className="absolute size-full origin-bottom transition-all duration-300 ease-in-out"
          style={{
            backgroundColor: folderColor,
            borderRadius: '5px',
            transform: isOpen ? 'rotateX(-45deg)' : 'rotateX(0deg)',
          }}
        />
        <div
          className="absolute size-full origin-bottom transition-all duration-300 ease-in-out"
          style={{
            backgroundColor: folderColor,
            borderRadius: '5px',
            transform: isOpen ? 'rotateX(45deg)' : 'rotateX(0deg)',
          }}
        />
      </div>
    </div>
  );
};
