import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from '../../services/users.service';
import { sha256 } from 'js-sha256';
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showCreateAccount: boolean = false;
  showForgotpassword: boolean = false;
  user: User = {
    fecha_creacion: new Date(),
    activo: true
  };
  constructor(private userService: UsersService, private router: Router) {
  }

  ngOnInit() {
    if(!localStorage.getItem("session")){
      localStorage.removeItem("userdata")
      this.router.navigate(['/login'])
    }else{
      this.router.navigate(['/home'])
    }
  }

  fnShowCreateAccount(key) {
    if (key == 1) {
      this.showCreateAccount = true;
      this.showForgotpassword = false;
    } else {
      this.showCreateAccount = false;
    }
  }
  fnShowForgorPass(key) {
    if (key == 1) {
      this.showForgotpassword = true;
      this.showCreateAccount = false;
    } else {
      this.showForgotpassword = false;
    }
  }

  makeRandom() {
    let lengthOfCode = 15;
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

  createNewuser() {
    if (this.user.usuario == null || this.user.clave == null || this.user.nombre == null) {
      alert("No blank spaces allowed")
    } else {
      this.userService.saveUser(this.user).subscribe(
        res => {
          this.user = {};
          this.user = {
            fecha_creacion: new Date(),
            activo: true
          };
          this.fnShowCreateAccount(0);
          alert("User created succesfully")
        },
        err => alert("Oopss, something is wrong, try again later" + err)
      )

    }
  }

  authUser() {
    if (this.user.usuario == null || this.user.clave == null) {
      alert("Please write an user and password")
    } else {
      this.user.clave = sha256(this.user.clave);
      this.userService.authUser(this.user).subscribe(
        res => {
          this.user = {};
          this.user = {
            fecha_creacion: new Date(),
            activo: true
          };
          // console.log(res)
          if (res[0]) {
            if(res[0].activo){
              localStorage.setItem("userdata",JSON.stringify(res[0]))
              localStorage.setItem("session",this.makeRandom())
              // alert("User logged in")
              this.router.navigate(['/home'])
            }else{
              alert("The user isn't active, contact with the administrator")
            }
          }else{
            alert(" user or password is wrong")
          }
        },
        err => alert("Oopss, something is wrong, try again later" + err)
      )

    }
  }
}
