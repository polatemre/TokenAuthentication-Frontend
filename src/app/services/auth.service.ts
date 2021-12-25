import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { TokenModel } from '../components/app/auth/login/model/token-model';
import { LoginUser } from '../components/app/auth/login/model/login-user';
import { RefreshToken } from '../components/app/auth/login/model/refresh-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  isRefreshing: boolean = false;
  refreshToken: string;
  token: TokenModel;
  href: string = '';

  constructor(
    private httpClient: HttpClient,
    private storageService: LocalStorageService,
    private router: Router
  ) {}

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    this.httpClient
      .post<TokenModel>(environment.getApiUrl + '/Auth/login', loginUser, {
        headers: headers,
      })
      .subscribe((data) => {
        console.log(data);

        if (data.success) {
          this.storageService.setToken(data.data.token, data.data.refreshToken);

          var decode = this.jwtHelper.decodeToken(
            this.storageService.getToken()
          );

          var propUserName = Object.keys(decode).filter((x) =>
            x.endsWith('/name')
          )[0];
          // this.userName = decode[propUserName];
          // this.sharedService.sendChangeUserNameEvent();

          this.router.navigateByUrl('/dashboard');
        } else {
          console.log(data.message);
        }
      });
  }

  createRefreshToken() {
    new Promise((resolve, reject) => {
      // if (
      //   this.storageService.getRefreshToken() == null ||
      //   this.storageService.getRefreshToken() == undefined
      // ) {
      //   return false;
      // }

      this.getRefreshToken(this.storageService.getRefreshToken()).subscribe(
        (data) => {

          this.token == null;
          // console.log("createRefreshToken'a girdi");
          console.log(this.storageService.getRefreshToken());

          if (data != null && data.success) {
            this.token = data;
            console.log(this.token);
          } else {
            console.log('refresh token error');
            reject(false);
            // return;
          }

          if (this.token == undefined) {
            console.log('token undefined');
            reject(false);
            // return;
          }

          // console.log('createRefreshToken Success');

          this.storageService.setToken(
            this.token.data.token,
            this.token.data.refreshToken
          );

          var decode = this.jwtHelper.decodeToken(
            this.storageService.getToken()
          );

          var propUserName = Object.keys(decode).filter((x) =>
            x.endsWith('/name')
          )[0];
          // this.userName = decode[propUserName];
          // this.sharedService.sendChangeUserNameEvent();

          this.router.navigateByUrl('/dashboard');
          resolve(true);
        }
      );
    });
  }

  loggedIn(): boolean {
    // console.log('loggedin girildi...');

    let isExpired = this.jwtHelper.isTokenExpired(
      this.storageService.getToken()
    );

    // console.log('loggedIn: ' + !isExpired);
    return !isExpired;
  }

  getRefreshToken(refreshToken: string) {
    let refreshTokenModel: RefreshToken = new RefreshToken();
    refreshTokenModel.refreshToken = refreshToken;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.httpClient.post<TokenModel>(
      environment.getApiUrl + '/Auth/RefreshTokenLogin',
      refreshTokenModel,
      {
        headers: headers,
      }
    );
  }

  logOut() {
    this.storageService.removeToken();
  }
}
