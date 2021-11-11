import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { AppService, registrationinput } from '../app.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Output() user : EventEmitter<registrationinput> = new EventEmitter()
  @Output() index : EventEmitter<number> = new EventEmitter()


  constructor(private service : AppService) {}

  get users () {
    return this.service.allusers
  }

  update(user:registrationinput,i:number) {
    this.user.emit(user)
    this.index.emit(i)
    this.service.whichpage = "update"
  }

  delete(index : number) :void {
    var conf = confirm(`This action will remove a user with this email: ${this.service.allusers[index].email}
    Are you shure?`)
    if (conf) this.service.deleteuser(index)
  }
  
  ngOnInit(): void {
  }

}