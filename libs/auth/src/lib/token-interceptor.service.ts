import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthMachineService } from './+xstate/auth-machine.config';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authMachineService: AuthMachineService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: string;
    //this.localStorage.getItem().subscribe((t) => (token = t));
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
