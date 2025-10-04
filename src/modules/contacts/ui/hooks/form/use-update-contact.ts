// useCreateBusiness.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { EContactRoute } from '@/modules/contacts/constants';
import { IUpdateContact } from '@/modules/contacts/core/interfaces/contact.interface';
import { ContactModel } from '@/modules/contacts/core/models/contact.model';
import { contactSchema } from '@/modules/contacts/core/schemas/contact.schema';
import { contactService } from '@/modules/contacts/services/contact.service';
import { TSaveAction } from '@/types/form.types';
import { showSuccessToast } from '@/utils/toast-messages';

interface UseUpdateContactProps {
  initialValues: ContactModel;
  contactId: number;
}

const useUpdateContact = ({
  initialValues,
  contactId: contactId,
}: UseUpdateContactProps) => {
  const router = useRouter();

  const methods = useForm<ContactModel>({
    resolver: zodResolver(contactSchema),
    defaultValues: initialValues,
  });

  const handleSubmit = async (
    data: ContactModel,
    action: TSaveAction = 'save'
  ) => {
    try {
      const dataToUpdate: IUpdateContact = {
        ...data,
        branch: data.branch_selector?.value || 0,
      };

      const result = await contactService.update(contactId, dataToUpdate);
      if (result) {
        showSuccessToast('Sucursal actualizada', 'update');

        if (action === 'save') {
          router.push(EContactRoute.list);
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

export default useUpdateContact;
