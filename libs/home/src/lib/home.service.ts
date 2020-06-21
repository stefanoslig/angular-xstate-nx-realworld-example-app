import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@angular-xstate-nx-realworld-example-app/api';

@Injectable()
export class HomeService {
  constructor(private apiService: ApiService) {}

  getTags(): Observable<{ tags: string[] }> {
    return this.apiService.get('/tags');
  }
}
