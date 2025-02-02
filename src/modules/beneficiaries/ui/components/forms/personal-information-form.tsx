'use client';

import { useFormContext } from 'react-hook-form';

import { InfiniteSelect } from '@/components/selector/infinite-select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BeneficiaryModel } from '@/modules/beneficiaries/core/models/beneficiary.model';

export function PersonalInformationForm() {
  const { control } = useFormContext<BeneficiaryModel>();

  return (
    <div className="space-y-6">
      <h2 className="border-b pb-2 text-xl font-semibold">
        Información Personal
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Juan" {...field} />
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
                <Input type="text" placeholder="Peréz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="birth_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Nacimiento</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Género</FormLabel>
              <FormControl>
                <InfiniteSelect
                  apiEndpoint="genders/"
                  placeholder="Seleccione un género"
                  searchPlaceholder="Buscar Género"
                  value={field.value}
                  onChange={field.onChange}
                  pageSize={20}
                  ordering="-created_at"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="education_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nivel de Educación</FormLabel>
              <FormControl>
                <InfiniteSelect
                  apiEndpoint="educations/"
                  placeholder="Seleccione un nivel de educación"
                  searchPlaceholder="Buscar Nivel de Educación"
                  value={field.value}
                  onChange={field.onChange}
                  pageSize={20}
                  ordering="-created_at"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="children_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad de hijos</FormLabel>
              <FormControl>
                <Input type="number" min={0} placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
