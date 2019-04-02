import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: LoginService, public router: Router) { }
  //ensure the users token is valid
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      console.log("error, user not authed");
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
