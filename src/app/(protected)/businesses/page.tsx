import { BusinessesForm } from '@/modules/businesses/ui/components/businesses-form';

const Page = () => {
  return (
    <>
      <BusinessesForm></BusinessesForm>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
    </>
  );
};

export default Page;
