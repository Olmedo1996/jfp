'use client';

import { format } from 'date-fns';
import { CalendarIcon, Upload } from 'lucide-react';

import useCreateDocument from '../../hooks/use-create-document';

import { InfiniteSelect } from '@/components/selector/infinite-select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { BeneficiaryResult } from '@/modules/beneficiaries/core/interfaces/beneficiaries-service.interface';
import { DocumentModel } from '@/modules/documents/core/models/documents.model';

const DocumentForm = ({ beneficiary }: { beneficiary: BeneficiaryResult }) => {
  const { methods, handleSubmit } = useCreateDocument(beneficiary.id);

  const form = methods;

  function onSubmit(values: DocumentModel) {
    handleSubmit(values);
  }

  return (
    <div>
      {/* Contenedor principal con scroll */}
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {/* Nombre del documento */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del documento</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Descripción */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese una descripción"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tipo de documento */}
            <FormField
              control={form.control}
              name="document_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de documento</FormLabel>
                  <InfiniteSelect
                    apiEndpoint="documents/selector/"
                    placeholder="Selecciona un tipo de documento"
                    searchPlaceholder="Buscar Tipo de Documento"
                    value={field.value}
                    onChange={field.onChange}
                    pageSize={20}
                    ordering="created_at"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Carpeta */}
            <FormField
              control={form.control}
              name="folder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carpeta (Opcional)</FormLabel>
                  <InfiniteSelect
                    apiEndpoint={`documents/folders/selector/?beneficiary=${beneficiary.id}`}
                    placeholder="Selecciona una carpeta"
                    searchPlaceholder="Buscar Carpeta"
                    value={field.value}
                    onChange={field.onChange}
                    pageSize={20}
                    ordering="-created_at"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fecha de expiración */}
            <FormField
              control={form.control}
              name="expiration_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de expiración (Opcional)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), 'PPP')
                          ) : (
                            <span>Seleccione una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto size-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload de archivo */}
            <FormField
              control={form.control}
              name="file"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Archivo</FormLabel>
                  <FormControl>
                    <div className="grid w-full gap-1.5">
                      <Input
                        type="file"
                        accept=".pdf,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) onChange(file);
                        }}
                        {...field}
                      />
                      <p className="text-muted-foreground text-sm">
                        Archivos permitidos: PDF, DOCX. Tamaño máximo: 5MB
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Botón de submit */}
            <div className="flex justify-end space-x-4">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  'Guardando...'
                ) : (
                  <>
                    <Upload className="w-full" />
                    Subir documento
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DocumentForm;
