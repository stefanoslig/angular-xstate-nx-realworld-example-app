import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ApiModule } from '@angular-xstate-nx-realworld-example-app/api';
import { AuthModule } from '@angular-xstate-nx-realworld-example-app/auth';
import { GraphModule } from '@angular-xstate-nx-realworld-example-app/graph';

@NgModule({
  imports: [
    ApiModule,
    AuthModule,
    BrowserModule,
    GraphModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@angular-xstate-nx-realworld-example-app/home').then(
              (m) => m.HomeModule
            ),
        },
      ],
      {
        initialNavigation: 'enabled',
        useHash: true,
      }
    ),
  ],
  declarations: [AppComponent, FooterComponent, NavbarComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
