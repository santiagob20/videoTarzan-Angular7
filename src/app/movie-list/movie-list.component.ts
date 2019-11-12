import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movies: any = [];
  movie: Movie;
  Curmovie: Movie;
  // currentMovie: Movie;
  availableStock: boolean = true;
  constructor(private movieService: MoviesService) {
    this.movieService.getMovies().subscribe(
      res => { this.movies = res },
      err => console.error(err)
    )
  }


  ngOnInit() {
    this.getMovies()
  }

  getMovies() {
    this.movieService.getMovies().subscribe(
      res => { this.movies = res },
      err => console.error(err)
    )
  }

  buyMovie(id: any) {
    this.movie = null;
    this.movieService.getMovie(id).subscribe(
      res => {
        this.movie = res
        console.log(this.movie)
        if (Number(this.movie.stock) > 0) {
          this.movie.stock = Number(this.movie.stock) - 1;
          this.availableStock = true;
          this.validateAndUpdateMovie(this.availableStock,id,this.movie);

        } else {
          this.availableStock = false;
          this.validateAndUpdateMovie(this.availableStock,id,this.movie);
        }
      }, err => console.error(err)
    )
    // for (let i = 0; i < this.movies.length; i++) {
    //   if (this.movies[i].id = id) {
    //     this.Curmovie = this.movies[i];
    //     // this.movies[i].stock=Number(this.movies[i].stock)-1;
    //     break;
    //   }
    // }
    // if (Number(this.Curmovie.stock) > 0) {
    //   this.Curmovie.stock = Number(this.Curmovie.stock) - 1;
    //   this.availableStock = true;
    //   this.validateAndUpdateMovie(this.availableStock, id, this.Curmovie);

    // } else {
    //   this.availableStock = false;
    //   this.validateAndUpdateMovie(this.availableStock, id, this.Curmovie);
    // }
  }

  validateAndUpdateMovie(availableStock: boolean, id: any, movie: Movie) {
    if (availableStock) {
      this.movieService.updateMovie(id, movie).subscribe(
        res => { alert("The movie has been bought succesfully") },
        err => console.error(err)
      )
    } else {
      alert("No stock available for this movie")
    }
  }

}
