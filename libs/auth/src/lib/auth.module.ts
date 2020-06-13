import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthGuardService } from './auth-guard.service';
import { LocalStorageJwtService } from './local-storage-jwt.service';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorService } from './token-interceptor.service';

const authRouting = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent,
  },
  //   {
  //     path: 'register',
  //     component: RegisterComponent,
  //   },
]);

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, authRouting],
  providers: [
    AuthGuardService,
    TokenInterceptorService,
    LocalStorageJwtService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  declarations: [LoginComponent],
})
export class AuthModule {}
