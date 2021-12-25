import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken');
  }

  setToken(token: string, refreshToken: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  setItem(key:string,data:any){
    localStorage.setItem(key,data);
  }

  getItem(key:string){
    return localStorage.getItem(key);
  }

  removeItem(itemName:string)
  {
    localStorage.removeItem(itemName);
  }
}
