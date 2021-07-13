import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<User>();

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDmhrMARQzZIAN61yzyVVsPRzS4hLK0PV4',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(res => {
      this.handleAuthentication(res.email, res.localId, res.idToken, res.expiresIn);
    }));
  }

  private handleAuthentication(email: string, id: string, token: string, expiresIn: string) {

    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDmhrMARQzZIAN61yzyVVsPRzS4hLK0PV4',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(res => {
      this.handleAuthentication(res.email, res.localId, res.idToken, res.expiresIn);
    }));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    console.log(error);
    if (!error.error || !error.error.error) {
      return throwError(errorMessage);
    }
    switch (error.error.error.message) {
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid username / password!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'User not registered yet!'
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exists!'
        break;
    }
    return throwError(errorMessage);
  }
}
