export interface LoginResponse {
  access: string;
  refresh: string;
  tutor: {
    id: number;
    user: {
      id: number;
      username: string;
    };
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
