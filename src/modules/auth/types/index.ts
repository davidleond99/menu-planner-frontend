export interface IAuthRequest {
  user_name: string;
  password?: string;
}
export interface IAuthResponse {
  access_token: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  user_name: string;
}
