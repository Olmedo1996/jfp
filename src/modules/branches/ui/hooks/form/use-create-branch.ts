// useCreateBusiness.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { EBranchRoute } from '../../../constants';

import { ICreateBranch } from '@/modules/branches/core/interfaces/branch.interface';
import { BranchModel } from '@/modules/branches/core/models/branch.model';
import { branchSchema } from '@/modules/branches/core/schemas/branch.schema';
import { branchService } from '@/modules/branches/services/branch.service';
import { TSaveAction } from '@/types/form.types';
import { showSuccessToast } from '@/utils/toast-messages';

const useCreateBranch = () => {
  const router = useRouter();

  const methods = useForm<BranchModel>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: '',
      code: '',
      phone: '',
      address: '',
      is_active: true,
      business_selector: undefined,
    },
  });

  const handleSubmit = async (
    data: BranchModel,
    action: TSaveAction = 'save'
  ) => {
    try {
      const { business_selector, ...rest } = data;
      const dataToSave: ICreateBranch = {
        ...rest,
        business: business_selector?.value,
      };
      const result = await branchService.create(dataToSave);
      if (result) {
        showSuccessToast('Sucursal creada', 'create');

        if (action === 'save') {
          router.push(EBranchRoute.list);
        } else {
          // Limpiar el formulario para una nueva entrada
          methods.reset();
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return { methods, handleSubmit };
};

export default useCreateBranch;
