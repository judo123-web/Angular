import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService, registrationinput } from '../app.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.scss']
})
export class UpdateuserComponent implements OnInit {
  @Input() set user(par : registrationinput) {
    if (par.email !== undefined){
      this.updateForm.patchValue({
        email : par.email,
        password: '',
        confirm_password: '',
        nickName: par.nickName,
        phoneNumber: par.phoneNumber,
        Website: par.Website,
      })
    } 
  }
  @Input() index : number

  regex = /^[a-z0-9][a-z0-9]*$/i
  regexNickname = /^[a-z0-9_]*$/i
  regexPhoneNumber = /([+380]{4})[-\s\./0-9]*$/
  regexURl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  updateForm: FormGroup;

  pat(){
    this.updateForm.patchValue({
      email : "Sad@adasd"
    })
  }



  ngOnInit(): void {

  }

  constructor(private fb: FormBuilder, private service: AppService) {

    this.index = 0 
    this.user = {} as registrationinput

    console.log("this.user,this.index")

    this.updateForm  = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.pattern(this.regex)]],
      confirm_password: ['', [Validators.required]],
      nickName: ['', [Validators.required, Validators.pattern(this.regexNickname)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(this.regexPhoneNumber), Validators.maxLength(13)]],
      Website: ['', [Validators.required, Validators.pattern(this.regexURl)]],
    },
      {
        validator: this.service.passwordcinfrimvalidator('password', 'confirm_password')
      })
  }




    update() {
      this.service.updateuser(this.updateForm.value,this.index)
      alert(`user ${this.updateForm.value.email} Updated Sucessfully`)
      this.updateForm.reset()
      this.service.whichpage = "users"
    }

}
