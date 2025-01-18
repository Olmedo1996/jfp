// beneficiaries/edit/[id]/page.tsx
import { beneficiariesService } from '@/modules/beneficiaries/services/beneficiaries.service';
import { UpdateBeneficiariesForm } from '@/modules/beneficiaries/ui/components/beneficieries-update-form';

interface EditBeneficiaryProps {
  params: {
    id: string;
  };
}

async function EditBeneficiary({ params }: EditBeneficiaryProps) {
  const beneficiaryId = params.id ? Number(params.id) : 0;

  const beneficiary = await beneficiariesService.get(beneficiaryId);

  // Transformar los datos para que coincidan con la estructura del formulario
  const initialValues = {
    ...beneficiary,
  };

  return (
    <UpdateBeneficiariesForm
      initialValues={initialValues}
      beneficiaryId={beneficiaryId}
    />
  );
}

export default EditBeneficiary;
