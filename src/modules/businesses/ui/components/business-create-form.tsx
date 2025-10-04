'use client';
import React, { useState } from 'react';

import { EBusinessRoute } from '../../constants';
import { BusinessModel } from '../../core/models/business.model';
import useCreateBusiness from '../hooks/form/use-create-business';
import { BusinessesForm } from './businesses-form';

import SaveHeaderForm from '@/components/forms/save-header-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form } from '@/components/ui/form';

type SaveAction = 'save' | 'save-and-continue';

const BusinessCreateForm = () => {
  const { methods, handleSubmit } = useCreateBusiness();
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
                title={'Crear Comercio'}
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

export default BusinessCreateForm;
