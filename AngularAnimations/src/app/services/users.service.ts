import { Injectable, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnInit{
  constructor() { }

  isspinner : boolean = false

  user : any 
  checklogin : boolean = false

  logout () {
    this.checklogin = false
  }

  

  login() {
    this.checklogin = true
  }

  ngOnInit() {

  }

}
