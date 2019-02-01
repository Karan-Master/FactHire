import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private service : UserService, private route : Router) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
      this.service.userDetail = {
        FullName: '',
        Experience: 0,
        User_id: '',
      }
  }

  onSubmit(form: NgForm) {
      this.service.postEmployee(form.value).subscribe(
        (data : any) =>{
          this.service.userDetail = data;
         // this.resetForm();
          this.route.navigate(['/casestudy']);
        }
      );
  }
}
