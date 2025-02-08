'use client';

import { useState } from 'react';

import { EContactRoute } from '../../constants';
import { ContactModel } from '../../core/models/contact.model';
import useCreateBusiness from '../hooks/form/use-create-contact';

import SaveHeaderForm from '@/components/forms/save-header-form';
import { AsyncInfiniteSelect } from '@/components/selector/sigle-async-select';
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
import * as m from '@/paraglide/messages';

type SaveAction = 'save' | 'save-and-continue';

export function ContactsForm() {
  const { methods, handleSubmit } = useCreateBusiness();
  const [saveAction, setSaveAction] = useState<SaveAction>('save');
  const { watch } = methods;

  function onSubmit(values: ContactModel) {
    handleSubmit(values, saveAction);
  }

  return (
    <>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <SaveHeaderForm
            title={m.new_contact()}
            backUrl={EContactRoute.list}
            saveAndContinue={true}
            onSaveTypeChange={setSaveAction}
          />
          <FormField
            control={methods.control}
            name="business"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa</FormLabel>
                <AsyncInfiniteSelect
                  apiEndpoint="businesses/selector/"
                  placeholder="Selecciona un tipo de documento"
                  noOptionsMessage="No hay tipos de documentos disponibles"
                  value={field.value}
                  onChange={field.onChange}
                  pageSize={20}
                  ordering="created_at"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sucursal</FormLabel>
                <AsyncInfiniteSelect
                  apiEndpoint={`branches/selector/?business=${watch('business')?.value}`}
                  placeholder="Selecciona un tipo de documento"
                  noOptionsMessage="No hay tipos de documentos disponibles"
                  value={field.value}
                  onChange={field.onChange}
                  pageSize={20}
                  ordering="created_at"
                  isDisabled={!watch('business')?.value}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="JUAN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="PEREZ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="job_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cargo</FormLabel>
                <FormControl>
                  <Input placeholder="Gerente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="jperez@gmail.com"
                    {...field}
                  />
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
            name="is_primary_contact"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <Label htmlFor="airplane-mode">Contacto Principal</Label>
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
