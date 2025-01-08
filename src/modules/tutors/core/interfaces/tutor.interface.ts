export interface ICreateTutor {
  user: User;
  dni: string;
  phone: string;
  address: string;
  specialization: string;
  birth_date: string;
  is_active: boolean;
}

export interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
}
