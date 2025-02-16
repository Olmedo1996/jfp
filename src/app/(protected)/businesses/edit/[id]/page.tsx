// beneficiaries/edit/[id]/page.tsx
import { businessService } from '@/modules/businesses/services/business.service';
import UpdateBusinessForm from '@/modules/businesses/ui/components/business-update-form';

interface EditBusinessProps {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic';
async function EditBusiness({ params }: EditBusinessProps) {
  const businessId = params.id ? Number(params.id) : 0;

  const business = await businessService.get(businessId);

  // Transformar los datos para que coincidan con la estructura del formulario
  const initialValues = {
    ...business,
  };
  console.log(initialValues);
  return (
    <UpdateBusinessForm initialValues={initialValues} businessId={businessId} />
  );
}

export default EditBusiness;
