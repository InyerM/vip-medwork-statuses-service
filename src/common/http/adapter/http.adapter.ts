// Core
import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import type { ResponseType } from 'axios';
import { AxiosError } from 'axios';
import { map, lastValueFrom, catchError, of } from 'rxjs';

// Interfaces
import type { HttpData, IHttpAdapter } from '../interfaces/http.interface';

@Injectable()
export class HttpAdapter implements IHttpAdapter {
  public constructor(private readonly httpService: HttpService) {}

  public post<T>(url: string, body?: unknown, headers?: Record<string, string>): Promise<T> {
    return lastValueFrom(
      this.httpService
        .post<T>(url, body, { headers: { ...headers, 'Accept-Encoding': 'gzip,deflate,compress' } })
        .pipe(map((response) => response.data)),
    );
  }

  public put<T>(url: string, body?: unknown, headers?: Record<string, string>): Promise<T> {
    return lastValueFrom(
      this.httpService
        .put<T>(url, body, { headers: { ...headers, 'Accept-Encoding': 'gzip,deflate,compress' } })
        .pipe(map((response) => response.data)),
    );
  }

  public patch<T>(url: string, body?: unknown, headers?: Record<string, string>): Promise<T> {
    return lastValueFrom(
      this.httpService
        .patch<T>(url, body, {
          headers: { ...headers, 'Accept-Encoding': 'gzip,deflate,compress' },
        })
        .pipe(map((response) => response.data)),
    );
  }

  public delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return lastValueFrom(
      this.httpService
        .delete<T>(url, {
          headers: { ...headers, 'Accept-Encoding': 'gzip,deflate,compress' },
        })
        .pipe(map((response) => response.data)),
    );
  }

  public request<T>(data: HttpData): Promise<T> {
    return lastValueFrom(
      this.httpService
        .request<T>({
          url: data.url,
          method: data.method,
          headers: { ...data.headers, 'Accept-Encoding': 'gzip,deflate,compress' },
          data: data.body,
        })
        .pipe(map((response) => response.data)),
    );
  }

  public get<T>(
    url: string,
    headers?: Record<string, string>,
    responseType?: ResponseType,
  ): Promise<T> {
    return lastValueFrom(
      this.httpService
        .get<T>(url, {
          headers: { ...headers, 'Accept-Encoding': 'gzip,deflate,compress' },
          validateStatus: (status) => status < 500,
          responseType: responseType,
        })
        .pipe(
          map((response) => response.data),
          catchError((error: AxiosError) => {
            throw new AxiosError(error.message);
          }),
        ),
    );
  }

  public pingCheck(url: string, headers?: Record<string, string>): Promise<boolean> {
    return lastValueFrom(
      this.httpService
        .get(url, {
          headers: { ...headers, 'Accept-Encoding': 'gzip,deflate,compress' },
          validateStatus: (status) => status < 500,
        })
        .pipe(
          map(() => true),
          catchError((error: AxiosError) => {
            if (error.message === 'Maximum number of redirects exceeded') return of(true);
            throw new BadRequestException(`The server responded with a: ${JSON.stringify(error)}`);
          }),
        ),
    );
  }
}

export const HTTP_ADAPTER = 'HTTP_ADAPTER';
