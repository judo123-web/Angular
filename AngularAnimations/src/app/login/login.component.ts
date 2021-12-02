import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../services/crud.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private crud : CrudService, private fb: FormBuilder,private auth : UsersService,private router : Router) { }

  ngOnInit(): void {
    if (this.auth.checklogin) {
      this.router.navigate(["/users"])
    }

    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    })
  }

  submitlogin() {
    var formuser = this.loginForm.value
    this.crud.getEmployes()
    .subscribe(data => {
      var  userexist : boolean = data.find((employe: any) => {
        return formuser.email === employe.email && formuser.password == employe.password
      })
      if (userexist) {
        this.auth.login()
        this.auth.user = userexist
        this.router.navigate(["/users"])
      }
      else {alert("Incorrect Email or Password")}
      }
    )
  }

}
