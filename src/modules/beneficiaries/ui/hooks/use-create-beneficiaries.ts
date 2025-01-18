import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from '@/lib/i18n';
import { EBeneficiaryRoute } from '@/modules/beneficiaries/constants';
import { ICreateBeneficiary } from '@/modules/beneficiaries/core/interfaces/beneficiaries.interface';
import { BeneficiaryModel } from '@/modules/beneficiaries/core/models/beneficiary.model';
import { beneficiarySchema } from '@/modules/beneficiaries/core/schemas/beneficiary.schema';
import { beneficiariesService } from '@/modules/beneficiaries/services/beneficiaries.service';
import { TSaveAction } from '@/types/form.types';
import { showSuccessToast } from '@/utils/toast-messages';
// import { beneficiariesService } from '../../services/beneficiaries.service';

const useCreateBeneficiary = () => {
  const router = useRouter();

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

  const handleSubmit = async (
    data: BeneficiaryModel,
    action: TSaveAction = 'save'
  ) => {
    const { gender, education_level, ...rest } = data;

    const dataToSave: ICreateBeneficiary = {
      gender: gender?.value,
      education_level: education_level?.value,
      ...rest,
    };

    const response = await beneficiariesService.create(dataToSave);

    if (response) {
      showSuccessToast('Beneficiario creado', 'create');

      if (action === 'save') {
        router.push(EBeneficiaryRoute.list);
      } else {
        // Limpiar el formulario para una nueva entrada
        methods.reset();
      }
    }
  };

  return { methods, handleSubmit };
};

export default useCreateBeneficiary;
