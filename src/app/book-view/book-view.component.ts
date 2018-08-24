import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiHttpService } from '../api-http.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {
  public currentBook;
  public isVisible = false;
  public characters = '';
  public povCharacters = '';

  constructor(private _route: ActivatedRoute, private router: Router, public apiHttpService: ApiHttpService) { }

  ngOnInit() {
      let myBlogId;
      myBlogId = this._route.snapshot.paramMap.get('Id');
      this.currentBook = this.apiHttpService.getBook(myBlogId).subscribe(
        data => {
        this.isVisible = true;
          this.currentBook = data;
          this.getCharacters(data.characters);
          this.getPovCharacters(data.povCharacters);
          if ( data.characters.length === 0 && data.povCharacters.length === 0) {
            this.characters = 'N/A';
            this.povCharacters = 'N/A';
           // tslint:disable-next-line:no-unused-expression
           return (this.characters , this.povCharacters);
           } else if (data.characters.length === 0) {
           return this.characters = 'N/A';
           } else if (data.povCharacters.length === 0) {
            return this.povCharacters = 'N/A';
            }
        },
        error => {
          console.log('some error occured');
          console.log(error.errorMessage);
        }
      );
    }
 async getCharacters(characters: string[]) {
        for (const i of characters) {
          const info = await this.apiHttpService.getSingleCharacterInfoPromise(i.substr(i.lastIndexOf('/') + 1));
          let comma = characters.indexOf(i) === characters.length - 1 ? '' : ', ';

          let info1 = info.name === '' ? 'N/A' : info.name ;
          this.characters += `${1 + characters.indexOf(i)}: ${info1}${comma}<br/>`;
        }

      }
      async getPovCharacters(povCharacters: string[]) {
        for (const i of povCharacters) {
          const info = await this.apiHttpService.getSingleCharacterInfoPromise(i.substr(i.lastIndexOf('/') + 1));
          // tslint:disable-next-line:prefer-const
          let comma = povCharacters.indexOf(i) === povCharacters.length - 1 ? '' : ', ';

          const info1 = info.name === '' ? 'N/A' : info.name ;
          this.povCharacters += `${1 + povCharacters.indexOf(i)}: ${info1}${comma}<br/>`;
        }

      }
}
