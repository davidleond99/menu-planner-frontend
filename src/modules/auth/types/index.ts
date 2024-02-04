export interface IAuthRequest {
  usuario: string;
  contrasena?: string;
}
export interface IAuthResponse {
  access_token: string;
  user: User;
}

export interface User {
  id: number;
  nombre_apellidos: string;
  usuario: string;
}
