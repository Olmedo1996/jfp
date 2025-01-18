export interface ICreateBeneficiary {
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  email: string;
  birth_date: string;
  children_count: number | null;
  notes: string;
  education_level: number;
  gender: number;
}

export interface IUpdateBeneficiary {
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  email: string;
  birth_date: string;
  children_count: number | null;
  notes: string;
  education_level: number;
  gender: number;
}
