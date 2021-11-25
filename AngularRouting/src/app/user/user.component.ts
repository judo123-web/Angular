import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  employeesData: any
  updateEmploy!: FormGroup
  serviceuser : any
  constructor(private crudService: CrudService, private fb :FormBuilder, private user : UsersService,private router : Router) { }

  ngOnInit(): void {

    this.serviceuser = this.user.user
    this.crudService.getEmployes()
      .subscribe(data => {
        this.employeesData = data
      })
      
      this.updateEmploy = this.fb.group({
        email : [this.user.user.email,[Validators.required,Validators.email]],
        name : [this.user.user.name,[Validators.required]],
        password : [this.user.user.password,[Validators.required]],
        salary : [this.user.user.salary,[Validators.required]],
        age : [this.user.user.age,[Validators.required]],
      })
  }

  updateuser() {
    this.crudService.updateEmploye(this.updateEmploy.value,this.serviceuser.id)
    .subscribe(data =>{
      this.user.user = data
      this.serviceuser = data
      this.crudService.getEmployes()
      .subscribe(data =>{
        var closebuton = document.getElementById("#button1")
        alert(`Employee ${this.serviceuser.email} Updated succesfully`)
        closebuton?.click()
        this.employeesData = data
      })
    })
  }

  delete(id :number) {
    this.crudService.deleteEmploye(id)
    .subscribe(nuth => {
        this.user.logout()
        alert(`Employee ${this.serviceuser.email} deleted succesfully`)
        this.router.navigate(["/"])
    })
  }

  logout() {
    this.user.logout()
    this.router.navigate(["/"])
  }

}
