import { Injectable } from "@angular/core";

@Injectable()
export class DAMService {

    public _movies: any;

    constructor(

    ) {
        this._movies = JSON.parse(localStorage.getItem('movies'));
    }

    // Добавляет фильм в мой локальный список фильмов
    public addMovie(movie) {
        this._movies.push(movie);
        localStorage.setItem('movies', JSON.stringify(this._movies));
    }

    // Удаляет фильм из моего локального списка фильмов
    public deleteMovie(movie) {
        for (let i = 0; i < this._movies.length; i++) {
            if (this._movies[i].imdbID === movie.imdbID) {
                this._movies.splice(i, 1);
                localStorage.setItem('movies', JSON.stringify(this._movies));
                break;
            }
        }
    }

    // Проверяет существует ли фильм в Моем списке фильмов
    public existMovie(movie) {
        let exist: boolean;
        this._movies = JSON.parse(localStorage.getItem('movies'));;

        for (let i = 0; i < this._movies.length; i++) {
            if (this._movies[i].imdbID === movie.imdbID) {
                exist = true;
                break;
            } else {
                exist = false;
            }
        }

        return exist;
    }

}