import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Income } from '../models/income.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private http=inject(HttpClient);

  private url="http://localhost:3000/incomes";

  getAllIncomes():Observable<Income[]>{

    return this.http.get<any>(this.url).pipe(map((response)=>{
      return response.data.income
    }));
  }


  addIncome(income:Income):Observable<Income>{
    return this.http.post<any>(this.url, income).pipe(map((response)=>{
      return response.data.income;
    }))
  }

  updateIncome(comment:string, updatedData:Partial<Income>): Observable<Income>{
return this.http.patch<any>(`${this.url}/${comment}`, updatedData).pipe(map((response)=>{
  return response.data.income;
}))
  }
  
  deleteIncome(comment:string): Observable<Income>{
return this.http.delete<any>(`${this.url}/${comment}`).pipe(map((response)=>{
  return response.data.income;
}))
  }


}
