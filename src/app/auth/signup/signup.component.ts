import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  loading = false;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    // this.state.mode$.next('form');
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required]
    });
  }

  onSignup() {
    this.loading = true;
    const email:string = this.signupForm.get('email')?.value;//value
    const password = this.signupForm.get('password')?.value;
    
    const firstName:string = this.signupForm.get('firstName')?.value;
    const lastName = this.signupForm.get('lastName')?.value;
    this.auth.createNewUser(firstName, lastName, email, password).then(
      () => {
        this.loading = false;   
        this.router.navigate(['/assignments']);    
      }
    ).catch(
      (error:any) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }
}
