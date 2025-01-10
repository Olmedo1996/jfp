'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
/* interface Gender {
  value: number;
  label: string;
} */
export function BeneficiariesForm() {
  return (
    <>
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
    </>
  );
}
