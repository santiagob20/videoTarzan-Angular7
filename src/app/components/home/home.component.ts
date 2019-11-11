import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DashboardComponent } from '../../dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(DashboardComponent) dashboard;
  user: User;
  showHome: boolean = true;
  showCatalogue: boolean = false;
  showEditMovies: boolean = false;
  showEditUsers: boolean = false;
  dataMovies:any="data";
  constructor(private router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem("session")) {
      localStorage.removeItem("userdata")
      this.router.navigate(['/login'])
    } else {
      this.user = JSON.parse(localStorage.getItem("userdata"))
      // console.log(this.user)
    }
  }
  logout() {
    localStorage.removeItem("userdata")
    localStorage.removeItem("session")
    this.router.navigate(['/login'])
  }

  navigate(id) {
    console.log(id)
    switch (id) {
      case 1: {
        console.log("entra caso 1")
        this.showHome = true;
        this.showCatalogue = false;
        this.showEditMovies = false;
        this.showEditUsers = false;
        break;
      }
      case 2: {
        console.log("entra caso 2")
        this.showHome = false;
        this.showCatalogue = true;
        this.showEditMovies = false;
        this.showEditUsers = false;
        break;
      }
      case 3: {
        console.log("entra caso 3")
        this.showHome = false;
        this.showCatalogue = false;
        this.showEditMovies = true;
        this.showEditUsers = false;
        break;
      }
      case 4: {
        console.log("entra caso 4")
        this.showHome = false;
        this.showCatalogue = false;
        this.showEditMovies = false;
        this.showEditUsers = true;
        break;
      }
    }

  }

}
