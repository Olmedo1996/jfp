// import { CustomTable } from '@/components/tables/table';
import { TutorsTable } from '@/modules/tutors/ui/components/tutors-table';
import { TutorsView } from '@/modules/tutors/ui/components/tutors-view';

const Page = () => {
  return (
    <>
      <TutorsTable />
      <TutorsView />
    </>
  );
};

export default Page;
