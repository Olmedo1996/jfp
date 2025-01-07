import Link from 'next/link';

// import { CustomTable } from '@/components/tables/table';
import { Button } from '@/components/ui/button';
import TutorsTable from '@/modules/tutors/ui/components/tutors-table';
import * as m from '@/paraglide/messages';

const Page = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1>{m.tutors()}</h1>
        <Link href={'/tutors/new'}>
          <Button variant={'default'}>NUEVO</Button>
        </Link>
      </div>
      <TutorsTable />
    </>
  );
};

export default Page;
