import { Component, inject, ViewChild } from '@angular/core';
import { AuthServices } from '../services/auth-services';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [FormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class Signin {

  private authService= inject(AuthServices);

  @ViewChild('signinForm') signinForm !:NgForm;

  error:string=" ";
  onSubmit(){ 
    const{email,password}= this.signinForm.value;
    this.authService.login(email,password).subscribe({
      next:(token)=>{
        console.log(token);
      },
      error:(err)=>{
        console.log(err);
        this.error=err.message;
      }
    })
    console.log(this.signinForm.value);
  }

  logout(){
    this.authService.logout();
  }

}
