'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as m from '@/paraglide/messages';
/* interface Gender {
  value: number;
  label: string;
} */
export function BeneficiariesForm() {
  return (
    <>
      <div className="h-[calc(100vh-10rem)] space-y-4 p-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{m.new_beneficiary()}</h1>
          <div className="flex gap-2">
            <Button variant="secondary">{m.cancel()}</Button>
            <Button>{m.save()}</Button>
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Nombre</Label>
          <Input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="Nombre"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="last_name">Apellido</Label>
          <Input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Apellido"
          />
        </div>
      </div>
    </>
  );
}
