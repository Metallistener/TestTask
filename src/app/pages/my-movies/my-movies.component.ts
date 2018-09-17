import { Component } from "@angular/core";
import { DAMService } from "../../services/DAM.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-my-movies',
    templateUrl: './my-movies.html',
    styleUrls: ['./my-movies.css']
})

export class MyMoviesComponent {

    public _movies: Array<any>;  // Список моих добавленных фильмов

    constructor(
        public dam: DAMService,
        public route: Router 
    ) {
        this._movies = JSON.parse(localStorage.getItem('movies'));
    }

    // Метод удаляет фильм из моего списка
    public _deleteMovie(movie) {
        this.dam.deleteMovie(movie);
        this._movies = JSON.parse(localStorage.getItem('movies'));
    }

    // Метод для перехода в подробнее о фильме
    public _detailedMovie(imdbID) {
        this.route.navigate(['/detailed'], {
            queryParams: {
                imdbID: imdbID
            }
        })
    }

    // Проверяет существует ли хотя бы 1 фильм в моем списке
    public _isEmptyMovies() {
        if (this._movies.length > 0) {
            return true;
        } else {
            return false;
        }
    }
}