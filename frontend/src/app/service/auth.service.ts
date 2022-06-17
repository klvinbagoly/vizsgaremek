import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

export interface ILoginRequest {
  email: string,
  password: string
}

export interface IAuthResponse {
  accessToken: string,
  refreshToken: string,
  user: User
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = environment.apiUrl + 'login'
  logoutUrl = environment.apiUrl + 'logout'
  refreshUrl = environment.apiUrl + 'refresh'

  lastUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  lastAccessToken: BehaviorSubject<string> = new BehaviorSubject<string>('')
  lastRefreshToken: BehaviorSubject<string> = new BehaviorSubject<string>('')


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const user = sessionStorage.getItem('user')
    if (user) {
      this.lastUser.next(JSON.parse(user))
    }
    const token = sessionStorage.getItem('token')
    if (token) {
      this.lastAccessToken.next(token)
    }
    const refresh = sessionStorage.getItem('refresh')
    if (refresh) {
      this.lastRefreshToken.next(refresh)
      setTimeout(() => this.refresh(), 60000)
    }
  }

  login(user: ILoginRequest) {
    return this.http.post<IAuthResponse>(this.loginUrl, user)
      .pipe(switchMap(response => {
        if (response.accessToken) {
          setTimeout(() => this.refresh(), 60000)
          this.lastUser.next(response.user)
          this.lastAccessToken.next(response.accessToken)
          this.lastRefreshToken.next(response.refreshToken)
          sessionStorage.setItem('user', JSON.stringify(response.user))
          sessionStorage.setItem('token', response.accessToken)
          sessionStorage.setItem('refresh', response.refreshToken)
          return of(response.user)
        } else {
          this.lastUser.next(null)
          sessionStorage.removeItem('user')
          return of(null)
        }
      }))
  }

  logout() {
    const refreshToken = this.lastRefreshToken.getValue()
    this.http.post(this.logoutUrl, { refreshToken }).subscribe({
      next: response => {
        console.log(response)
        this.lastUser.next(null)
        this.lastAccessToken.next('')
        this.lastRefreshToken.next('')
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('refresh')
        this.router.navigate(['/login'])
      },
      error: err => {
        console.error(err)
        this.router.navigate(['/login'])
      }
    })


  }

  refresh() {
    setTimeout(() => this.refresh(), 60000)
    console.log(this, this.lastRefreshToken)
    const refreshToken = this.lastRefreshToken.getValue()
    this.http.post<{ accessToken: string }>(this.refreshUrl, { refreshToken })
      .subscribe({
        next: response => {
          if (response.accessToken) {
            this.lastAccessToken.next(response.accessToken)
            sessionStorage.setItem('token', response.accessToken)
          }
        }
      })
  }
}


