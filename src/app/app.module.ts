import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BookViewComponent } from './book-view/book-view.component';
import { HouseViewComponent } from './house-view/house-view.component';
import { CharacterViewComponent } from './character-view/character-view.component';
import { ApiHttpService } from './api-http.service';
import { HttpClientModule } from '../../node_modules/@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    BookViewComponent,
    HouseViewComponent,
    CharacterViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'book/:Id', component: BookViewComponent},
      {path: 'house/:Id', component: HouseViewComponent},
      {path: 'character/:Id', component: CharacterViewComponent},
      {path: '**', component: NotFoundComponent},
    ]),
  ],
  providers: [ApiHttpService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
