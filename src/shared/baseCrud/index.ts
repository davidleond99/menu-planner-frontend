/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance, AxiosResponse } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRequestBase {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IResponseBase {
  // id: string | number;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IFiltersRequestBase {}

export abstract class BaseCrudGateway {
  abstract getItems<T>(): Promise<AxiosResponse<T>>;
  abstract getItemById<T>(input: string): Promise<AxiosResponse<T>>;
  abstract createItem<T, S>(input: S): Promise<AxiosResponse<T>>;
  abstract updateItem<T, S>(
    id: string | number,
    input: S
  ): Promise<AxiosResponse<T>>;
  abstract filter<T, S>(input: S): Promise<AxiosResponse<T>>;
}

export class BaseCrudService implements BaseCrudGateway {
  constructor(
    private readonly _axiosInstance: AxiosInstance,
    private readonly url: string
  ) {}

  get<T, D = any>(url: string, params?: D): Promise<AxiosResponse<T, any>> {
    return this._axiosInstance.get<T>(`${this.url}/${url}`, { params });
  }

  put<T, S>(url: string, input: S): Promise<AxiosResponse<T, any>> {
    return this._axiosInstance.put<T>(`${this.url}/${url}`, input);
  }

  getItems<T, D = any>(params?: D): Promise<AxiosResponse<T, any>> {
    return this._axiosInstance.get<T>(this.url, { params });
  }

  getItemById<T, S>(id: S): Promise<AxiosResponse<T, any>> {
    return this._axiosInstance.get<T>(`${this.url}/${id}`);
  }

  createItem<T, S = any>(input: S): Promise<AxiosResponse<T, any>> {
    return this._axiosInstance.post<T>(this.url, input);
  }

  updateItem<T, S>(id: S, input: any): Promise<AxiosResponse<T, any>> {
    return this._axiosInstance.put(`${this.url}/${id}`, input);
  }

  filter<T = any, S = any>(input: S): Promise<AxiosResponse<T, any>> {
    return this._axiosInstance.get(this.url, { params: input });
  }

  delete<T = any>(id: string | number): Promise<AxiosResponse<T, any>> {
    return this._axiosInstance.delete(`${this.url}/${id}`);
  }
}
