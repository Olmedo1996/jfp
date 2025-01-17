import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { BeneficiaryModel } from '../../core/models/beneficiary.model';
import { beneficiarySchema } from '../../core/schemas/beneficiary.schema';
// import { beneficiariesService } from '../../services/beneficiaries.service';

const useCreateBeneficiary = () => {
  const methods = useForm<BeneficiaryModel>({
    resolver: zodResolver(beneficiarySchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      address: '',
      phone: '',
      email: '',
      birth_date: '',
      children_count: 0,
      notes: '',
      education_level: undefined,
      gender: undefined,
    },
  });

  const handleSubmit = async (data: BeneficiaryModel) => {
    // const response = await beneficiariesService.beneficiaries(data);
    console.log(data);
  };

  return { methods, handleSubmit };
};

export default useCreateBeneficiary;
