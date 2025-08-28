import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-expense',
  imports: [ReactiveFormsModule],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.css',
})
export class AddExpense implements OnInit {
  expenseForm!: FormGroup;

  ngOnInit(): void {
    this.expenseForm = new FormGroup({
      category: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
      date: new FormControl(null, [
        Validators.required,
        Validators.max(new Date().getFullYear()),
      ]),
      comment: new FormControl(null, Validators.required),
    });
  }
setExpense() {
    this.expenseForm.setValue({
      category: 'food',
      amount: 500,
      comment: 'KFC',
      date: '2025-05-01T00:00:00.000+00:00',
    });
    
  }



  onSubmit() {
    console.log(this.expenseForm.value);
  }

  expenses=["food",
      "bills",
      "entertainment",
      "transportation",
      "repairs",
      "medical",
      "rent",
      "education",
      "travel",
      "miscellaneous",]
}
