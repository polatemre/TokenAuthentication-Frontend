import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!request.url.endsWith("api/Auth/login") && !request.url.endsWith("api/Auth/RefreshTokenLogin")) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        responseType: request.method == "DELETE" ? "text" : request.responseType

      });
      console.log(request);
    }

    return next.handle(request);
  }
}
