'use client';

import { useState } from 'react';

import { EBranchRoute } from '../../constants';
import { BranchResult } from '../../core/interfaces/branch-service.interface';
import { BranchModel } from '../../core/models/branch.model';
import useUpdateBranch from '../hooks/form/use-update-branch';
import { BranchesForm } from './branches-form';

import SaveHeaderForm from '@/components/forms/save-header-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import * as m from '@/paraglide/messages';

type SaveAction = 'save' | 'save-and-continue';

interface UseUpdateBranchProps {
  branchId: number;
  initialValues: BranchResult;
}
const UpdateBranchForm = ({
  branchId,
  initialValues,
}: UseUpdateBranchProps) => {
  const { methods, handleSubmit } = useUpdateBranch({
    branchId,
    initialValues,
  });
  const [saveAction, setSaveAction] = useState<SaveAction>('save');

  function onSubmit(values: BranchModel) {
    handleSubmit(values, saveAction);
  }

  return (
    <>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <SaveHeaderForm
                title={m.edit_branch()}
                backUrl={EBranchRoute.list}
                saveAndContinue={true}
                onSaveTypeChange={setSaveAction}
              />
            </CardHeader>
            <CardContent>
              <BranchesForm />
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default UpdateBranchForm;
