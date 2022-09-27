import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, mergeMap, of } from 'rxjs';
import { RestService } from './rest.service';
import {
  JwtViewModel,
  LoginViewModel,
  UserViewModel,
} from './_models/app.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<UserViewModel | null>(null);

  user$ = this.userSubject.asObservable();

  private jwtHelper = new JwtHelperService();

  constructor(private restService: RestService) {
    const token = localStorage.getItem('token') ?? '';

    if (!this.jwtHelper.isTokenExpired(token)) {
      const userViewModel = this.jwtHelper.decodeToken(token) as UserViewModel;
      userViewModel.token = token;
      this.userSubject.next(userViewModel);
    } else {
      localStorage.removeItem('token');
      this.userSubject.next(null);
    }
  }

  login(form: LoginViewModel) {
    return this.restService
      .post<LoginViewModel, JwtViewModel>('auth/login', form)
      .pipe(
        mergeMap((v) => {
          localStorage.setItem('token', v.jwt);

          if (!this.jwtHelper.isTokenExpired(v.jwt)) {
            const userViewModel = this.jwtHelper.decodeToken(
              v.jwt
            ) as UserViewModel;
            userViewModel.token = v.jwt;
            this.userSubject.next(userViewModel);
            return of(true);
          } else {
            localStorage.removeItem('token');
            this.userSubject.next(null);
            return of(false);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }
}
