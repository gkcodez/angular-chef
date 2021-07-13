import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface SignupAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<SignupAuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmhrMARQzZIAN61yzyVVsPRzS4hLK0PV4',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    );
  }
}
