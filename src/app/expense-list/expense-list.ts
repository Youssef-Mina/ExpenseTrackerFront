import { Component, inject, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense-service';
import { Expense } from '../models/expense.model';

@Component({
  selector: 'app-expense-list',
  imports: [],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css'
})
export class ExpenseList implements OnInit{

private expenseService = inject(ExpenseService);

expenses:Expense[]=[];

ngOnInit(): void {
  this.loadExpenses();
}
loadExpenses(){
  this.expenseService.getAllExpenses().subscribe({
    next:(data)=>{
      this.expenses=data;
    }
  })
}

addExpense(){
  const newExpense: Expense ={
    category:"entertainment",
    amount:300,
    comment:"5oroga",
    date:"2025-08-16"

  };
  this.expenseService.addExpense(newExpense).subscribe({
    next:(data)=>{
      console.log("Expense Added", data);
    }
  })
}

updateExpense(comment:string="el shbab"){
 this.expenseService.updateExpense(comment,{amount:900}).subscribe({
  next:(data)=>{
    console.log("Expense Updated",data)
  }
 })
}

deleteExpense(comment:string="5oroga"){
  this.expenseService.deleteExpense(comment).subscribe({
    next:(data)=>{
      console.log("Expense Deleted", data)
    }
  })

}
}
