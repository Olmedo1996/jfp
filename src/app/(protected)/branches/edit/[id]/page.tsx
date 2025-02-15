// beneficiaries/edit/[id]/page.tsx
import { branchService } from '@/modules/branches/services/branch.service';
import UpdateBranchForm from '@/modules/branches/ui/components/branches-update-form';

interface EditBranchProps {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic';
async function EditBranch({ params }: EditBranchProps) {
  const branchId = params.id ? Number(params.id) : 0;

  const branch = await branchService.get(branchId);

  // Transformar los datos para que coincidan con la estructura del formulario
  const initialValues = {
    ...branch,
  };
  console.log(initialValues);
  return <UpdateBranchForm initialValues={initialValues} branchId={branchId} />;
}

export default EditBranch;
