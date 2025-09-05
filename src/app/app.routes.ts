import { Routes } from '@angular/router';
import { MainHome } from './main-home/main-home';
import { Mytracker } from './mytracker/mytracker';
import { Contact } from './contact/contact';
import { Dashboard } from './dashboard/dashboard';
import { Signin } from './signin/signin';
import { Signup } from './signup/signup';
import { NotFound } from './not-found/not-found';
import { authGuard } from './guards/auth-guard';
import { authChildGuard } from './guards/auth-child-guard';
import { unsavedChangesGuard } from './guards/unsaved-changes-guard';
import { ExpenseList } from './expense-list/expense-list';
import { IncomeList } from './income-list/income-list';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainHome, title: 'Home' },
  { path: 'signin', component: Signin, title: 'Login' },
   { path: 'signup', component: Signup, title: 'signup' },
  {
    path: 'mytracker',
    component: Mytracker,
    canActivate: [authGuard],
    canActivateChild: [authChildGuard],
    // canDeactivate:[unsavedChangesGuard],
    title: 'MyTracker',
   
    children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard, title: 'Dashboard' },
      { path: 'expenselist', component: ExpenseList, title: 'Your Expenses' },
    { path: 'incomelist', component: IncomeList, title: 'Your Incomes' },
    ],
  },
  { path: 'contact', component: Contact, title: 'Contact Us' },
  { path: 'home/signin', component: Signin, title: 'Login' },
  { path: 'home/signup', component: Signup, title: 'Signup' },
  { path: '**', component: NotFound, title: 'Not Found' },
];
