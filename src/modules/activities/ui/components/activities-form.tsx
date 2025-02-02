'use client';

import { useState } from 'react';

import { EActivityRoute } from '../../constants';
import { ActivityModel } from '../../core/models/activity.model';
import useCreateActivity from '../hooks/form/use-create-activity';

import SaveHeaderForm from '@/components/forms/save-header-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import * as m from '@/paraglide/messages';

type SaveAction = 'save' | 'save-and-continue';

export function BusinessesForm() {
  const { methods, handleSubmit } = useCreateActivity();
  const [saveAction, setSaveAction] = useState<SaveAction>('save');

  function onSubmit(values: ActivityModel) {
    handleSubmit(values, saveAction);
  }

  return (
    <>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <SaveHeaderForm
            title={m.new_business()}
            backUrl={EActivityRoute.list}
            saveAndContinue={true}
            onSaveTypeChange={setSaveAction}
          />
          <FormField
            control={methods.control}
            name="activity_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>m.activities_header_activity_status</FormLabel>
                <FormControl>
                  <Input placeholder="CLIENTE S.A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="beneficiary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>m.activities_header_beneficiary</FormLabel>
                <FormControl>
                  <Input placeholder="8888888-8" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="business"
            render={({ field }) => (
              <FormItem>
                <FormLabel>m.activities_header_business</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="tutor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>m.activities_header_tutor</FormLabel>
                <FormControl>
                  <Input placeholder="021 236 1242" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>m.activities_header_notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="San Antonio 964" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormLabel>m.activities_header_start_date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}
