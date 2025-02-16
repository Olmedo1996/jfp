// useCreateBusiness.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { EBranchRoute } from '../../../constants';

import { useRouter } from '@/lib/i18n';
import { IUpdateBranch } from '@/modules/branches/core/interfaces/branch.interface';
import { BranchModel } from '@/modules/branches/core/models/branch.model';
import { branchSchema } from '@/modules/branches/core/schemas/branch.schema';
import { branchService } from '@/modules/branches/services/branch.service';
import { TSaveAction } from '@/types/form.types';
import { showSuccessToast } from '@/utils/toast-messages';

interface UseUpdateBranchProps {
  initialValues: BranchModel;
  branchId: number;
}

const useUpdateBranch = ({
  initialValues,
  branchId: branchId,
}: UseUpdateBranchProps) => {
  const router = useRouter();

  const methods = useForm<BranchModel>({
    resolver: zodResolver(branchSchema),
    defaultValues: initialValues,
  });

  const handleSubmit = async (
    data: BranchModel,
    action: TSaveAction = 'save'
  ) => {
    try {
      const dataToUpdate: IUpdateBranch = {
        ...data,
        business: data.business_selector?.value || 0,
      };

      const result = await branchService.update(branchId, dataToUpdate);
      if (result) {
        showSuccessToast('Sucursal actualizada', 'update');

        if (action === 'save') {
          router.push(EBranchRoute.list);
        } else {
          // Limpiar el formulario para una nueva entrada
          methods.reset();
        }
        router.refresh();
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return { methods, handleSubmit };
};

export default useUpdateBranch;
