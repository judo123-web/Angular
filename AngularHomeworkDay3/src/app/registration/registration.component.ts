import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: AppService) { }

  regex = /^[a-z0-9][a-z0-9]*$/i
  regexNickname = /^[a-z0-9_]*$/i
  regexPhoneNumber = /([+380]{4})[-\s\./0-9]*$/
  regexURl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

  registrationForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(7), Validators.pattern(this.regex)]],
    confirm_password: ['', [Validators.required]],
    nickName: ['', [Validators.required, Validators.pattern(this.regexNickname)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(this.regexPhoneNumber), Validators.maxLength(13)]],
    Website: ['', [Validators.required, Validators.pattern(this.regexURl)]],
    Checkbox: [false, [Validators.requiredTrue]]
  },
    {
      validator: this.service.passwordcinfrimvalidator('password', 'confirm_password')
    })

  submitform() {
    this.service.adduser(this.registrationForm.value)
    // this.registrationForm.reset()
    this.service.whichpage = "users"
  }


  ngOnInit(): void {
  }

}
