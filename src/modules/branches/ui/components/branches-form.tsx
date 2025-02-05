'use client';

import { useState } from 'react';

import { EBranchRoute } from '../../constants';
import { BranchModel } from '../../core/models/branch.model';
import useCreateBusiness from '../hooks/form/use-create-branch';

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
import { Textarea } from '@/components/ui/textarea';
import * as m from '@/paraglide/messages';

type SaveAction = 'save' | 'save-and-continue';

export function BranchesForm() {
  const { methods, handleSubmit } = useCreateBusiness();
  const [saveAction, setSaveAction] = useState<SaveAction>('save');

  function onSubmit(values: BranchModel) {
    handleSubmit(values, saveAction);
  }

  return (
    <>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <SaveHeaderForm
            title={m.new_branch()}
            backUrl={EBranchRoute.list}
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sucursal</FormLabel>
                <FormControl>
                  <Input placeholder="MUNDI MARK" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código Sucursal</FormLabel>
                <FormControl>
                  <Input placeholder="ALBR003" {...field} />
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
