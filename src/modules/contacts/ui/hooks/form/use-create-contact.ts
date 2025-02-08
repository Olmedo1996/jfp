// useCreateBusiness.ts
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { EContactRoute } from '../../../constants';

import { useRouter } from '@/lib/i18n';
import { ICreateContact } from '@/modules/contacts/core/interfaces/contact.interface';
import { ContactModel } from '@/modules/contacts/core/models/contact.model';
import { contactSchema } from '@/modules/contacts/core/schemas/contact.schema';
import { contactService } from '@/modules/contacts/services/contact.service';
import { TSaveAction } from '@/types/form.types';
import { showSuccessToast } from '@/utils/toast-messages';

const useCreateContact = () => {
  const router = useRouter();

  const methods = useForm<ContactModel>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '',
      job_title: '',
      is_primary_contact: true,
      branch: null,
      business: null,
    },
  });

  const { watch, setValue } = methods;

  const business = watch('business');

  const handleSubmit = async (
    data: ContactModel,
    action: TSaveAction = 'save'
  ) => {
    try {
      const { branch, ...rest } = data;
      const dataToSave: ICreateContact = {
        ...rest,
        branch: branch?.value || 0,
      };
      const result = await contactService.create(dataToSave);
      if (result) {
        showSuccessToast('Contacto creada', 'create');

        if (action === 'save') {
          router.push(EContactRoute.list);
        } else {
          // Limpiar el formulario para una nueva entrada
          methods.reset();
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  useEffect(() => {
    if (business || business === null) {
      setValue('branch', null);
    }
  }, [business, setValue]);

  return { methods, handleSubmit };
};

export default useCreateContact;
