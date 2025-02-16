'use client';

import { useFormContext } from 'react-hook-form';

import { ContactModel } from '../../core/models/contact.model';

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

export function ContactsForm() {
  const { control, watch } = useFormContext<ContactModel>();

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
        name="branch_selector"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sucursal</FormLabel>
            <AsyncInfiniteSelect
              apiEndpoint={`branches/selector/?business=${watch('business_selector')?.value}`}
              placeholder="Selecciona un tipo de documento"
              noOptionsMessage="No hay tipos de documentos disponibles"
              value={field.value}
              onChange={field.onChange}
              pageSize={20}
              ordering="created_at"
              isDisabled={!watch('business_selector')?.value}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Correo electrónico</FormLabel>
            <FormControl>
              <Input type="email" placeholder="jperez@gmail.com" {...field} />
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
    </>
  );
}
