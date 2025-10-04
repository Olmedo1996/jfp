// useCreateBusiness.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { EBusinessRoute } from '../../../constants';
import { BusinessModel } from '../../../core/models/business.model';
import { businessSchema } from '../../../core/schemas/business.schema';
import { businessService } from '../../../services/business.service';

import { IUpdateBusiness } from '@/modules/businesses/core/interfaces/business.interface';
import { TSaveAction } from '@/types/form.types';
import { showSuccessToast } from '@/utils/toast-messages';

interface UseUpdateBusinessProps {
  initialValues: BusinessModel;
  businessId: number;
}

const useUpdateBusiness = ({
  initialValues,
  businessId,
}: UseUpdateBusinessProps) => {
  const router = useRouter();

  const methods = useForm<BusinessModel>({
    resolver: zodResolver(businessSchema),
    defaultValues: initialValues,
  });

  const handleSubmit = async (
    data: BusinessModel,
    action: TSaveAction = 'save'
  ) => {
    try {
      const dataToUpdate: IUpdateBusiness = {
        ...data,
      };

      const result = await businessService.update(businessId, dataToUpdate);
      if (result) {
        showSuccessToast('Empresa actualizada', 'update');

        if (action === 'save') {
          router.push(EBusinessRoute.list);
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

export default useUpdateBusiness;
