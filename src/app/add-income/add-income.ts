import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IncomeService } from '../services/income-service';
import { CanComponentDeactivate } from '../models/can-component-deactivate';

@Component({
  selector: 'app-add-income',
   standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-income.html',
  styleUrl: './add-income.css',
 
})
export class AddIncome implements OnInit , CanComponentDeactivate{
  incomeForm!: FormGroup;
  // currentDate= new Date().getDay();
hasUnSavedChanges=true;
  incomeService=inject(IncomeService);

  
  ngOnInit(): void {
    this.incomeForm = new FormGroup({
      category: new FormControl(null, Validators.required), //same names fel formControlName fel elements eli handa5al fiha dol
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
      comment: new FormControl(null, Validators.required),
      date: new FormControl(null, [
        Validators.required,
        // Validators.max(new Date().getDay()),
      ]),
      
    });
  }

  setIncome() {
    this.incomeForm.setValue({
      category: 'salary',
      amount: 15000,
      comment: 'el sho8l el assasi',
      date: '2025-08-29T14:45',
    });
    
  }

  onSubmit() {
    if(this.incomeForm.invalid){
      this.incomeForm.markAllAsTouched();
      return;
    }
    const incomeData = this.incomeForm.value;

          this.incomeService.addIncome(incomeData).subscribe({
      next: (income) => {
        console.log('Income added:', income);
        alert('income added');
        window.location.reload();
        this.incomeForm.reset();
        this.hasUnSavedChanges = false;
      },
      error: (err) => {
        console.error('Error adding income:', err);
      },
    });
  
}



  incomes=["salary",
      "commission",
      "freelance",
      "investments",
      "miscellaneous",]

  }

      

