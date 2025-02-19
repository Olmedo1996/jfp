'use client';

import { useState } from 'react';

import { EActivityRoute } from '../../constants';
import { ActivityModel } from '../../core/models/activity.model';
import useCreateActivity from '../hooks/form/use-create-activity';
import { ActivitiesForm } from './activities-form';

import SaveHeaderForm from '@/components/forms/save-header-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import * as m from '@/paraglide/messages';

type SaveAction = 'save' | 'save-and-continue';

export function ActivitiesNewForm() {
  const { methods, handleSubmit } = useCreateActivity();
  const [saveAction, setSaveAction] = useState<SaveAction>('save');

  function onSubmit(values: ActivityModel) {
    handleSubmit(values, saveAction);
  }

  return (
    <>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <SaveHeaderForm
                title={m.new_activity()}
                backUrl={EActivityRoute.list}
                saveAndContinue={true}
                onSaveTypeChange={setSaveAction}
              />
            </CardHeader>
            <CardContent>
              <ActivitiesForm />
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
}
