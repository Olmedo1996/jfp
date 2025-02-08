import { ISelectOption } from '@/interface/select-option';

export type ContactModel = {
  first_name: string;
  last_name: string;
  phone: string;
  job_title: string;
  is_primary_contact: boolean;
  email: string;
  branch: ISelectOption<number> | null;
  business: ISelectOption<number> | null;
};
