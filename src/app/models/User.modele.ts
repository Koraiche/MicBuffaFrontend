export class User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: [];
    constructor(){
      this._id='0';
      this.firstName = '';
      this.lastName = "";
      this.email = "";
      this.password = "";
      this.roles = [];
    }
  }