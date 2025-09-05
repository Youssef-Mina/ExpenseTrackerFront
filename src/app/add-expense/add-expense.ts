import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExpenseService } from '../services/expense-service';
import { CanComponentDeactivate } from '../models/can-component-deactivate';

@Component({
  selector: 'app-add-expense',
  imports: [ReactiveFormsModule],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.css',
})
export class AddExpense implements OnInit, CanComponentDeactivate {
  expenseForm!: FormGroup;
  // currentDate= new Date().getDay();
  hasUnSavedChanges=true;
expenseService=inject(ExpenseService);

  ngOnInit(): void {
    this.expenseForm = new FormGroup({
      category: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
      comment: new FormControl(null, Validators.required),
      date: new FormControl(null, [
        Validators.required,
        // Validators.max(new Date().getDay()),
      ]),
      
    });
  }

  
  onSubmit() {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      return;
    }
    const expenseData = this.expenseForm.value;

     
          this.expenseService.addExpense(expenseData).subscribe({
      next: (expense) => {
        console.log('Expense added:', expense);
        alert('expense added');
        window.location.reload();
        this.expenseForm.reset();
        this.hasUnSavedChanges = false;
      },
      error: (err) => {
        console.error('Error adding expense:', err);
      },
    });
     
  }

  setExpense() {
    this.expenseForm.setValue({
      category: 'food',
      amount: 500,
      comment: 'KFC',
      date: '2025-08-29T14:45',
    });
  }


  expenses = [
    'food',
    'bills',
    'entertainment',
    'transportation',
    'repairs',
    'medical',
    'rent',
    'education',
    'travel',
    'miscellaneous',
  ];
}
