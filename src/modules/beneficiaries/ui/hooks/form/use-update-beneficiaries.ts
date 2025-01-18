// modules/beneficiaries/ui/hooks/form/use-update-beneficiaries.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from '@/lib/i18n';
import { EBeneficiaryRoute } from '@/modules/beneficiaries/constants';
import { IUpdateBeneficiary } from '@/modules/beneficiaries/core/interfaces/beneficiaries.interface';
import { BeneficiaryModel } from '@/modules/beneficiaries/core/models/beneficiary.model';
import { beneficiarySchema } from '@/modules/beneficiaries/core/schemas/beneficiary.schema';
import { beneficiariesService } from '@/modules/beneficiaries/services/beneficiaries.service';
import { TSaveAction } from '@/types/form.types';
import { showSuccessToast } from '@/utils/toast-messages';

interface UseUpdateBeneficiaryProps {
  initialValues: BeneficiaryModel;
  beneficiaryId: number;
}

const useUpdateBeneficiary = ({
  initialValues,
  beneficiaryId,
}: UseUpdateBeneficiaryProps) => {
  const router = useRouter();

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

    const response = await beneficiariesService.update(
      beneficiaryId,
      dataToUpdate
    );

    if (response) {
      showSuccessToast('Beneficiario actualizado', 'update');

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

export default useUpdateBeneficiary;
