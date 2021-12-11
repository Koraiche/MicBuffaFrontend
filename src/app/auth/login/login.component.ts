import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  errorMessage?: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    // this.state.mode$.next('form');
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onLogin() {
    this.loading = true;
      
    const email:any = this.loginForm.get('email')?.value;//.value !!!!
      
    
    
    const password:any = this.loginForm.get('password')?.value;
    this.auth.login(email, password);
    /*
    this.auth.loginOnServer(email, password).then(
      () => {
        this.loading = false;
        this.router.navigate(['/']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );*/
  }

}
