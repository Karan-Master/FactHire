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

 
arr:string[]=[];
constructor(private service:UserService,private route:Router) { }
ngOnInit() {
this.resetForm();
this.getCaseStudy();
this.startCaseTimer();
}
 
startCaseTimer()
{
    this.service.timer = setInterval(() => {
    this.service.caseseconds--;
    }, 1000);
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
    this.service.casestudy = data;
    var x;
    
    x=data.Instruction
    this.arr=x.split(".");
    this.arr.pop();
}
);
}
 
OnSubmit(){
this.route.navigate(['/test']);
}
}
