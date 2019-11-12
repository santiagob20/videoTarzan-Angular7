import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-edit-movies',
  templateUrl: './edit-movies.component.html',
  styleUrls: ['./edit-movies.component.scss']
})
export class EditMoviesComponent implements OnInit {
  movie:Movie;
  listMovies:any;
  showCardEdit:boolean= false;
  showCardAdd:boolean= false;
  constructor(private movieService: MoviesService) { }

  ngOnInit() {
    this.getMovies()
  }

  getMovies(){
    this.movieService.getMovies().subscribe(
      res => {
        this.listMovies = res;

      },
      err => alert("Oopss, something is wrong, try again later" + err)
    )
  }

  editMovie(movie:Movie){
    if(movie.titulo==""||movie.descripcion==""||movie.director==""){
      alert("No blank spaces allowed")
    }else{
      this.movieService.updateMovie(movie.id,movie).subscribe(
        res => {
          this.movie = {};
          alert("Movie updated succesfully")
          this.getMovies();
          this.showCardEdit=false;

        },
        err => alert("Oopss, something is wrong, try again later" + err)
      )
    }
  }

  showMovieforEdit(id){
    // alert(id)
    this.movieService.getMovie(id).subscribe(
      res => {
        this.movie = res;
        this.showCardEdit=true;
      },
      err => alert("Oopss, something is wrong, try again later" + err)
      )

  }

  deleteMovie(id){
    // alert(id)
    this.movieService.deleteMovie(id).subscribe(
      res => {
        this.getMovies()
        alert("Movie deleted succesfully")
      },
      err => alert("Oopss, something is wrong, try again later" + err)
    )
  }

  showCreateMovie(id:Number){
    this.showCardAdd=true;
  }

  addMovie(){
    console.log(this.movie)
  }

}
