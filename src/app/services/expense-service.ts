import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { exhaustMap, map, Observable, take } from 'rxjs';
import { Expense } from '../models/expense.model';
import { AuthServices } from './auth-services';
@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private http = inject(HttpClient);
  private authServices = inject(AuthServices);

  private url = 'http://localhost:3000/expenses';

  getAllExpenses(userId?: string): Observable<Expense[]> {
    return this.authServices.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          Authorization:`Bearer ${user?.token}`
        });
        return this.http.get<any>(this.url, {headers}).pipe(
      map((response) => {
        return response.data.expenses;
      })
    );
      })
    );
    
  }
  addExpense(expense: FormData): Observable<Expense> {
  return this.authServices.user.pipe(
    take(1),
    exhaustMap((user) => {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${user?.token}`
      });

      return this.http.post<any>(this.url, expense, { headers }).pipe(
        map((response) => {
          return response.data.expense;
        })
      );
    })
  );
}


  

  updateExpense(id: string, updatedData: any): Observable<Expense> {
  return this.authServices.user.pipe(
    take(1),
    exhaustMap((user) => {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${user?.token}`,
      });

      return this.http.patch<any>(`${this.url}/${id}`, updatedData, { headers }).pipe(
        map((response) => {
          return response.data.expense; // adjust if backend returns differently
        })
      );
    })
  );
}

  deleteExpense(id: string): Observable<any> {
    return this.authServices.user.pipe(
      take(1),
      exhaustMap((user) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${user?.token}`,
        });

        return this.http.delete<any>(`${this.url}/${id}`, { headers }).pipe(
          map((response) => {
            return response.data.expense;
          }) // adjust based on your backend response
        );
      })
    );
  }


  getExpenseById(id: string | null): Observable<Expense> {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      map((response) => {
        return response.data.expense;
      })
    );
  }
}

// addExpense(expense: FormData): Observable<Expense> {
  //   return this.http.post<any>(this.url, expense).pipe(
  //     map((response) => {
  //       return response.data.expense;
  //     })
  //   );
  // }
