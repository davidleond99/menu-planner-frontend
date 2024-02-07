import { AxiosResponse } from 'axios';
import { IAuthRequest, IAuthResponse } from '../types';
import { BaseCrudService } from '../../../shared/baseCrud';
import customAxiosApp, { customAxiosAppWithoutAuth } from '../../../shared/axiosConfig';

class AuthServices extends BaseCrudService {
  login(input: IAuthRequest): Promise<AxiosResponse<IAuthResponse>> {
    return customAxiosAppWithoutAuth.post('/auth/login', input);
  }
}
const authServices = new AuthServices(customAxiosAppWithoutAuth, '');
export default authServices;


export class UserService extends BaseCrudService {
  constructor() {
    super(customAxiosApp, "auth");
  }
}

export const userService = new UserService();