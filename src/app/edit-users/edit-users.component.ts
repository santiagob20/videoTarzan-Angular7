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

  editUser(){
    if(false){
      console.log("123")
    }else{
      this.userService.updateUser(this.user.id,this.user).subscribe(
        res => {
          this.user = {};
          alert("User updated succesfully")
        },
        err => alert("Oopss, something is wrong, try again later" + err)
      )
    }
  }

  showUserforEdit(id){
    alert(id)
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
