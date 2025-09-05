import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthServices } from '../services/auth-services';
import { IncomeService } from '../services/income-service';
import { ExpenseService } from '../services/expense-service';
import { Expense } from '../models/expense.model';
import { Income } from '../models/income.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-mytracker',
  imports: [RouterModule ,RouterOutlet,RouterLinkActive,CommonModule],
  templateUrl: './mytracker.html',
  styleUrl: './mytracker.css'
})
export class Mytracker implements OnInit{
expenses: Expense[] = [];
  incomes: Income[] = [];
  totalExpenses = 0;
  totalIncomes = 0;

  constructor(private expenseService: ExpenseService, private authService:AuthServices, private incomeService:IncomeService) {}

  
    ngOnInit(): void {
      
      this.expenseService.getAllExpenses().subscribe((data) => {
      this.expenses = data;
      this.totalExpenses = this.expenses.reduce(
        (sum, e) => sum + e.amount,
        0
      );
    });

    // ✅ fetch incomes
    this.incomeService.getAllIncomes().subscribe((data) => {
      this.incomes = data;
      this.totalIncomes = this.incomes.reduce(
        (sum, i) => sum + i.amount,
        0
      );
    });
  }

  get netBalance() {
    return this.totalIncomes - this.totalExpenses;
  }

}