'use client';
import { useState } from 'react';

import { EBusinessRoute } from '../../constants';
import { BusinessResult } from '../../core/interfaces/business-service.interface';
import { BusinessModel } from '../../core/models/business.model';
import useUpdateBusiness from '../hooks/form/use-update-business';
import { BusinessesForm } from './businesses-form';

import SaveHeaderForm from '@/components/forms/save-header-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import * as m from '@/paraglide/messages';
type SaveAction = 'save' | 'save-and-continue';

interface UseUpdateBusinessProps {
  businessId: number;
  initialValues: BusinessResult;
}

const UpdateBusinessForm = ({
  businessId,
  initialValues,
}: UseUpdateBusinessProps) => {
  const { methods, handleSubmit } = useUpdateBusiness({
    businessId,
    initialValues,
  });
  const [saveAction, setSaveAction] = useState<SaveAction>('save');

  function onSubmit(values: BusinessModel) {
    handleSubmit(values, saveAction);
  }

  return (
    <>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <SaveHeaderForm
                title={m.new_business()}
                backUrl={EBusinessRoute.list}
                saveAndContinue={true}
                onSaveTypeChange={setSaveAction}
              />
            </CardHeader>
            <CardContent>
              <BusinessesForm />
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default UpdateBusinessForm;
