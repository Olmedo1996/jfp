// useCreateBusiness.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { EBusinessRoute } from '../../../constants';
import { BusinessModel } from '../../../core/models/business.model';
import { businessSchema } from '../../../core/schemas/business.schema';
import { businessService } from '../../../services/business.service';

import { useRouter } from '@/lib/i18n';
import { TSaveAction } from '@/types/form.types';
import { showSuccessToast } from '@/utils/toast-messages';

const useCreateBusiness = () => {
  const router = useRouter();

  const methods = useForm<BusinessModel>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      is_active: true,
      address: '',
      description: '',
      name: '',
      phone: '',
      ruc_ci: '',
    },
  });

  const handleSubmit = async (
    data: BusinessModel,
    action: TSaveAction = 'save'
  ) => {
    try {
      const result = await businessService.create(data);
      if (result) {
        showSuccessToast('Empresa creada', 'create');

        if (action === 'save') {
          router.push(EBusinessRoute.list);
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

export default useCreateBusiness;
