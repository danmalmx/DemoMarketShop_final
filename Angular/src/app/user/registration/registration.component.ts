import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.Succeeded) {
          this.service.formModel.reset();
          this.toastr.success('New user created', '')
        } else {
          res.Errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username already taken', '');
                break;

              default:
                this.toastr.error(element.Description, '');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
