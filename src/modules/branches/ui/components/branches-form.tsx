'use client';

import { useFormContext } from 'react-hook-form';

import { BranchModel } from '../../core/models/branch.model';

import { AsyncInfiniteSelect } from '@/components/selector/sigle-async-select';
import {
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

export function BranchesForm() {
  const { control } = useFormContext<BranchModel>();

  return (
    <>
      <FormField
        control={control}
        name="business_selector"
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
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
    </>
  );
}
