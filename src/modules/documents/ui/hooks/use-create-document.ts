import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ICreateDocument } from '../../core/interfaces/documents.interface';
import { DocumentModel } from '../../core/models/documents.model';
import { documentSchema } from '../../core/schemas/documents.schema';
import { documentsService } from '../../services/documents.service';

// import { useRouter } from '@/lib/i18n';
// import { EBeneficiaryRoute } from '@/modules/beneficiaries/constants';
import { TSaveAction } from '@/types/form.types';
import { formatDate, parseBackendDate } from '@/utils/dateUtils';
import { showSuccessToast } from '@/utils/toast-messages';
// import { beneficiariesService } from '../../services/beneficiaries.service';

const useCreateDocument = (beneficiaryId: number) => {
  // const router = useRouter();

  const methods = useForm<DocumentModel>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      name: '',
      description: '',
      document_type: undefined,
      folder: undefined,
      file: undefined,
      expiration_date: undefined,
      beneficiary: beneficiaryId,
    },
  });

  const handleSubmit = async (
    data: DocumentModel,
    action: TSaveAction = 'save'
  ) => {
    const { document_type, folder, expiration_date, ...rest } = data;

    const dataToSave: ICreateDocument = {
      document_type: document_type?.value,
      folder: folder?.value,
      expiration_date: expiration_date
        ? formatDate(
            parseBackendDate(expiration_date) || new Date(),
            'SIMPLE_DATE_BACKEND'
          )
        : undefined,
      ...rest,
    };

    const response = await documentsService.create(dataToSave);

    if (response) {
      showSuccessToast('Documento agregado al beneficiario', 'create');

      if (action === 'save') {
        // router.push(EBeneficiaryRoute.list);
      } else {
        // Limpiar el formulario para una nueva entrada
      }
      methods.reset();
    }
  };

  return { methods, handleSubmit };
};

export default useCreateDocument;
