import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-casestudy',
  templateUrl: './casestudy.component.html',
  styleUrls: ['./casestudy.component.css']
})
export class CasestudyComponent implements OnInit {

  constructor(private service:UserService,private route:Router) { }
 
  ngOnInit() {
    this.resetForm();
    this.getCaseStudy();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
      this.service.casestudy = {
        Instruction: '',
        Experience: 0,
        Role: '',
        Case_Id : 0,
        Case_name :'',
        Duration: 0,
        Author_id: ''
      }
  }
  getCaseStudy(){
    this.service.getCaseStudy(this.service.userDetail).subscribe(
      (data : any) =>{
        console.log("sdsad");
        this.service.casestudy = data;
        console.log(this.service.casestudy.Case_name);
      }
    );
  }

  OnSubmit(){
    console.log("sss")
    this.route.navigate(['/test']);
  }
}
