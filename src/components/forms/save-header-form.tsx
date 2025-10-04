'use client';

import React from 'react';

import { CustomLink } from '../custom-link/custom-link';

import { Button } from '@/components/ui/button';

type SaveAction = 'save' | 'save-and-continue';

type SaveHeaderFormProps = {
  title: string;
  description?: string;
  saveButtonLabel?: string;
  cancelButtonLabel?: string;
  saveAndContinue?: boolean;
  backUrl?: string;
  loading?: boolean;
  hideSaveButton?: boolean;
  onSaveTypeChange?: (action: SaveAction) => void;
};

const SaveHeaderForm = ({
  title,
  description,
  saveButtonLabel,
  cancelButtonLabel,
  saveAndContinue,
  backUrl = '/',
  loading = false,
  hideSaveButton = false,
  onSaveTypeChange,
}: SaveHeaderFormProps) => {
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <div className="invisible flex flex-col md:visible">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="flex gap-2">
          <CustomLink href={backUrl} goBack className="w-full md:w-auto">
            <Button variant={'secondary'} disabled={loading}>
              {cancelButtonLabel || 'Cancelar'}
            </Button>
          </CustomLink>
          {!hideSaveButton && (
            <Button
              type="submit"
              disabled={loading}
              onClick={() => onSaveTypeChange?.('save')}
            >
              {saveButtonLabel || 'Guardar'}
            </Button>
          )}
          {saveAndContinue && (
            <Button
              type="submit"
              disabled={loading}
              onClick={() => onSaveTypeChange?.('save-and-continue')}
            >
              {'Guardar y Continuar'}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default SaveHeaderForm;
