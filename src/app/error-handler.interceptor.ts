import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          //    not logged in
          this.toastr.error('Please login to access the resource');
          this.authService.logout();
          this.router.navigate(['login']);
          // return throwError(error.statusText);
        }

        if (error.status === 400) {
          this.toastr.error('Operation not allowed', 'Process Breach');
        }

        if (error.status === 403) {
          //    forbidden
          this.toastr.error('Entry restricted', 'Restrictions');
          this.router.navigate(['unauthorized']);
        }

        const applicationError = error.headers.get('Application-Error');
        if (applicationError) {
          this.toastr.error('Cannot complete the operation', 'System Error');
        }

        const serverError = error.error;
        let modelStateErrors = '';
        if (serverError && typeof serverError === 'object') {
          for (const key in serverError) {
            if (serverError[key]) {
              modelStateErrors += serverError[key] + '\n';
            }
          }
        }

        return throwError(() => error);
      })
    );
  }
}
