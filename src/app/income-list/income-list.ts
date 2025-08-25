import { Component, inject, OnInit } from '@angular/core';
import { IncomeService } from '../services/income-service';
import { Income } from '../models/income.model';

@Component({
  selector: 'app-income-list',
  imports: [],
  templateUrl: './income-list.html',
  styleUrl: './income-list.css'
})
export class IncomeList implements OnInit{

  private incomeService=inject(IncomeService);

  incomes:Income[]=[];

  ngOnInit(): void {
  this.loadIncomes();
}

  loadIncomes(){
    this.incomeService.getAllIncomes().subscribe({
      next:(data)=>{
        this.incomes=data;
      }
    })
  }
addIncome(){
  const newIncome: Income ={
    category:"miscellaneous",
    amount:5000,
    comment:"local brand",
    date:"2025-08-16"

  };
  this.incomeService.addIncome(newIncome).subscribe({
    next:(data)=>{
      console.log("Income Added", data);
    }
  })
}

updateIncome(comment:string='monthly salary'){
this.incomeService.updateIncome(comment,{amount:10000}).subscribe({
  next:(data)=>{
    console.log("Income Updated", data);
  }
})
}

deleteIncome(comment:string="local brand"){
  this.incomeService.deleteIncome(comment).subscribe({
    next:(data)=>{
      console.log("Income Deleted", data);
    }
  })
}


}
