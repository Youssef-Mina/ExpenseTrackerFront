import { inject, Injectable } from '@angular/core';
import { AuthServices } from './auth-services';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authservice=inject(AuthServices);
  private http=inject(HttpClient);
  private url='http://localhost:3000/users';

}
