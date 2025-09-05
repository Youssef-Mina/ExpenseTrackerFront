import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ExpenseService } from '../services/expense-service';
import { IncomeService } from '../services/income-service';
import { AuthServices } from '../services/auth-services';



@Component({
  selector: 'app-dashboard',
  
   imports: [
    BaseChartDirective,
  ],
   templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
   userId!: string;

  constructor(
    private expenseService: ExpenseService,
    private incomeService: IncomeService
  ) {}

  ngOnInit(): void {
    // get userId from localStorage
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.userId = userData.id; // 👈 take userId here
    }

    if (this.userId) {
      this.loadCharts();
    }
  }

  loadCharts() {
    // Fetch expenses
    this.expenseService.getAllExpenses(this.userId).subscribe((expenses) => {
      const expenseData = this.aggregateByCategory(expenses);
      this.createChart('expenseChart', 'Expenses', expenseData);
    });

    // Fetch incomes
    this.incomeService.getAllIncomes(this.userId).subscribe((incomes) => {
      const incomeData = this.aggregateByCategory(incomes);
      this.createChart('incomeChart', 'Incomes', incomeData);
    });
  }

  // Helper to merge same categories
  aggregateByCategory(items: any[]): { labels: string[]; values: number[] } {
    const categoryMap = new Map<string, number>();

    items.forEach((item) => {
      const category = item.category;
      const amount = item.amount;
      categoryMap.set(category, (categoryMap.get(category) || 0) + amount);
    });

    return {
      labels: Array.from(categoryMap.keys()),
      values: Array.from(categoryMap.values()),
    };
  }

  // Chart.js function
  createChart(
    canvasId: string,
    label: string,
    data: { labels: string[]; values: number[] }
  ) {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'pie' as ChartType,
      data: {
      
        labels: data.labels,
        datasets: [
          {
            label: label,
            data: data.values,
           
            
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'left' },
          tooltip: {
            callbacks: {
              label: (tooltipItem) =>
                `${tooltipItem.label}: ${tooltipItem.raw} EGP`,
            },
          },
        },
      },
    });
  }
}

//  userId: string = '';

//   // Expenses chart
//   expenseChartLabels: string[] = [];
//   expenseChartData: number[] = [];
//   pieChartType: ChartType = 'pie';
//   pieChartOptions: ChartConfiguration['options'] = {
//     responsive: true,
//     plugins: { legend: { position: 'top' } },
//   };

//   // Incomes chart
//   incomeChartLabels: string[] = [];
//   incomeChartData: number[] = [];
//   incomeChartType: ChartType = 'pie';
//   incomeChartOptions: ChartConfiguration['options'] = {
//     responsive: true,
//     plugins: { legend: { position: 'top' } },
//   };

//   constructor(
//     private expenseService: ExpenseService,
//     private incomeService: IncomeService
//   ) {}

//   ngOnInit(): void {
//     // get user ID from localStorage
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     this.userId = user.id || '';

//     if (!this.userId) {
//       console.error('❌ No user found in localStorage');
//       return;
//     }

//     // --- Expenses ---
//     this.expenseService.getAllExpenses().subscribe({
//       next: (resp: any[]) => {
//         const userExpenses = resp.filter(e => e.userId === this.userId);
//         const totals: Record<string, number> = {};
//         userExpenses.forEach(e => {
//           const cat = e?.category ?? 'Uncategorized';
//           totals[cat] = (totals[cat] || 0) + Number(e?.amount || 0);
//         });

//         this.expenseChartLabels = Object.keys(totals);
//         this.expenseChartData = Object.values(totals);

//         console.log('✅ Expenses Data:', this.expenseChartLabels, this.expenseChartData);
//       },
//       error: err => console.error('❌ Error fetching expenses:', err)
//     });

//     // --- Incomes ---
//     this.incomeService.getAllIncomes().subscribe({
//       next: (resp: any[]) => {
//         const userIncomes = resp.filter(i => i.userId === this.userId);
//         const totals: Record<string, number> = {};
//         userIncomes.forEach(i => {
//           const cat = i?.category ?? 'Uncategorized';
//           totals[cat] = (totals[cat] || 0) + Number(i?.amount || 0);
//         });

//         this.incomeChartLabels = Object.keys(totals);
//         this.incomeChartData = Object.values(totals);

//         console.log('✅ Incomes Data:', this.incomeChartLabels, this.incomeChartData);
//       },
//       error: err => console.error('❌ Error fetching incomes:', err)
//     });
//   }
// }
  //   // Logged-in user ID from localStorage
//   userId: string = '';

// // Expenses chart
//   expenseChartData: ChartData<'pie'> = {
//     labels: [],
//     datasets: [{ data: [] }]
//   };
//   pieChartType: ChartType = 'pie';
//   pieChartOptions: ChartConfiguration['options'] = {
//     responsive: true,
//     plugins: { legend: { position: 'top' } }
//   };

//   // Incomes chart
//   incomeChartData: ChartData<'pie'> = {
//     labels: [],
//     datasets: [{ data: [] }]
//   };
//   incomeChartType: ChartType = 'pie';
//   incomeChartOptions: ChartConfiguration['options'] = {
//     responsive: true,
//     plugins: { legend: { position: 'top' } }
//   };

//   constructor(
//     private expenseService: ExpenseService,
//     private incomeService: IncomeService
//   ) {}

//   ngOnInit(): void {
//     // Get logged-in user ID from localStorage
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     this.userId = user.id || '';

//     if (!this.userId) return;

//     // --- Expenses ---
//     this.expenseService.getAllExpenses().subscribe((resp: any[]) => {
//       const userExpenses = resp.filter(e => e.userId === this.userId);
//       const totals: Record<string, number> = {};
//       userExpenses.forEach(e => {
//         const cat = e?.category ?? 'Uncategorized';
//         totals[cat] = (totals[cat] || 0) + Number(e?.amount || 0);
//       });

//       this.expenseChartData = {
//         labels: Object.keys(totals),
//         datasets: [{ data: Object.values(totals) }]
//       };
//     });

//     // --- Incomes ---
//     this.incomeService.getAllIncomes().subscribe((resp: any[]) => {
//       const userIncomes = resp.filter(i => i.userId === this.userId);
//       const totals: Record<string, number> = {};
//       userIncomes.forEach(i => {
//         const cat = i?.category ?? 'Uncategorized';
//         totals[cat] = (totals[cat] || 0) + Number(i?.amount || 0);
//       });

//       this.incomeChartData = {
//         labels: Object.keys(totals),
//         datasets: [{ data: Object.values(totals) }]
//       };
//     });
//   }

//}