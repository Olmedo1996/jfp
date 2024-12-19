'use client';

import { BusinessModel } from '../../core/models/business.model';
import useCreateBusiness from '../hooks/use-create-business';

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

export function BusinessesForm() {
  const { methods, handleSubmit } = useCreateBusiness();

  function onSubmit(values: BusinessModel) {
    handleSubmit(values);
  }

  return (
    <>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={methods.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Razón Social</FormLabel>
                <FormControl>
                  <Input placeholder="CLIENTE S.A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="ruc_ci"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RUC/CI</FormLabel>
                <FormControl>
                  <Input placeholder="8888888-8" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
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

          <Button type="submit">Submit</Button>
          {/* <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="ruc_ci">RUC/CI</Label>
            <Input
              type="text"
              id="ruc_ci"
              name="ruc_ci"
              placeholder="82000012-1"
              maxLength={15}
              required
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="description">Descripción</Label>
            <Input
              type="text"
              id="description"
              name="description"
              maxLength={100}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="phone">Telefono/Celular</Label>
            <Input
              type="text"
              id="phone"
              name="phone"
              placeholder="+595975342384"
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="address">Direccion</Label>
            <Textarea
              placeholder="San Antonio 964."
              id="address"
              name="address"
              maxLength={150}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="is_active" name="is_active" />
            <Label htmlFor="is_active">Activar</Label>
          </div> */}
        </form>
      </Form>
    </>
  );
}
