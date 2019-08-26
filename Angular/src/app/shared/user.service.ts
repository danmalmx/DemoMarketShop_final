import { AuthGuard } from './../auth/auth.guard';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  // readonly rootUrl = 'https://localhost:5001/api';
  readonly BaseUri = 'https://localhost:44318/api';


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
    const passwordCtrl = fb.get('ConfirmPassword');
    if (passwordCtrl.errors == null || 'passwordMismatch' in passwordCtrl.errors) {
      if (fb.get('Password').value !== passwordCtrl.value) {
        passwordCtrl.setErrors({ passwordMismatch: true });
      }
      else {
        passwordCtrl.setErrors(null);
      }
    }
  }

  register() {
    const body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseUri + '/ApplicationUser/Register', body);
  }

  login(formData) {
    return this.http.post(this.BaseUri + '/ApplicationUser/Login', formData);
  }

  isAdminLoggedIn() {
    const payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    const userRole = payLoad.role;
    if (userRole === 'Admin') {
      return true;
    }

    return !userRole;
  }

  isLoggedIn() {
    const payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    const userRole = payLoad.role;
    if (userRole === 'Admin' || userRole === 'Customer') {
      return true;
    }

    return !userRole;
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    const userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole === element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}
