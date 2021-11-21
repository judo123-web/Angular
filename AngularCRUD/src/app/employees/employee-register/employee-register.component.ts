import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterType } from 'src/app/register-type';
import { CrudService } from '../crud.service';


@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent implements OnInit {
  @Input() whichbutton : "add" | "update" = "add"

  id : number = 0

  @Output() arrayvalue: EventEmitter<any[]> = new EventEmitter<any[]>()

  @Input() set setEmployee(param : any) {
    this.id = param.id
    setTimeout(() => {
      this.registerForm.patchValue({
        name: param.name,
        salary: param.salary,
        age: param.age,
      })
    });
  }
  

  registerForm!: FormGroup


  constructor(private fb: FormBuilder, private crudservice: CrudService) { }

  updateEmploy(){
    this.crudservice.updateEmploye(this.registerForm.value,this.id)
    .subscribe(data=>{
      this.registerForm.reset()
      var butt = document.getElementById('#button1')
      butt?.click()
      this.crudservice.getEmployes().subscribe(data =>{
        this.arrayvalue.emit(data)
      })
      
    })
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['',[Validators.required,Validators.pattern(/^[A-Za-z ]+$/)]],
      salary: ['',[Validators.required,Validators.pattern(/^\d+$/)]],
      age: ['',[Validators.required,Validators.pattern(/^\d+$/)]],
    })

  }

  createemployee() {
    this.crudservice.createEmploye(this.registerForm.value)
      .subscribe(data => {
        alert("Employ added succesfully")
        this.registerForm.reset()
        var butt = document.getElementById('#button1')
        butt?.click()
        this.crudservice.getEmployes().subscribe(data =>{
          this.arrayvalue.emit(data)
        })
      })
  }





  // getAllEmployeedata() {
  //   this.api.getEmploye()
  //     .subscribe(res => {
  //       this.employeeData = res
  //     })
  // }

}

