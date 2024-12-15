import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

export function BusinessesForm() {
  return (
    <>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">Razón Social</Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="CLIENTE S.A"
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
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
        <Textarea placeholder="San Antonio 964." id="address" name="address" />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="is_active" name="is_active" />
        <Label htmlFor="is_active">Activar</Label>
      </div>
    </>
  );
}
