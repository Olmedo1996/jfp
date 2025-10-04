import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { createBeneficiaryAction } from '@/modules/beneficiaries/actions/beneficiaries.actions';
import { EBeneficiaryRoute } from '@/modules/beneficiaries/constants';
import { ICreateBeneficiary } from '@/modules/beneficiaries/core/interfaces/beneficiaries.interface';
import { BeneficiaryModel } from '@/modules/beneficiaries/core/models/beneficiary.model';
import { beneficiarySchema } from '@/modules/beneficiaries/core/schemas/beneficiary.schema';
import { TSaveAction } from '@/types/form.types';
import { showErrorToast, showSuccessToast } from '@/utils/toast-messages';

const useCreateBeneficiary = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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

    startTransition(async () => {
      const result = await createBeneficiaryAction(dataToSave);

      if (result.success) {
        showSuccessToast('Beneficiario creado', 'create');
        if (action === 'save') {
          router.push(EBeneficiaryRoute.list);
        } else {
          methods.reset();
        }
      } else {
        showErrorToast(result.error || 'Error al crear beneficiario');
      }
    });
  };

  return { methods, handleSubmit, isPending };
};

export default useCreateBeneficiary;
