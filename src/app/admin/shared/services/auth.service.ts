import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User, FbAuthResponse } from 'src/app/shared/interfaces';
import { Observable, throwError, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  public error$: Subject<string> = new Subject<string>();

  loginUrl: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http
      .post(this.loginUrl + environment.apiKey, user)
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  logout() {
    this.setToken(null);
  }

  isAuth(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email not found');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Invalid Password');
        break;
    }
    return throwError(error);
  }

  private setToken(res: FbAuthResponse | null) {
    if (res) {
      const expDate = new Date(new Date().getTime() + +res.expiresIn * 1000);
      localStorage.setItem('fb-token', res.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
