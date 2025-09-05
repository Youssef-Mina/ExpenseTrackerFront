import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { exhaustMap, map, Observable, take } from 'rxjs';
import { Income } from '../models/income.model';
import { AuthServices } from './auth-services';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  private http = inject(HttpClient);
  private authServices = inject(AuthServices);

  private url = 'http://localhost:3000/incomes';

  getAllIncomes(userId?: string): Observable<Income[]> {
    return this.authServices.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${user?.token}`,
        });
        return this.http.get<any>(this.url, { headers }).pipe(
          map((response) => {
            return response.data.incomes;
          })
        );
      })
    );
  }

  addIncome(income: FormData): Observable<Income> {
    return this.authServices.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${user?.token}`,
        });

        return this.http.post<any>(this.url, income, { headers }).pipe(
          map((response) => {
            return response.data.income;
          })
        );
      })
    );
  }

  updateIncome(id: string, updatedData: any): Observable<Income> {
  return this.authServices.user.pipe(
    take(1),
    exhaustMap((user) => {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${user?.token}`,
      });

      return this.http.patch<any>(`${this.url}/${id}`, updatedData, { headers }).pipe(
        map((response) => {
          return response.data.income; // adjust if backend returns differently
        })
      );
    })
  );
}

  deleteIncome(id: string): Observable<any> {
    return this.authServices.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${user?.token}`,
        });

        return this.http.delete<any>(`${this.url}/${id}`, { headers }).pipe(
          map((response) => {
            return response.data.income;
          }) // adjust based on your backend response
        );
      })
    );
  }

  getIncomeById(id: string | null): Observable<Income> {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      map((response) => {
        return response.data.expense;
      })
    );
  }
}

// addIncome(income:FormData):Observable<Income>{
//   return this.http.post<any>(this.url, income).pipe(map((response)=>{
//     return response.data.income;
//   }))
// }
