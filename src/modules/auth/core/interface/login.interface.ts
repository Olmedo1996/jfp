export interface LoginResponse {
  access: string;
  refresh: string;
  tutor: {
    id: number;
    user: {
      id: number;
      username: string;
      email: string;
      first_name: string;
      last_name: string;
      profile_image_url: string | null;
    };
    dni: string;
    phone: string;
    specialization: string;
  };
}

export interface User {
  id: string;
  username: string;
  accessToken: string;
  refreshToken: string;
}

export interface Login {
  username: string;
  password: string;
}
