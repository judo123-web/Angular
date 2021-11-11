import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nghomework1';
  updateuser = {}
  updateindex : number

  changetoregistration () {
    this.service.whichpage = "register"
  }

  changetouserlist(){
    this.service.whichpage = "users"
  }

  constructor(private service : AppService) {
    this.updateindex = 1
  }

  get whichpage() {
    return this.service.whichpage
  }
}
