import { Component, OnInit } from '@angular/core';
import { RegisterType } from '../register-type';
import { CrudService } from './crud.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  constructor(private crudservice: CrudService) { }

  whichbutton : 'add' | 'update' = 'add'
  first: number = 1;
  numberofemployees: number = 10;

  employee: any = {
    id: 0,
    name: "",
    age: "",
    salary: ""
  }

  reset() {
    this.employee = {
      name: "",
      age: "",
      salary: ""
    }
    this.whichbutton = 'add'

  }

  edit(employ : any) {
    this.employee = employ
    this.whichbutton = 'update'
  }

  employeesData: any[] = []

  ngOnInit(): void {
    this.crudservice.getEmployes()
      .subscribe(data => {
        this.employeesData = data
      })

  }

  delete(employee: any) {
    this.crudservice.deleteEmploye(employee.id)
      .subscribe(
        data => {
          this.crudservice.getEmployes()
            .subscribe(data => {
              this.employeesData = data
            })
        }
      )
  }



}
