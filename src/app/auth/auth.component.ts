import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = false;
  authForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  })

  isLoading: boolean = false;
  errorMessage: string = null;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  submitForm() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    if(this.isLoginMode){
      // ...
    } else {
      this.isLoading = true;
      this.authService.signup(email, password).subscribe(authResponse =>{
        console.log(authResponse);
        this.isLoading = false
      }, error => {
        this.errorMessage = error.message;
        this.isLoading = false;
      })
    }
  }

}
