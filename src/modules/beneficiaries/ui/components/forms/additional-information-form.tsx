'use client';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { BeneficiaryModel } from '@/modules/beneficiaries/core/models/beneficiary.model';

export function AdditionalInformationForm() {
  const { control } = useFormContext<BeneficiaryModel>();

  return (
    <div className="space-y-6">
      <h2 className="border-b pb-2 text-xl font-semibold">
        Información Adicional
      </h2>
      <FormField
        control={control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Observaciones adicionales</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Ingrese observaciones adicionales..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
