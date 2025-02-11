'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  FamilyMemberFormData,
  familyMemberSchema,
} from '../../core/schemas/family-member.schema';
import { useCreateFamily } from '../hooks/form/use-create-family';
import { FamilyMemberList } from './FamilyMemberList';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FamilyMemberFormProps {
  beneficiaryId: number;
}

export function FamilyMemberForm({ beneficiaryId }: FamilyMemberFormProps) {
  const form = useForm<FamilyMemberFormData>({
    resolver: zodResolver(familyMemberSchema),
    defaultValues: {
      beneficiary: beneficiaryId,
      first_name: '',
      last_name: '',
      birth_date: '',
      phone: '',
      address: '',
      is_active: true,
    },
  });

  const { mutate, isPending } = useCreateFamily(beneficiaryId);

  const onSubmit = (data: FamilyMemberFormData) => {
    mutate(data);
    form.reset();
  };

  const onReset = () => {
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Agregar nuevo miembro</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellidos</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
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
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Agregando...' : 'Agregar'}
              </Button>
              <Button
                type="reset"
                variant="secondary"
                disabled={isPending}
                onClick={onReset}
              >
                {'Limpiar'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <FamilyMemberList beneficiaryId={beneficiaryId} />
    </div>
  );
}
