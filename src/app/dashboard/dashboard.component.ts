import { Component, OnInit,Input,OnChanges  } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnChanges {
  movies:any;
  @Input() childData: string;


  chart: any = {
    title: "Available Stock",
    type: 'PieChart',
    columnNames: ['Movie', 'Quantity'],
    data: [["El sexto sentido",15],["Pulp Fiction",17],["Avengers Infinity war",5],["300",10],["El silencio de los corderos",8],["Forrest Gump",4]],
    options: {
      colors: ['#fbc02d', '#756846', '#a58430', '#d1a128', '#fbc02d'], is3D: true
    },
    width: 550,
    height: 400
  }

  chartPrice: any = {
    title: "Price ranges",
    type: 'ColumnChart',
    columnNames: ['Movie', 'Price'],
    data: [["El sexto sentido",3000],["Pulp Fiction",8000],["Avengers Infinity war",6200],["300",1500],["El silencio de los corderos",4800],["Forrest Gump",3850]],
    options: {
      colors: ['#fbc02d', '#507092', '#5c7b94', '#a4c2da', '#d9ebfa'], is3D: true
    },
    width: 550,
    height: 400
  }
  constructor(private movieService: MoviesService) { }

  ngOnChanges(){
    this.getMovies()
  }

  ngOnInit() {
    this.getMovies()
  }

  getMovies() {
    this.movieService.getMovies().subscribe(
      res => { this.movies = res;
        // this.movies.push(res[0])
        // console.log(res)
        this.chart.data=[];
        this.chartPrice.data=[];
        for (let i = 0; i < this.movies.length; i++){
          // const element = array[i];
          this.chart.data.push([this.movies[i].titulo,this.movies[i].stock])
          this.chartPrice.data.push([this.movies[i].titulo,this.movies[i].costo_alquiler])
        }
      
      },
      err => console.error(err)
    )
    // for (let i = 0; i < this.movies.length; i++) {
    //   console.log(this.movies[i].titulo, this.movies[i].stock)
    //   this.chart.data.push(this.movies[i].titulo, this.movies[i].stock)
    // }
  }

}
