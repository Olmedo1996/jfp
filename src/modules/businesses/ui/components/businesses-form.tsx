'use client';

import { useState } from 'react';

import { EBusinessRoute } from '../../constants';
import { BusinessModel } from '../../core/models/business.model';
import useCreateBusiness from '../hooks/form/use-create-business';

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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import * as m from '@/paraglide/messages';

type SaveAction = 'save' | 'save-and-continue';

export function BusinessesForm() {
  const { methods, handleSubmit } = useCreateBusiness();
  const [saveAction, setSaveAction] = useState<SaveAction>('save');

  function onSubmit(values: BusinessModel) {
    handleSubmit(values, saveAction);
  }

  return (
    <>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <SaveHeaderForm
            title={m.new_business()}
            backUrl={EBusinessRoute.list}
            saveAndContinue={true}
            onSaveTypeChange={setSaveAction}
          />
          <FormField
            control={methods.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Razón Social</FormLabel>
                <FormControl>
                  <Input placeholder="CLIENTE S.A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="ruc_ci"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RUC/CI</FormLabel>
                <FormControl>
                  <Input placeholder="8888888-8" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="021 236 1242" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Textarea placeholder="San Antonio 964" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="is_active"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <Label htmlFor="airplane-mode">Activo</Label>
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
