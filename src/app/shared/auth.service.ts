import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/User.modele';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth$ = new BehaviorSubject<boolean>(false);
    token!: string;
    userId!: string;
    userName!: string;
    userRoles!: Array<any>;
    public supplier$ = new Subject<User[]>();
    constructor(private router: Router,
                private http: HttpClient) {}
                isAuth(){
                  if(this.token!=null) return true;
                  return false;
                }
    createNewUser(firstName: string, lastName: string, email: string, password: string): any {
      console.log(firstName + lastName + email + password);
      return new Promise<void>((resolve, reject) => {
        this.http.post(
          //'http://localhost:8010/api/auth/signup',
          'https://assignmentsbackend.herokuapp.com/api/auth/signup',
          { firstName: firstName, lastName: lastName, email: email, password: password })
          .subscribe(
            () => {
              this.login(email, password).then(
                () => {
                  resolve();
                }
              ).catch(
                (error) => {
                  reject(error);
                }
              );
            },
            (error) => {
              reject(error);
            }
          );
      });
    }
    
    login(email: string, password: string) {
        console.log(email);console.log(password);
      return new Promise<void>((resolve, reject) => {
        this.http.post(
          //'http://localhost:8010/api/auth/login',
          'https://assignmentsbackend.herokuapp.com/api/auth/login',
          { email: email, password: password })
          .subscribe(
            (authData: any) => {
             this.token = authData.token;
              this.userId = authData.userId;
              this.userName = authData.userName;
              this.userRoles = authData.userRoles;
              this.isAuth$.next(true);
              console.log({a:this.token,b:this.userId,c:this.isAuth$,d:this.userName,e:this.userRoles});
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
      });
    }
    logout() {
      this.isAuth$.next(false);
      this.userId = 'null';
      this.token = 'null';
      this.userName = 'null';
      this.router.navigate(['/login']);
    }
    isAdmin(){
      if(!this.userId) return false;
      else{
         if(this.userRoles.indexOf('adminRole') >= 0) return true;
         return false;
      }
    }
    isMerlyUser(){
      if(!this.userId) return false;
      else{
         if(this.userRoles.indexOf('userRole') >= 0) return true;
         return false;
      }
    }
    
}
