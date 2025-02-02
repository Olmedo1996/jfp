import React from 'react';
import { Plus } from 'lucide-react';

import DocumentForm from './document-form';

import DrawerDialog from '@/components/responsive-dialog/drawer-dialog';
import { BeneficiaryResult } from '@/modules/beneficiaries/core/interfaces/beneficiaries-service.interface';

const NewDocument = ({ beneficiary }: { beneficiary: BeneficiaryResult }) => {
  return (
    <DrawerDialog
      dialogTitle="Nuevo documento"
      classNameDialogContent="sm:max-w-screen-md"
      dialogButtonLabel={
        <>
          <Plus className="mr-2 size-4" />
          Nuevo
        </>
      }
    >
      <DocumentForm beneficiary={beneficiary} />
    </DrawerDialog>
  );
};

export default NewDocument;
