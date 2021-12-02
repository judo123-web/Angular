import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InterseptorService } from './services/interseptor.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularRouting';


  constructor(public userService : UsersService, private router : Router) {}






}