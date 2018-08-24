import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiHttpService } from '../api-http.service';
import { reject, resolve } from 'q';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.css']
})
export class CharacterViewComponent implements OnInit {
   public isVisible = false;
public currentCharacter;
public books = '';
public playedBy = '';
public tvSeries = '';
public titles = '';
public aliases = '';
public allegiances = '';
public spouse = '';
public povBooks = '';

  constructor(private _route: ActivatedRoute, private router: Router, public apiHttpService: ApiHttpService) { }

  ngOnInit() {
    let myCharacterId;
    myCharacterId = this._route.snapshot.paramMap.get('Id');
    this.currentCharacter = this.apiHttpService.getCharacter(myCharacterId).subscribe(
      data => {
      this.isVisible = true;
        this.currentCharacter = data;
        this.getBookName(data.books);
        this.getPlayedBy(data.playedBy);
        this.getTvSeries(data.tvSeries);
        this.getTitles(data.titles);
        this.getAliases(data.aliases);
        this.getAllegiances(data.allegiances);
        this.getSpouse(data.spouse);
        this.getPovBooks(data.povBooks);
        if ( data.books.length === 0 && data.povBooks.length === 0) {
          this.books = 'N/A';
          this.povBooks = 'N/A';
         // tslint:disable-next-line:no-unused-expression
         return (this.books , this.povBooks);
         } else if (data.books.length === 0) {
         return this.books = 'N/A';
         } else if (data.povBooks.length === 0) {
          return this.povBooks = 'N/A';
          }
      },
      error => {
        console.log('some error occured');
        console.log(error.errorMessage);
      }
    );

}
public getPlayedBy(playedBy: string[]) {
  for (const i of playedBy) {

    const comma = playedBy.indexOf(i) === playedBy.length - 1 ? '' : ', ';
    this.playedBy += `${i}${comma}`;
  }
}
public getTvSeries(tvSeries: string[]) {
  for (const i of tvSeries) {

    const comma = tvSeries.indexOf(i) === tvSeries.length - 1 ? '' : ', ';
    this.tvSeries += `${i}${comma}`;
  }
}
public getTitles(titles: string[]) {
  for (const i of titles) {

    const comma = titles.indexOf(i) === titles.length - 1 ? '' : ', ';
    this.titles += `${i}${comma}`;
  }

}
public getAliases(aliases: string[]) {
  for (const i of aliases) {

    const comma = aliases.indexOf(i) === aliases.length - 1 ? '' : ', ';
    this.aliases += `${i}${comma}`;
  }

}
public getSpouse(spouse) {
  this.spouse = this.apiHttpService.getSingleCharacter(spouse).subscribe(
    data => {
      this.spouse = data.name;
      resolve(data);
    },
    error => {
      reject(error);
      this.spouse = '';
    });

}
// Get Sworn Members name
async getBookName(books: string[]) {
  for (const i of books) {
    const info = await this.apiHttpService.getSingleBookInfoPromise(i.substr(i.lastIndexOf('/') + 1));
    const comma = books.indexOf(i) === books.length - 1 ? '' : ', ';
    let info1 = info.name === '' ? 'N/A' : info.name ;
    this.books += `${1 + books.indexOf(i)}: ${info1}${comma}<br/>`;
  }
  }
  async getPovBooks(povBooks: string[]) {
    for (const i of povBooks) {
      const info = await this.apiHttpService.getSingleBookInfoPromise(i.substr(i.lastIndexOf('/') + 1));
      const comma = povBooks.indexOf(i) === povBooks.length - 1 ? '' : ', ';
      let info1 = info.name === '' ? 'N/A' : info.name ;
      this.povBooks += `${1 + povBooks.indexOf(i)}: ${info1}${comma}<br/>`;
    }
    }
  async getAllegiances(allegiances: string[]) {
    for (const i of allegiances) {
      const info = await this.apiHttpService.getSingleCharacterInfoPromise(i.substr(i.lastIndexOf('/') + 1));
      let comma = allegiances.indexOf(i) === allegiances.length - 1 ? '' : ', ';
      this.allegiances += `${info.name}${comma}`;
    }
    }
}
