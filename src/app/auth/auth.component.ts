import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  submitForm() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    this.isLoading = true;
    let authObservable = null;

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password)
    } else {
      authObservable = this.authService.signup(email, password);
    }

    authObservable.subscribe(authResponse => {
      console.log(authResponse);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, error => {
      this.isLoading = false;
      this.errorMessage = error;
    })

  }

}
