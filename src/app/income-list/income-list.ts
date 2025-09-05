import { Component, inject, OnInit } from '@angular/core';
import { IncomeService } from '../services/income-service';
import { DatePipe, CommonModule } from '@angular/common';
import { Income } from '../models/income.model';
import * as XLSX from 'xlsx';
import { AddIncome } from '../add-income/add-income';
import { HttpClient} from '@angular/common/http';
import { AuthServices } from '../services/auth-services';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-income-list',
  imports: [DatePipe, CommonModule, AddIncome,FormsModule],
  templateUrl: './income-list.html',
  styleUrl: './income-list.css'
})
export class IncomeList implements OnInit{
showAddIncome=false;
  private incomeService=inject(IncomeService);
  selectedIncome: any = null;
  showEditIncome = false;

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
// addIncome(){
//   const newIncome: FormData ={

//   };
//   this.incomeService.addIncome(newIncome).subscribe({
//     next:(data)=>{
//       console.log("Income Added", data);
//     }
//   })
// }

// updateIncome(id:string){
// this.incomeService.updateIncome(id,{amount:10000}).subscribe({
//   next:(data)=>{
//     console.log("Income Updated", data);
//   }
// })
// }
openEditModal(income: any) {
  this.selectedIncome = { ...income }; // clone to avoid direct mutation
  this.showEditIncome = true;
}

closeEditModal() {
  this.selectedIncome = null;
  this.showEditIncome = false;
}

saveEditIncome() {
  if (!this.selectedIncome?._id) return;

  this.incomeService.updateIncome(this.selectedIncome._id, this.selectedIncome).subscribe({
    next: () => {
      alert('Income updated successfully');
      window.location.reload(); // refresh list
      this.closeEditModal();
    },
    error: (err) => {
      console.error('Update failed:', err);
      alert('Failed to update income');
    },
  });
}



deleteIncome(id: string) {
  this.incomeService.deleteIncome(id).subscribe({
    next: (res) => {
      console.log('Income deleted:', res);
      alert('Income deleted successfully');
       window.location.reload();
    },
    error: (err) => {
      console.error('Error deleting income:', err);
      alert('Failed to delete income');
    },
  });
}

exportToExcel() {
  // pick only the needed fields
  const exportData = this.incomes.map(i => ({
    Category: i.category,
    Comment: i.comment,
    Date: new Date(i.date).toLocaleString(), // formatted date & time
    Amount:` ${i.amount} EGP`,
  }));

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
  const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  XLSX.writeFile(workbook, 'incomes.xlsx');
}

}
