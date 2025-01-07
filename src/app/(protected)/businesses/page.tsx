import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import * as m from '@/paraglide/messages';

const Page = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1>{m.businesses()}</h1>
        <Link href={'/businesses/new'}>
          <Button variant={'default'}>NUEVO</Button>
        </Link>
      </div>
      <Table>
        <TableCaption>Listado de empresas activas</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Razón Social</TableHead>
            <TableHead>RUC/CI</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>...</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {/* <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell> */}
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default Page;
