import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  canActivate(): boolean {
    const user = this.auth.lastUser.getValue()
    if (!user) {
      this.router.navigate(['/login'])
      return false
    }
    return true
  }

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }
}
