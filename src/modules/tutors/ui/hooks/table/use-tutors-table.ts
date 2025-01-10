import { useGenericTable } from '@/hooks/use-generic-table';
import { TutorResult } from '@/modules/tutors/core/interfaces/tutor-service.interface';
import { tutorService } from '@/modules/tutors/services/tutor.service';

export function useTutorsTable() {
  return useGenericTable<TutorResult>({
    queryKey: ['tutors'],
    fetchData: tutorService.listView,
  });
}
