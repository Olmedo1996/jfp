import { useFormContext } from 'react-hook-form';

import { ActivityModel } from '../../core/models/activity.model';

import { AsyncInfiniteSelect } from '@/components/selector/sigle-async-select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ActivitiesForm() {
  const { control, watch } = useFormContext<ActivityModel>();
  return (
    <>
      <FormField
        control={control}
        name="beneficiary_selector"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Beneficiario</FormLabel>
            <AsyncInfiniteSelect
              apiEndpoint="beneficiaries/selector/"
              placeholder="Selecciona un beneficiario"
              noOptionsMessage="No hay beneficiarios"
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
        name="tutor_selector"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tutor</FormLabel>
            <AsyncInfiniteSelect
              apiEndpoint="tutors/selector/"
              placeholder="Selecciona un tutor"
              noOptionsMessage="No hay tutores"
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
        name="activity_status_selector"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Actividad</FormLabel>
            <AsyncInfiniteSelect
              apiEndpoint="activities/selector/"
              placeholder="Selecciona una actividad"
              noOptionsMessage="No hay estados disponibles"
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
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notas</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Ej: Traslado a petición del beneficiario"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="start_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fecha de Inicio</FormLabel>
            <FormControl>
              <Input type="date" placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
