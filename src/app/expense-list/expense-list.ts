import { Component, inject, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense-service';
import { DatePipe, CommonModule } from '@angular/common';
import { Expense } from '../models/expense.model';
import * as XLSX from 'xlsx';
import { AddExpense } from '../add-expense/add-expense';
import { HttpClient } from '@angular/common/http';
import { AuthServices } from '../services/auth-services';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-expense-list',
  imports: [DatePipe, CommonModule, AddExpense,FormsModule],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css'
})
export class ExpenseList implements OnInit{
  
  
selectedExpense: any = null;
  showEditExpense = false;
showAddExpense = false;
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

// addExpense(){
//   const newExpense: Expense ={
//     category:"entertainment",
//     amount:300,
//     comment:"5oroga",
//     date:"2025-08-16"

//   };
//   this.expenseService.addExpense(newExpense).subscribe({
//     next:(data)=>{
//       console.log("Expense Added", data);
//     }
//   })
// }

// updateExpense(id: string, updatedData: Partial<Expense>) {
//   return this.http.patch(`${this.url}/expenses/${id}`, updatedData);
// }
openEditModal(expense: any) {
  this.selectedExpense = { ...expense }; // clone to avoid direct mutation
  this.showEditExpense = true;
}

closeEditModal() {
  this.selectedExpense = null;
  this.showEditExpense = false;
}

saveEditExpense() {
  if (!this.selectedExpense?._id) return;

  this.expenseService.updateExpense(this.selectedExpense._id, this.selectedExpense).subscribe({
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



deleteExpense(id: string) {
  this.expenseService.deleteExpense(id).subscribe({
    next: (res) => {
      console.log('Expense deleted:', res);
      alert('Expense deleted successfully');
       window.location.reload();
    },
    error: (err) => {
      console.error('Error deleting expense:', err);
      alert('Failed to delete expense');
    },
  });
}

exportToExcel() {
  // pick only the needed fields
  const exportData = this.expenses.map(e => ({
    Category: e.category,
    Comment: e.comment,
    Date: new Date(e.date).toLocaleString(), // formatted date & time
    Amount:` ${e.amount} EGP`,
  }));

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
  const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  XLSX.writeFile(workbook, 'expenses.xlsx');
}
}
