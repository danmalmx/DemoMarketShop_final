import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })
  });
  comparePasswords(fb: FormGroup) {
    let passwordCtrl = fb.get('ConfirmPassword');
    if (passwordCtrl.errors == null || 'passwordMismatch' in passwordCtrl.errors) {
      if (fb.get('Password').value != passwordCtrl.value) {
        passwordCtrl.setErrors({ passwordMismatch: true })
      }
      else {
        passwordCtrl.setErrors(null);
      }
    }
  }
}
