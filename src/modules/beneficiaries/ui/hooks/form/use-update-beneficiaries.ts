import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { updateBeneficiaryAction } from '@/modules/beneficiaries/actions/beneficiaries.actions';
import { EBeneficiaryRoute } from '@/modules/beneficiaries/constants';
import { IUpdateBeneficiary } from '@/modules/beneficiaries/core/interfaces/beneficiaries.interface';
import { BeneficiaryModel } from '@/modules/beneficiaries/core/models/beneficiary.model';
import { beneficiarySchema } from '@/modules/beneficiaries/core/schemas/beneficiary.schema';
import { TSaveAction } from '@/types/form.types';
import { showErrorToast, showSuccessToast } from '@/utils/toast-messages';

interface UseUpdateBeneficiaryProps {
  initialValues: BeneficiaryModel;
  beneficiaryId: number;
}

const useUpdateBeneficiary = ({
  initialValues,
  beneficiaryId,
}: UseUpdateBeneficiaryProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const methods = useForm<BeneficiaryModel>({
    resolver: zodResolver(beneficiarySchema),
    defaultValues: initialValues,
  });

  const handleSubmit = async (
    data: BeneficiaryModel,
    action: TSaveAction = 'save'
  ) => {
    const { gender, education_level, ...rest } = data;
    const dataToUpdate: IUpdateBeneficiary = {
      gender: gender?.value,
      education_level: education_level?.value,
      ...rest,
    };

    startTransition(async () => {
      const result = await updateBeneficiaryAction(beneficiaryId, dataToUpdate);

      if (result.success) {
        showSuccessToast('Beneficiario actualizado', 'update');
        if (action === 'save') {
          router.push(EBeneficiaryRoute.list);
        } else {
          methods.reset();
        }
        router.refresh();
      } else {
        showErrorToast(result.error || 'Error al actualizar beneficiario');
      }
    });
  };

  return { methods, handleSubmit, isPending };
};

export default useUpdateBeneficiary;
