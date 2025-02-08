import { useGenericTable } from '@/hooks/use-generic-table';
import { ContactResult } from '@/modules/contacts/core/interfaces/contact-service.interface';
import { contactService } from '@/modules/contacts/services/contact.service';

export function useContactTable() {
  return useGenericTable<ContactResult>({
    queryKey: ['contacts'],
    fetchData: contactService.listView,
  });
}
