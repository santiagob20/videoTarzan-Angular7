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
  availableStock: boolean = true;
  constructor(private movieService: MoviesService) { }


  ngOnInit() {
    this.getMovies()
  }

  getMovies() {
    this.movieService.getMovies().subscribe(
      res => { this.movies = res },
      err => console.error(err)
    )
  }

  buyMovie(id:Number) {
    this.movie = null;
    this.movieService.getMovie(Number(id)).subscribe(
      res => {
        this.movie = res
        // console.log(this.movie)
        if (Number(this.movie.stock) > 0) {
          this.movie.stock = Number(this.movie.stock) - 1;
          this.availableStock = true;
        } else {
          this.availableStock = false;
        }
      }, err => console.error(err)
    )
    if (this.availableStock) {
      this.movieService.updateMovie(this.movie.id, this.movie).subscribe(
        res => { alert("The movie has been bought succesfully") },
        err => console.error(err)
      )
    } else {
      alert("No stock available for this movie")
    }

    //  console.log(this.movie)
  }

}
