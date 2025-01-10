'use client';
import { useQuery } from '@tanstack/react-query';

import {
  ApiTutorRequestParams,
  ApiTutorResponse,
} from '@/modules/tutors/core/interfaces/tutor-service.interface';
import { tutorService } from '@/modules/tutors/services/tutor.service';

export const QUERY_KEY_LIST_TUTORS = ['TUTORS_LIST'];

const useListViewTutors = (params?: ApiTutorRequestParams) => {
  return useQuery<ApiTutorResponse, Error>({
    queryKey: [...QUERY_KEY_LIST_TUTORS, params],
    queryFn: () => tutorService.listView(params),
    // keepPreviousData: true, // Mantener los datos previos mientras se carga la nueva página
    staleTime: 1000 * 60 * 5, // Los datos se consideran frescos por 5 minutos
  });
};

export default useListViewTutors;
