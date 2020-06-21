import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '@angular-xstate-nx-realworld-example-app/shared';
import { AuthService } from './auth.service';
import { RegisterComponent } from './register/register.component';

const authRouting = RouterModule.forChild([
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
]);

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, authRouting, SharedModule],
  providers: [
    AuthGuardService,
    AuthService,
    //TokenInterceptorService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true,
    // },
  ],
  declarations: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
