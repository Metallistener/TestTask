import { Injectable } from "@angular/core";
import { HttpClient, HttpClientJsonpModule } from "@angular/common/http";
import { Settings } from "../../config/config";

@Injectable()
export class MovieService {

    constructor(
        public http: HttpClient
    ) {

    }

    public getMovie(params) {
        let url = Settings.API_HOST;

        if (params.i) {
            url += '&i=' + params.i;
        };

        if (params.t) {
            url += '&t=' + params.t;
        };

        if (params.y) {
            url+= '&y=' + params.y
        };

        console.log(url);

        return this.http.get(
            url
        )
    }
}