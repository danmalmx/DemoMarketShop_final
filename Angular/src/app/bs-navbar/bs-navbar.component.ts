import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  constructor(private router: Router, private service: UserService) { }
  username: any;
  
  ngOnInit() {
    this.username = sessionStorage.getItem('UserName');

    // this.username = this.service.connectServer();
    // console.log(this.username = this.service.connectServer());
    // return this.username;
  }

  onLogout() {
    sessionStorage.removeItem('UserName');
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
