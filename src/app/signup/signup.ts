import { Component, inject, ViewChild } from '@angular/core';
import { AuthServices } from '../services/auth-services';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
private authService= inject(AuthServices);

  @ViewChild('signupForm') signupForm !:NgForm;

  error:string=" ";
  selectedFile:File|null=null;

  onFileSelected(e:Event){
  const input= e.target as HTMLInputElement;
  this.selectedFile=input.files?.[0]||null;
  }
  matchedPassword:boolean=false;

  onSubmit(){ 
    const{name,email,password, confirmPassword}= this.signupForm.value;
    if(password!==confirmPassword){
  this.matchedPassword=true;
  return;
    }
    const fd=new FormData();
    fd.append("name",name);
    fd.append("password",password);
    fd.append("email",email);
    if(this.selectedFile)fd.append("photo",this.selectedFile);
    this.authService.login(email,password).subscribe({
      next:(token)=>{
        console.log(token);
      },
      error:(err)=>{
        console.log(err);
        this.error=err.message;
      }
    })
    console.log(this.signupForm.value);
  }

  logout(){
    this.authService.logout();
  }


}
