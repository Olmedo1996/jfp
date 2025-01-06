import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BusinessModel } from '../../core/models/business.model';
import { businessSchema } from '../../core/schemas/business.schema';
import { businessService } from '../../services/business.service';

const useCreateBusiness = () => {
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

  const handleSubmit = async (data: BusinessModel) => {
    const response = await businessService.businesses(data);
    console.log(response);
  };

  return { methods, handleSubmit };
};

export default useCreateBusiness;
