import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization:
          'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN1bmlsQGdtYWlsLmNvbSIsIkZ1bGxOYW1lIjoiU3VuaWwgTSBIIiwiQXZhdGFyVXJsIjoiaHR0cHM6Ly9yZXFyZXMuaW4vaW1nL2ZhY2VzLzgtaW1hZ2UuanBnIiwiUm9sZXMiOlsiQWRtaW4iLCJVc2VyIl0sIm5iZiI6MTY2NDI3Njc2NiwiZXhwIjoxNjY0MjgzOTY2LCJpYXQiOjE2NjQyNzY3NjZ9.JThfEDOkwL0t7E-JllKxk6gtvwiNnxurevWjs2phC2zdIAPU90iVI5_zKSMf2hrRy-P8WYgv34NmSFC7JDeKgw',
      },
    });
    return next.handle(request);
  }
}
