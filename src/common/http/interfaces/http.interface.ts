/* eslint-disable @typescript-eslint/no-explicit-any */

export type Method = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
export interface HttpData {
  url: string;
  method: Method;
  headers?: Record<string, string>;
  body?: any;
}

export interface IHttpAdapter {
  post: <T>(url: string, body: any, headers?: Record<string, string>) => Promise<T>;
  get: <T>(url: string, body?: any) => Promise<T>;
  put: <T>(url: string, body?: unknown, headers?: Record<string, string>) => Promise<T>;
  patch: <T>(url: string, body?: unknown, headers?: Record<string, string>) => Promise<T>;
  delete: <T>(url: string, headers?: Record<string, string>) => Promise<T>;
  request: <T>(data: HttpData) => Promise<T>;
  pingCheck: (url: string, headers?: Record<string, string>) => Promise<boolean>;
}
