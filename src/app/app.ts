import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import{NaviBarHome} from './navi-bar-home/navi-bar-home';
import{MainHome} from './main-home/main-home';
import{FooterHome} from './footer-home/footer-home';

import { CommonModule } from '@angular/common';
import { Signin } from './signin/signin';
import { AuthServices } from './services/auth-services';
import { Signup } from './signup/signup';
import { AddExpense } from './add-expense/add-expense';
import { AddIncome } from './add-income/add-income';

@Component({
  selector: 'app-root',
  imports: [CommonModule,NaviBarHome,FooterHome, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private authservices = inject(AuthServices)
  ngOnInit():void{
    this.authservices.autoLogin();
  }

}
