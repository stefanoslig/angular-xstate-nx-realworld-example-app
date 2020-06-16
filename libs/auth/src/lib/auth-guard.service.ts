import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    return of(true);
    // return this.storage.getItem().pipe(
    //   map((token) => {
    //     if (!token) {
    //       this.router.navigate(['/login']);
    //       return false;
    //     }
    //     return true;
    //   }),
    //   take(1)
    //);
  }
}
