'use client';

import { useFormContext } from 'react-hook-form';

import { BusinessModel } from '../../core/models/business.model';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function BusinessesForm() {
  const { control } = useFormContext<BusinessModel>();
  return (
    <>
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
    </>
  );
}
