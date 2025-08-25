import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/users';

  user = new BehaviorSubject<UserModel | null>(null); // di 3shan at7arak bera7ti fi ay 7eta ka user

  login(email: string, password: string) {
    return this.http.post<any>(`${this.url}/login`, { email, password }).pipe(
      map((response) => {
        if (response.token) {
          const decoded = jwtDecode<any>(response.token);

          const expireDate = new Date(decoded.exp * 1000);

          const loggedInUser = new UserModel(
            decoded.email,
            decoded.id,
            response.token,
            expireDate
          );
          this.user.next(loggedInUser);
          localStorage.setItem('userData', JSON.stringify(loggedInUser)); //3shan n5azen el logged in user fel storage bta3t el browser we should stringfy 3shan hya no3ha obj not json string
          return response.data.user;
        } else {
          throw new Error('Token not found in response');
        }
      }),
      catchError(this.handleError)
    );
  }


  autoLogin(){ 
   const userDataString=localStorage.getItem("userData");
   if(!userDataString) return;
   const userData=JSON.parse(userDataString);

   const loggedUser = new UserModel(
    userData.email,
    userData.id,
    userData._token,
    new Date(userData._expiresIn)
   );

   if(loggedUser.token){
    this.user.next(loggedUser);
   }
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem("userData");
  }

  signup(newUser: any) {
  return this.http.post<any>(`${this.url}/signup`, newUser).pipe(
    map((response) => {
      if (response.token) {
        const decoded = jwtDecode<any>(response.token);
        const expirationDate = new Date(decoded.exp * 1000);
        const loggedInUser = new UserModel(
          decoded.email,
          decoded.id,
          response.token,
          expirationDate
        );
        this.user.next(loggedInUser);
        localStorage.setItem("userData", JSON.stringify(loggedInUser));
 
        return response.data.user;
      } else {
        throw new Error('Token not found in response');
      }
    }),
    catchError(this.handleError)
  );
}




  private handleError(error: any) {
    let errorResponse = {
      status: 'fail',
      message: 'Unknown Error(msh nta eli 7ato elbss!!)',
    };

    if (error.error && error.error.status && error.error.message) {
      errorResponse = {
        status: error.error.status,
        message: error.error.message,
      };
    }
    return throwError(() => errorResponse);
  }


}


