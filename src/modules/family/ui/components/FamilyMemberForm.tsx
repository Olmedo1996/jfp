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

  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Add Family Member</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
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
                    <FormLabel>Last Name</FormLabel>
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
                  <FormLabel>Birth Date</FormLabel>
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
                  <FormLabel>Phone</FormLabel>
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
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Adding...' : 'Add Family Member'}
            </Button>
          </form>
        </Form>
      </div>
      <FamilyMemberList beneficiaryId={beneficiaryId} />
    </div>
  );
}
