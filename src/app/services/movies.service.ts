import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Movie} from '../models/movie';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  API_URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get(`${this.API_URI}/peliculas`)
  }

  getMovie(id: Number) {
    return this.http.get(`${this.API_URI}/peliculas/${id}`)
  }

  saveMovie(movie: Movie) {
    return this.http.post(`${this.API_URI}/peliculas`, movie);
  }

  deleteMovie(id: Number) {
    return this.http.delete(`${this.API_URI}/peliculas/${id}`);
  }

  updateMovie(id: Number, updatedMovie: Movie): Observable<Movie> {
    return this.http.put(`${this.API_URI}/peliculas/${id}`, updatedMovie);
  }

  buyMovie(movie: Movie){
    return this.http.put(`${this.API_URI}/peliculas/${movie.id}`, movie);
  }
}
