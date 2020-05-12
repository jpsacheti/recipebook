import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }
  private readonly SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB8-84gtybyyuEPwITin84XW1SjgnJ8uwo';
  private readonly LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword' +
    '?key=AIzaSyB8-84gtybyyuEPwITin84XW1SjgnJ8uwo';

  private static handleError(errorResp: HttpErrorResponse) {

    if (!errorResp.error || !errorResp.error.error) {
      return throwError('An unknow error happened');
    }
    switch (errorResp.error.error.message) {
      case 'EMAIL_EXISTS':
        return throwError('Error: Email alredy exists!');
      case 'OPERATION_NOT_ALLOWED':
        return throwError('Password sign-in is disabled.');
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return throwError('System overload. Try again later');
      case 'EMAIL_NOT_FOUND':
        return throwError('There is no user record corresponding to this email.');
      case 'INVALID_PASSWORD':
        return throwError('Please check your password');
      case 'USER_DISABLED':
        return throwError('Account not found');
      default:
        return throwError(errorResp);
    }

  }

  signUp(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(
      this.SIGNUP_URL,
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(AuthService.handleError));
  }

  login(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(this.LOGIN_URL, {
      email,
      password,
      returnSecureToken: true
    }).pipe(catchError(AuthService.handleError));
  }
}
