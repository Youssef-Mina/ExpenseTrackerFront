import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-income',
   standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-income.html',
  styleUrl: './add-income.css',
 
})
export class AddIncome implements OnInit {
  incomeForm!: FormGroup;

  ngOnInit(): void {
    this.incomeForm = new FormGroup({
      category: new FormControl(null, Validators.required), //same names fel formControlName fel elements eli handa5al fiha dol
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
      comment: new FormControl(null, Validators.required),
      date: new FormControl(null, [
        Validators.required,
        Validators.max(new Date().getFullYear()),
      ]),
      
    });
  }

  setExpense() {
    this.incomeForm.setValue({
      category: 'salary',
      amount: 15000,
      comment: 'el sho8l el assasi',
      date: '2025-06-01T00:00:00.000+00:00',
    });
    
  }

  onSubmit() {
    console.log(this.incomeForm.value);
  }

  incomes=["salary",
      "commission",
      "freelance",
      "investments",
      "miscellaneous",]
}

