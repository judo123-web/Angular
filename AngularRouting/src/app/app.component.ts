import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularRouting';
  button : any


  constructor(private userService : UsersService, private router : Router) {
    userService.getbutton
    .subscribe(data => {
      console.log("button",data)
      this.button = data
    })
  }

  movetousers() {
    this.router.navigate(["/users"])
  }


}
