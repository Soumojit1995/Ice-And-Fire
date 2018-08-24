import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

 public apiUrl = 'https://www.anapioficeandfire.com/api/';
  constructor( private _http: HttpClient) { }
// get All Books
  public getAllBook(): any {
    let allBooks;
    allBooks = this._http.get(`${this.apiUrl}books`);
    return allBooks;
  }// end function
  // get All Characters
  public getAllCharacter(): any {
    let allCharacters;
    allCharacters = this._http.get(`${this.apiUrl}characters`);
    return allCharacters;
  }
 // end function
// get All Houses
  public getAllHouse() {
    let allHouses;
    allHouses = this._http.get(`${this.apiUrl}houses`);
    return allHouses;
  }// end function
public getBook(Id) {
  let singleBooks;
  singleBooks = this._http.get(`${this.apiUrl}books/${Id}`);
    return singleBooks;
}
public getCharacter(Id) {
  let singleCharacter;
  singleCharacter = this._http.get(`${this.apiUrl}characters/${Id}`);
    return singleCharacter;
}
public getHouse(Id) {
  let singleHouse;
  singleHouse = this._http.get(`${this.apiUrl}houses/${Id}`);
    return singleHouse;
}
public getSingleCharacter (url) {
let singleCharacter;
singleCharacter = this._http.get(url);

return singleCharacter;
}
public getSingleHouse (url) {
  let singleHouse;
  singleHouse = this._http.get(url);
  return singleHouse;
  }
  // get single character data
public getSingleCharacterInfoPromise(characterId): any {
  return new Promise((resolve, reject) => {
    this._http.get(`${this.apiUrl}characters/${characterId}`).subscribe(data => {
      resolve(data);
    }, error => {
      reject(error);
    });
  });
}// end function
// get single house data
public getSingleHouseInfoPromise(houseId): any {
  return new Promise((resolve, reject) => {
    this._http.get(`${this.apiUrl}houses/${houseId}`).subscribe(data => {
      resolve(data);
    }, error => {
      reject(error);
    });
  });
}
public getSingleBookInfoPromise( BookId): any {
  return new Promise((resolve, reject) => {
    this._http.get(`${this.apiUrl}books/${BookId}`).subscribe(data => {
      resolve(data);
    }, error => {
      reject(error);
    });
  });
}
}
