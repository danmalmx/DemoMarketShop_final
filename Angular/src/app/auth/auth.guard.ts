import { UserService } from './../shared/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private service: UserService) {  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('token') != null) {
        const roles = next.data.permittedRoles as Array<string>;
        if (roles) {
          if (this.service.roleMatch(roles)) {
            return true;
          } else {
            this.router.navigate(['/forbidden']);
          }
        }
        return true;
      }
      else {
        this.router.navigate(['/user/login']);
        return false;
      }
    }
}
