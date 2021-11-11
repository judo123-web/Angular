import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

export interface registrationinput {
  Checkbox?: any,
  Website?: string,
  confirm_password?: string,
  email?: string,
  nickName?: string,
  password?: string,
  phoneNumber?: string,
}


@Injectable({
  providedIn: "root"
})
export class AppService {
  whichpage: "register" | "users" | "update" = "register"

  allusers: registrationinput[] = []

  adduser(user: registrationinput) {
    this.allusers.unshift(user)
  }

  updateuser(newuser: registrationinput, index: number) {
    this.allusers.splice(index, 1, newuser)

  }

  deleteuser(index : number){
    this.allusers.splice(index, 1)
  }


  passwordcinfrimvalidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    }

  }
}