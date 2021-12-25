import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
})
export class DashboardLayoutComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  isLoggedIn(): boolean {
    return this.authService.loggedIn();
  }

}
