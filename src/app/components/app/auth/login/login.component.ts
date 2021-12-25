import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginUser } from './model/login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUser: LoginUser = new LoginUser();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if(this.authService.loggedIn){
      this.router.navigate(['dashboard']);
    }
  }

  login() {
    this.authService.login(this.loginUser);
  }
}
