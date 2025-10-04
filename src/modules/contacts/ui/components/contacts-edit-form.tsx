'use client';

import { useState } from 'react';

import { EContactRoute } from '../../constants';
import { ContactResult } from '../../core/interfaces/contact-service.interface';
import { ContactModel } from '../../core/models/contact.model';
import useUpdateContact from '../hooks/form/use-update-contact';
import { ContactsForm } from './contacts-form';

import SaveHeaderForm from '@/components/forms/save-header-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form } from '@/components/ui/form';

type SaveAction = 'save' | 'save-and-continue';

interface UseUpdateContactProps {
  contactId: number;
  initialValues: ContactResult;
}

const UpdateContactForm = ({
  contactId,
  initialValues,
}: UseUpdateContactProps) => {
  const { methods, handleSubmit } = useUpdateContact({
    contactId,
    initialValues,
  });
  const [saveAction, setSaveAction] = useState<SaveAction>('save');

  function onSubmit(values: ContactModel) {
    handleSubmit(values, saveAction);
  }

  return (
    <>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <SaveHeaderForm
                title={'Editar Contacto'}
                backUrl={EContactRoute.list}
                saveAndContinue={true}
                onSaveTypeChange={setSaveAction}
              />
            </CardHeader>
            <CardContent>
              <ContactsForm />
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default UpdateContactForm;
