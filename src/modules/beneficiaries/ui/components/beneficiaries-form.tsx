'use client';

import { EBeneficiaryRoute } from '../../constants';
import { BeneficiaryModel } from '../../core/models/beneficiary.model';
import useCreateBeneficiary from '../hooks/use-create-beneficiaries';

import SaveHeaderForm from '@/components/forms/save-header-form';
import { InfiniteSelect } from '@/components/selector/infinite-select';
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
import { Textarea } from '@/components/ui/textarea';
import * as m from '@/paraglide/messages';

export function BeneficiariesForm() {
  const { methods, handleSubmit } = useCreateBeneficiary();

  function onSubmit(values: BeneficiaryModel) {
    handleSubmit(values);
  }

  return (
    <>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <SaveHeaderForm
            title={m.new_beneficiary()}
            backUrl={EBeneficiaryRoute.list}
          />
          <FormField
            control={methods.control}
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
            control={methods.control}
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
            control={methods.control}
            name="birth_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="" {...field} />
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
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Género</FormLabel>

                <FormControl>
                  <InfiniteSelect
                    apiEndpoint="genders"
                    placeholder="Seleccione un género"
                    searchPlaceholder="Buscar Género"
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
            control={methods.control}
            name="education_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nivel de Educación</FormLabel>
                <FormControl>
                  <InfiniteSelect
                    apiEndpoint="educations"
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
            name="children_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad de hijos</FormLabel>
                <FormControl>
                  <Input type="number" min={0} placeholder="" {...field} />
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
          <hr />
          <FormField
            control={methods.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observaciones adicionales</FormLabel>
                <FormControl>
                  <Textarea placeholder="........." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">REGISTRAR</Button>
        </form>
      </Form>
    </>
  );
}
