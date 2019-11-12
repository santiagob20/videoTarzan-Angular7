import { Component, OnInit, ɵConsole } from '@angular/core';
import { UsersService } from '../services/users.service';
import { sha256 } from 'js-sha256';
import { User } from '../models/user';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {

  user:User;
  listUsers:any;
  showCardEdit:boolean= false;
  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(
      res => {
        this.listUsers = res;

      },
      err => alert("Oopss, something is wrong, try again later" + err)
    )
  }

  editUser(user:User){
    if(user.nombre==""||user.usuario==""||user.clave==""){
      alert("No blank spaces allowed")
    }else{
      user.clave = sha256(user.clave);
      this.userService.updateUser(user.id,user).subscribe(
        res => {
          this.user = {};
          alert("User updated succesfully")
          this.getUsers();
          this.showCardEdit=false;

        },
        err => alert("Oopss, something is wrong, try again later" + err)
      )
    }
  }

  showUserforEdit(id){
    // alert(id)
    this.userService.getUser(id).subscribe(
      res => {
        this.user = res;
        this.showCardEdit=true;
      },
      err => alert("Oopss, something is wrong, try again later" + err)
      )

  }

  deleteUser(id){
    // alert(id)
    this.userService.deleteUser(id).subscribe(
      res => {
        this.getUsers()
        alert("User deleted succesfully")
      },
      err => alert("Oopss, something is wrong, try again later" + err)
    )
  }
}
