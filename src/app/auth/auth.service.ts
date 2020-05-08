import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface AuthResponseData {
  kind: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private httpClient: HttpClient) {
  }

  signUp(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB8-84gtybyyuEPwITin84XW1SjgnJ8uwo',
      {
        email,
        password,
        returnSecureToken: true
      });
  }
}
