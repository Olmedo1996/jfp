'use client';

import { TutorModel } from '../../core/models/tutor.model';
import useCreateBusiness from '../hooks/use-create-tutor';

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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

export function TutorsForm() {
  const { methods, handleSubmit } = useCreateBusiness();

  function onSubmit(values: TutorModel) {
    handleSubmit(values);
  }

  return (
    <>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <legend className="text-lg font-semibold">Información Básica</legend>
          <FormField
            control={methods.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Juan" {...field} />
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
                  <Input placeholder="Perez" {...field} />
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
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="juan.perez@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="dni"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documento de Identidad</FormLabel>
                <FormControl>
                  <Input placeholder="8412365" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="birth_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
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
            control={methods.control}
            name="specialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Especialización</FormLabel>
                <FormControl>
                  <Textarea placeholder="San Antonio 964" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
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
          <legend className="text-lg font-semibold">
            Datos para creación de usuario
          </legend>
          <FormField
            control={methods.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="jperez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar contraseña</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
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
