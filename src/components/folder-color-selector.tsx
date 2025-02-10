'use client';

import { useState } from 'react';

import { GradientPicker } from './gradient-picker';

export const FolderColorSelector = () => {
  const [background, setBackground] = useState('#09203f');
  return (
    <div>
      <div>
        <div className="grid w-48 grid-cols-1 gap-4">
          <GradientPicker
            background={background}
            setBackground={setBackground}
          />
        </div>
      </div>
    </div>
  );
};
