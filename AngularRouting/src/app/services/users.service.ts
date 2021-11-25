import { Injectable, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnInit{
  constructor() { }
  subj1 = new Subject<boolean>()
  getbutton = this.subj1.asObservable()

  user : any 
  checklogin : boolean = false

  logout () {
    this.subj1.next(false)
    this.checklogin = false
  }

  

  login() {
    this.subj1.next(true)
    this.checklogin = true
  }

  ngOnInit() {

  }

}
