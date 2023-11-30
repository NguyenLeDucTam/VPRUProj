export class User{
  userName:any =null;
  userPassword:any =null;

  constructor(name?: string, password?: string){
    this.userName=name;
    this.userPassword=password;
  }
}

