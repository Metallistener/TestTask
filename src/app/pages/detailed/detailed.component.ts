import { Component, OnDestroy, OnInit } from "@angular/core";
import { MovieService } from "../../services/http/movie.service";
import { ActivatedRoute } from "@angular/router";
import { DAMService } from "../../services/DAM.service";


@Component({
    selector: 'app-detailed',
    templateUrl: './detailed.html',
    styleUrls: ['./detailed.css']
})

export class DetailedComponent implements OnInit, OnDestroy {

    public _imdbID: string;  
    public _addButton = true;
    public _deleteButton = false;

    public _movie;  // Все данные о просматриваемом фильме

    public _subscriptions: Array<any> = [];  // Подписки

    constructor(
        public movie: MovieService,
        public activateRoute: ActivatedRoute,
        public dam: DAMService
    ) {
        activateRoute.queryParams.subscribe((params) => {
            this._imdbID = params.imdbID;
        })
    }

    ngOnInit() {
        this._searchMovie();
    }

    // Метод для поиска фильма по IMDB ID
    public _searchMovie() {
        const params = {
            i: this._imdbID
        };

        const getMovieRequest = this.movie.getMovie(params)
        .subscribe((response: any) => {
            console.log(response);
            if (response.Error == 'Movie not found!' || response.Error == 'Something went wrong.') {
                
            } else {
                this._movie = response;
                this._existMovie(this._movie);
            };

        }, (errors) => {
            console.log(errors);
        });

        this._subscriptions.push(getMovieRequest);
    }

    // Метод добавляет фильм в Мой список фильмов
    public _addMovie(movie) {
        this.dam.addMovie(movie);
        this._existMovie(movie);
    }

    // Метод удаляет фильм из Моего списка фильмов
    public _deleteMovie(movie) {
        this.dam.deleteMovie(movie);
        this._existMovie(movie);
    }

    // Метод проверяет фильм на существовании фильма в Моём списке фильмов
    public _existMovie(movie) {
        if (this.dam.existMovie(movie)) {
            this._addButton = false;
            this._deleteButton = true; 
        } else {
            this._addButton = true;
            this._deleteButton = false; 
        }
    }

    ngOnDestroy() {
        for (const subscription of this._subscriptions) {
            subscription.unsubscribe();   // Отписывается от всех подписок если данный компонент больше не используется
        }
    }

}