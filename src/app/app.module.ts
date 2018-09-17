import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatFormFieldModule, 
  MatInputModule, 
  MatSelectModule,
  MatDatepickerModule,
  MatButtonModule,
  MatNativeDateModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailedComponent } from './pages/detailed/detailed.component';
import { MainComponent } from './pages/main/main.component';
import { MovieService } from './services/http/movie.service';
import { DAMService } from './services/DAM.service';
import { MyMoviesComponent } from './pages/my-movies/my-movies.component';
import { InputDelayComponent } from './components/input-delay/input.component';


const appRoutes: Routes = [
  { path: ' ', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: MainComponent, children: [
    { path: 'home', component: HomeComponent },
    { path: 'detailed', component: DetailedComponent },
    { path: 'my-movies', component: MyMoviesComponent },
    { path: '**', redirectTo: 'home' }
  ] }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    DetailedComponent,
    MyMoviesComponent,
    InputDelayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(appRoutes),
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    MovieService,
    DAMService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
