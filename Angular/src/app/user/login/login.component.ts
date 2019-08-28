import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName: '',
    Password: '',
  };

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('');
    }
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        const token = localStorage.setItem('token', res.token);
        // tslint:disable-next-line: no-unused-expression
        token;
        this.toastr.success('You are signed in', '', { timeOut: 2000 } );
        this.router.navigate(['/products/products']);
      },
      err => {
        if (err.status === 400) {
          this.toastr.error('Incorrect username or password', '');
        } else {
          console.log(err);
        }
      });
  }

}
