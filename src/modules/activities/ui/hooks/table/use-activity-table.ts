import { useGenericTable } from '@/hooks/use-generic-table';
import { ActivityResult } from '@/modules/activities/core/interfaces/activity-service.interface';
import { activityService } from '@/modules/activities/services/activity.service';

export function useActivityTable() {
  return useGenericTable<ActivityResult>({
    queryKey: ['activities'],
    fetchData: activityService.listView,
  });
}
