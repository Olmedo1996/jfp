// useCreateBusiness.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { EActivityRoute } from '../../../constants';
import { ActivityModel } from '../../../core/models/activity.model';
import { activitySchema } from '../../../core/schemas/activity.schema';
import { activityService } from '../../../services/activity.service';

import { useRouter } from '@/lib/i18n';
import { TSaveAction } from '@/types/form.types';
import { showSuccessToast } from '@/utils/toast-messages';

const useCreateActivity = () => {
  const router = useRouter();

  const methods = useForm<ActivityModel>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      end_date: '',
      notes: '',
      activity_status: 0,
      business: 0,
      tutor: 0,
      beneficiary: 0,
    },
  });

  const handleSubmit = async (
    data: ActivityModel,
    action: TSaveAction = 'save'
  ) => {
    try {
      const result = await activityService.create(data);
      if (result) {
        showSuccessToast('Actividad registrada', 'create');

        if (action === 'save') {
          router.push(EActivityRoute.list);
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

export default useCreateActivity;
