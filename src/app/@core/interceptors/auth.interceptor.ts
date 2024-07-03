import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = 'tRlp9IuMjavbW8OAFsCiDtyXlePpviCt';
    request = this.setHeaders(token, request);
    return next.handle(request);
  }

  setHeaders(token: string, request: HttpRequest<any>) {
    return request.clone({
      headers: request.headers.set('Authorization', `${token}`)
    })
  }
}
