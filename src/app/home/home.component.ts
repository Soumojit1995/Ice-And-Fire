import { Component, OnInit } from '@angular/core';
import { ApiHttpService } from '../api-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isVisible = false;
public allBooks;
public allCharacters;
public allHouses;
  constructor(public apiHttpService: ApiHttpService ) { }

  ngOnInit() {
    this.allBooks = this.apiHttpService.getAllBook().subscribe(
      data => {
        this.isVisible = true;
        this.allBooks = data;
        this.allBooks.sort((a, b) => a.name.localeCompare(b.name));
      },
      error => {
        console.log('some error occured');
        console.log(error.errorMessage);
      }
    );

    this.allCharacters = this.apiHttpService.getAllCharacter().subscribe(
      characters => {
        this.allCharacters = characters;
        this.allCharacters.sort((a, b) => a.name.localeCompare(b.name));

      },
      error => {
        console.log('some error occured');
        console.log(error.errorMessage);
      }
    );
    this.allHouses = this.apiHttpService.getAllHouse().subscribe(
      houses => {
        this.allHouses = houses;
        this.allHouses.sort((a, b) => a.name.localeCompare(b.name));
      },
      error => {
        console.log('some error occured');
        console.log(error.errorMessage);
      }
    );
  }
}
