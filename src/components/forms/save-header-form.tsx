import React from 'react';

import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n';
import * as m from '@/paraglide/messages';

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
          <Button asChild variant={'secondary'} disabled={loading}>
            <Link href={backUrl}>{cancelButtonLabel || m.cancel()}</Link>
          </Button>
          {!hideSaveButton && (
            <Button
              type="submit"
              disabled={loading}
              onClick={() => onSaveTypeChange?.('save')}
            >
              {saveButtonLabel || m.save()}
            </Button>
          )}
          {saveAndContinue && (
            <Button
              type="submit"
              disabled={loading}
              onClick={() => onSaveTypeChange?.('save-and-continue')}
            >
              {m.save_and_continue()}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default SaveHeaderForm;
