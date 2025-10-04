'use client';

import { useState } from 'react';

import { EContactRoute } from '../../constants';
import { ContactModel } from '../../core/models/contact.model';
import useCreateContact from '../hooks/form/use-create-contact';
import { ContactsForm } from './contacts-form';

import SaveHeaderForm from '@/components/forms/save-header-form';
import { Form } from '@/components/ui/form';

type SaveAction = 'save' | 'save-and-continue';

export function ContactsCreateForm() {
  const { methods, handleSubmit } = useCreateContact();
  const [saveAction, setSaveAction] = useState<SaveAction>('save');

  function onSubmit(values: ContactModel) {
    handleSubmit(values, saveAction);
  }

  return (
    <>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <SaveHeaderForm
            title={'Nuevo Contacto'}
            backUrl={EContactRoute.list}
            saveAndContinue={true}
            onSaveTypeChange={setSaveAction}
          />
          <ContactsForm />
        </form>
      </Form>
    </>
  );
}
