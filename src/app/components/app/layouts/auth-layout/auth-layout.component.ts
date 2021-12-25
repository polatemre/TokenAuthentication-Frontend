import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements AfterViewInit, OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

  }
}
