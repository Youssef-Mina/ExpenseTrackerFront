import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  
  private http=inject(HttpClient);

  private url ="http://localhost:3000/expenses";

  getAllExpenses(): Observable<Expense[]>{
  
    return this.http.get<any>(this.url).pipe(map((response)=>{
      return response.data.expense
    }));
  }

  addExpense(expense:Expense):Observable<Expense>{
    return this.http.post<any>(this.url, expense).pipe(map((response)=>{
      return response.data.expense;
    }))
  }

  updateExpense(comment:string, updatedData:Partial<Expense>): Observable<Expense>{
return this.http.patch<any>(`${this.url}/${comment}`, updatedData).pipe(map((response)=>{
  return response.data.expense;
}))
  }

  deleteExpense(comment:string): Observable<Expense>{
return this.http.delete<any>(`${this.url}/${comment}`).pipe(map((response)=>{
  return response.data.expense;
}))
  }


}
