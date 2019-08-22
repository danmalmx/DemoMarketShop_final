import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'q';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [

  ]
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: '',
  };

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if(localStorage.getItem('token') != null)
    this.router.navigateByUrl('');
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        var token = localStorage.setItem('token', res.token);
        token;
        this.toastr.success('You are signed in', 'Successfull signin', { timeOut: 2000 } );
        this.router.navigate(['']);
      },
      err => {
        if(err.status === 400){
          this.toastr.error('Incorrect username or password', 'Authentication failed');
        }
        else {
          console.log(err);
        }
      });
  }

}
