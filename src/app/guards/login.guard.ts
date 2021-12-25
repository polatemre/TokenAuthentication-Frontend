import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: LocalStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      let result = false;

      this.checkRefreshToken()
        .then((res: boolean) => {
          // console.log('checkrefreshtoken');
          result = res;
        })
        .catch((err) => {
          result = err;
        });

      if (result) {
        return true;
      } else {
        this.router.navigate(['auth']);
        this.authService.logOut();
        return false;
      }
    }
  }

  checkRefreshToken() {
    return new Promise((resolve, reject) => {
      if (this.storageService.getRefreshToken() != null) {
        // console.log('1');
        // if (this.token != undefined) {
        //   console.log("2");
        //   if (
        //     this.storageService.getRefreshToken() != this.token.data.refreshToken
        //   ) {
        //     console.log("3");
        //     if (this.createRefreshToken()) {
        //       console.log("6")
        //       console.log("loggedIn: truuuuuuu")
        //       return true;
        //     }
        //   }
        // } else {

        this.authService.createRefreshToken();

        if (this.authService.token != null) {
          // console.log('5');
          // console.log('tokenn' + this.authService.token);
          // console.log('loggedIn: truuuuuuu');
          resolve(true);
          // return true;
        } else {
          console.log('createRefreshToken Hata');
          reject(false);
          // return false;
          // this.router.navigateByUrl('/auth');
        }
        // }
      } else {
        reject(false);
        // return false;
      }
    });
  }
}
