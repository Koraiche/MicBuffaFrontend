export class User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: string[] = [];

    constructor(fn:string, ln:string,em:string,pwd:string){
      this._id='0';
      this.firstName = fn;
      this.lastName = ln;
      this.email = em;
      this.password = pwd;
      this.roles.push('userRole');
    }
  }
  