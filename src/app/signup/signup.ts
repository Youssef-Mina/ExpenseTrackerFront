import { Component, inject, ViewChild } from '@angular/core';
import { AuthServices } from '../services/auth-services';
import { FormsModule, NgForm } from '@angular/forms';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {
private router=inject(Router);
private authService= inject(AuthServices);
selectedFile:File|null=null;
previewUrl: string | null = null;
  @ViewChild('signupForm') signupForm !:NgForm;

  error:string=" ";
  
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      // Preview image
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }


  
  onSubmit(){ 
  
    const{name,email,password, confirmPassword}= this.signupForm.value;
    if(password!==confirmPassword){
       console.log(password);
       console.log(confirmPassword);
  return;
    }
    const fd=new FormData();
    fd.append("name",name);
    fd.append("password",password);
    fd.append("email",email);
    if (this.selectedFile) {
    fd.append('photo', this.selectedFile);
}
    
    this.authService.signup(fd).subscribe({
    next: ( response ) => {
      console.log(response);
     
      
    },
    
    
    error: (err) => {
      console.error(err);
      this.error = err?.error?.message || err.message || 'Signup failed';
    }
  });
    alert("Signup Successfully");
    this.router.navigate(["/home"]);
    console.log(this.signupForm.value);
  
  }

  logout(){
    this.authService.logout();
  }


}
