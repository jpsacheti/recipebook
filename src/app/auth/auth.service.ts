import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';

export interface AuthResponseData {
  email: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  private readonly SIGNUP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB8-84gtybyyuEPwITin84XW1SjgnJ8uwo';
  private readonly LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword' +
    '?key=AIzaSyB8-84gtybyyuEPwITin84XW1SjgnJ8uwo';

  constructor(private httpClient: HttpClient) {
  }

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
      })
      .pipe(catchError(AuthService.handleError),
        tap(response => this.handleAuth(response.email, response.localId, response.idToken, +response.expiresIn))
      );
  }

  login(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(this.LOGIN_URL, {
      email,
      password,
      returnSecureToken: true
    }).pipe(tap(response => this.handleAuth(response.email, response.localId, response.idToken, +response.expiresIn)),
      catchError(AuthService.handleError),
    );
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const loggedUser = new User(email, userId, token, expirationDate);
    this.user.next(loggedUser);
  }

}
