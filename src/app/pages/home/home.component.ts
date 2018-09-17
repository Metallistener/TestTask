import { Component, OnDestroy, OnInit } from "@angular/core";
import { MovieService } from "../../services/http/movie.service";
import { Router } from "@angular/router";
import { DAMService } from "../../services/DAM.service";


@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrls: ['./home.css']
})

export class HomeComponent implements OnInit, OnDestroy {

    public _movieName: string;  // Название фильма
    public _movieYear: string;  // Год выпуска фильма
    public _error: string; // Текст ошибки

    public _myMovies: any = [];  // Массив с моими добавленными фильмами
    public _autocompleteMovies: any = [];

    public _subscriptions: Array<any> = []; // Массив со всеми подписками

    constructor(
        public movie: MovieService,
        public nav: Router,
        public dam: DAMService
    ) {
        if (localStorage.getItem('movies')) {
            this._myMovies = JSON.parse(localStorage.getItem('movies'));
        } else {
            localStorage.setItem('movies', JSON.stringify([]));
        }
    }

    ngOnInit() {
        
    }

    // Метод для поиска фильма по названию и году выпуска
    public _searchMovie() {
        const params = {
            t: this._movieName,
            y: this._movieYear
        };

        console.log(params);
        const getMovieRequest = this.movie.getMovie(params)
        .subscribe((response: any) => {
            if (response.Error == 'Movie not found!' || response.Error == 'Something went wrong.') {
                this._error = response.Error;
                console.log(response);
            } else {
                this.nav.navigate(['detailed'], {
                    queryParams: {
                        imdbID: response.imdbID
                    }
                })
            }
        }, (errors) => {
            console.log(errors);
        });

        this._subscriptions.push(getMovieRequest);
    }

    // Ищет фильмы с совпадающим символами из поля
    public _autocomplete(data) {
        this._autocompleteMovies = [];
        this._movieName = data.value;
        const params = {
            t: this._movieName
        };

        const getMovieRequest = this.movie.getMovie(params)
        .subscribe((response: any) => {
            if (response.Error == 'Movie not found!' || response.Error == 'Something went wrong.') {
                this._autocompleteMovies = [];
            } else {
                this._autocompleteMovies.push(response);
            }
        }, (errors) => {
            console.log(errors);
        });

        this._subscriptions.push(getMovieRequest);
    }

    // Метод для перехода в Подробнее о фильме 
    public _detailedMovie(movie) {
        this.nav.navigate(['detailed'], {
            queryParams: {
                imdbID: movie.imdbID
            }
        });
    }

    ngOnDestroy() {
        for (let subscription of this._subscriptions) {
            subscription.unsubscribe();  //Отписывается от всех подписок если данный компонент больше не используется
        }
    }

}