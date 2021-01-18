export class App {
  email = '';
   password = '';

   apply() {
      const myUser = { email: this.email, password: this.password }
      console.log(myUser);
   }
}
