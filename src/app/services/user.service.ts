import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../components/admin/user/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserList(): Observable<User[]> {

    return this.httpClient.get<User[]>(environment.getApiUrl + "/users/getall");

  }

  getUserById(id: number): Observable<User> {

    return this.httpClient.get<User>(environment.getApiUrl + "/users/getbyid?userId=" + id);
  }

}
