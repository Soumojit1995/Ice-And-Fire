import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiHttpService } from '../api-http.service';
import {reject, resolve} from 'q';

@Component({
  selector: 'app-house-view',
  templateUrl: './house-view.component.html',
  styleUrls: ['./house-view.component.css']
})
export class HouseViewComponent implements OnInit {
public currentHouse;
public founder = '';
public heir = '';
public swornMembers = '';
public currentLord = '';
public titles = '';
public seats = '';
public overlord = '';
public cadetBranches = '';
public ancestralWeapons = '';
public isVisible = false;

  constructor(private _route: ActivatedRoute, private router: Router, public apiHttpService: ApiHttpService) { }

  ngOnInit() {

    let myHouseId;
    myHouseId = this._route.snapshot.paramMap.get('Id');
    this.currentHouse = this.apiHttpService.getHouse(myHouseId).subscribe(
      data => {
      this.isVisible = true;
        this.currentHouse = data;
        this.getSwornMembers(data.swornMembers);
        this.getFounder(data.founder);
        this.getHeir(data.heir);
        this.getCurrentLord(data.currentLord);
        this.getOverlord(data.overlord);
        this.getTitles(data.titles);
        this.getSeats(data.seats);
        this.getCadetBranches(data.cadetBranches);
        this.getAncestralWeapons(data.ancestralWeapons);
        if ( data.swornMembers.length === 0 && data.cadetBranches.length === 0) {
          this.swornMembers = 'N/A';
          this.cadetBranches = 'N/A';
         // tslint:disable-next-line:no-unused-expression
         return (this.swornMembers , this.cadetBranches);
         } else if (data.cadetBranches.length === 0) {
         return this.cadetBranches = 'N/A';
         } else if (data.swornMembers.length === 0) {
          return this.swornMembers = 'N/A';
          }

 },
      error => {
        console.log('some error occured');
        console.log(error.errorMessage);
      }
    );

}

// Get Sworn Members name
async getSwornMembers(swornMembers: string[]) {
  for (const i of swornMembers) {
    const info = await this.apiHttpService.getSingleCharacterInfoPromise(i.substr(i.lastIndexOf('/') + 1));
    let comma = swornMembers.indexOf(i) === swornMembers.length - 1 ? '' : ', ';

    let info1 = info.name === '' ? 'N/A' : info.name ;
    this.swornMembers += `${1 + swornMembers.indexOf(i)}: ${info1}${comma}<br/>`;
  }

}
// end Function
// Get cadetBranches name
async getCadetBranches(cadetBranches: string[]) {
  for (const i of cadetBranches) {
    const info = await this.apiHttpService.getSingleHouseInfoPromise(i.substr(i.lastIndexOf('/') + 1));
    let comma = cadetBranches.indexOf(i) === cadetBranches.length - 1 ? '' : ', ' ;
    let info1 = info.name === '' ? 'N/A' : info.name ;
    this.cadetBranches += `${1 + cadetBranches.indexOf(i)}: ${info1}${comma}<br/>`;
  }

}
// end Function
public getHeir(heir) {
  this.heir = this.apiHttpService.getSingleCharacter(heir).subscribe(
    data => {
      this.heir = data.name;

      resolve(data);
    },
    error => {
      reject(error);
      this.heir = '';
    }
  );

}
public getFounder(founder) {
  this.founder = this.apiHttpService.getSingleCharacter(founder).subscribe(
    data => {
      this.founder = data.name;
      resolve(data);
    },
    error => {
      reject(error);
      this.founder = '';
    });

}

public getCurrentLord(currentLord) {
  this.currentLord = this.apiHttpService.getSingleCharacter(currentLord).subscribe(
    data => {
      this.currentLord = data.name;
      resolve(data);
    },
    error => {
      reject(error);
      this.currentLord = '';
    });

}
public getOverlord(overlord) {
  this.overlord = this.apiHttpService.getSingleHouse(overlord).subscribe(
    data => {
      this.overlord = data.name;
      resolve(data);
    },
    error => {
      reject(error);
      this.overlord = '';
    });

}
// get titles
public getTitles(titles: string[]) {
  for (const i of titles) {

    let comma = titles.indexOf(i) === titles.length - 1 ? '' : ', ';
    let i1 = i === '' ? 'N/A' : 1 + titles.indexOf(i) + ': ' + i ;
    this.titles += `${i1}${comma}<br/>`;
  }

}
public getSeats(seats: string[]) {
  for (const i of seats) {
    let comma = seats.indexOf(i) === seats.length - 1 ? '' : ', ';
    let i1 = i === '' ? 'N/A' : i ;
    this.seats += `${i1}${comma}<br/>`;
  }
}
public getAncestralWeapons(ancestralWeapons: string[]) {
  for (const i of ancestralWeapons) {
    let comma = ancestralWeapons.indexOf(i) === ancestralWeapons.length - 1 ? '' : ', ';
    let i1 = i === '' ? 'N/A' : i ;
    this.ancestralWeapons += `${i1}${comma}<br/>`;
  }
}
  }


