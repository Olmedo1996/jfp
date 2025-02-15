export interface ICreateContact {
  first_name: string;
  last_name: string;
  phone: string;
  job_title: string;
  is_primary_contact: boolean;
  branch: number;
}

export interface IUpdateContact {
  first_name: string;
  last_name: string;
  phone: string;
  job_title: string;
  is_primary_contact: boolean;
  branch: number;
}
