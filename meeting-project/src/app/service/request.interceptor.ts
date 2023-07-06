import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      localStorage.getItem('token') &&
      localStorage.getItem('token') != 'undefined'
    ) {
      var token = localStorage.getItem('token');
      const req = request.clone({
        setHeaders: {
          'content-type': 'application/json',
          accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      });
      // req.headers.append({''});

      return next.handle(req);
    } else {
      const req = request.clone({
        setHeaders: {
          'content-type': 'application/json',
          accept: '*/*',
        },
      });
      return next.handle(req);
    }
  }
}
