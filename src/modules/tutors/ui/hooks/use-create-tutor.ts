import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from '@/lib/i18n';
import { TutorModel } from '@/modules/tutors//core/models/tutor.model';
import { ETutorsRoute } from '@/modules/tutors/constants';
import { ICreateTutor } from '@/modules/tutors/core/interfaces/tutor.interface';
import { tutorSchema } from '@/modules/tutors/core/schemas/tutor.schema';
import { tutorService } from '@/modules/tutors/services/tutor.service';
import { showSuccessToast } from '@/utils/toast-messages';

const useCreateTutor = () => {
  const router = useRouter();

  const methods = useForm<TutorModel>({
    resolver: zodResolver(tutorSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      dni: '',
      phone: '',
      address: '',
      specialization: '',
      birth_date: '',
      is_active: true,
      password: '',
      password_confirmation: '',
    },
  });

  const handleSubmit = async (data: TutorModel) => {
    const params: ICreateTutor = {
      dni: data.dni,
      phone: data.phone,
      address: data.address,
      specialization: data.specialization,
      birth_date: data.birth_date,
      is_active: data.is_active,
      user: {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
        password_confirmation: data.password_confirmation,
        username: data.username,
      },
    };
    try {
      const result = await tutorService.create(params);
      if (result) {
        showSuccessToast('Tutor creado', 'create');
        router.push(ETutorsRoute.list);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return { methods, handleSubmit };
};

export default useCreateTutor;
