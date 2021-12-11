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
  usersHeroku:User[] = [];
  loggedHeroku = false;
  userRolesHeroku?:any[];
  userHeroku? :User;
    token!: string;
    userId!: string;
    userName: string='X';
    userRoles!: Array<any>;
    public supplier$ = new Subject<User[]>();
    constructor(private router: Router,
                private http: HttpClient) {
                  let u1  = new User('Michel','Buffa','Mic@gmail.com','123456789');
                  u1.roles.push('adminRole');//admin
                  let u2  = new User('Fahd','Koraiche','Naoufel@gmail.com','123456789');//user
                  
                  this.usersHeroku!.push(u1);
                  this.usersHeroku!.push(u2);
                  
                }
                isAuth(){/*
                  if(this.token!=null) return true;
                  return false;*/
                  if(this.loggedHeroku)return true;
                  return false;
                }
    createNewUserOnServer(firstName: string, lastName: string, email: string, password: string): any {
      console.log(firstName + lastName + email + password);
      return new Promise<void>((resolve, reject) => {
        this.http.post(
          //'http://localhost:8010/api/auth/signup',
          'https://assignmentsbackend.herokuapp.com/api/auth/signup',
          { firstName: firstName, lastName: lastName, email: email, password: password })
          .subscribe(
            () => {
              this.loginOnServer(email, password).then(
                () => {
                  resolve();
                }
              ).catch(
                (error:any) => {
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
    createNewUser(firstName: string, lastName: string, email: string, password: string): any {
      this.usersHeroku.push(new User(firstName=firstName,lastName=lastName,email=email,password=password))
    }
    login(email: string, password: string) {
        this.usersHeroku.forEach(element => {
          if(element.email==email && element.password==password){
            console.log(element);
            this.userHeroku= element;
            this.userName = element.firstName + ' ' + element.lastName;
            this.loggedHeroku= true;
            this.userRolesHeroku = element.roles;
            this.isAuth$.next(true);
            return;
          }
        });

    }
    loginOnServer(email: string, password: string) {
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
      this.userName = 'X';
      this.loggedHeroku = false;
      this.userHeroku = undefined;
      this.router.navigate(['/login']);
    }
    isAdmin(){
      /*if(!this.userId) return false;
      else{
         if(this.userRolesHeroku.indexOf('adminRole') >= 0) return true;
         return false;
      }*/
      if(this.isAuth() &&this.userRolesHeroku!.indexOf('adminRole') >= 0) return true;
      return false;
    }
    isMerlyUser(){
      /*if(!this.userId) return false;
      else{
         if(this.userRoles.indexOf('userRole') >= 0) return true;
         return false;
      }*/
      if(this.isAuth() && this.userRolesHeroku!.indexOf('adminRole') >= 0) return true;
      return false;
    }
    
}
