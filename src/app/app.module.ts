import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthLayoutComponent } from './components/app/layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './components/app/layouts/dashboard-layout/dashboard-layout.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { LoginGuard } from './guards/login.guard';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent, DashboardLayoutComponent, AuthLayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    MatFormFieldModule,
    MatRippleModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  providers: [
    AuthService,
    LocalStorageService,
    LoginGuard,
    AuthInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    HttpClient,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
