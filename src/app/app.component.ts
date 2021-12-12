import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  titre = 'Application de gestion des assignments';
  title = 'frontEnd';
  user: string = 'Login';
  constructor(private authService:AuthService,
              private assignmentsService:AssignmentsService,
              private router:Router) {}

  loginLogout() {
    //if(this.authService.loggedIn) {
    //  this.authService.logOut();
    //} else {
    //  this.authService.logIn();
   // }
  }
  getUser(){
    return  this.authService.userName;
    
    
  }
  isAuth(){
    //if(this.user) return true;
    // return false;
    
    return this.authService.isAuth();
  }
  logOut(){
    this.authService.logout();
  }
  isAgent(){
    return this.authService.isAdmin();
  }
  

  
}
