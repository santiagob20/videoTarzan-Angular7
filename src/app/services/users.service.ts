import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { sha256 } from 'js-sha256';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  API_URI = 'http://localhost:3000';
  constructor(private http: HttpClient) {

  }

  getUsers() {
    return this.http.get(`${this.API_URI}/usuarios`)
  }

  getUser(id: Number) {
    return this.http.get(`${this.API_URI}/usuarios/${id}`)
  }

  saveUser(user: User) {
    user.clave = sha256(user.clave);
    return this.http.post(`${this.API_URI}/usuarios`, user);
  }

  deleteUser(id: Number) {
    return this.http.delete(`${this.API_URI}/usuarios/${id}`);
  }

  updateUser(id: Number, updatedUser: User): Observable<User> {
    return this.http.put(`${this.API_URI}/usuarios/${id}`, updatedUser);
  }

  authUser(user:User){
    return this.http.get(`${this.API_URI}/usuarios?usuario=${user.usuario}&clave=${user.clave}`)
  }
}
