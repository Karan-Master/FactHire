import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private service : UserService) { }

  ngOnInit() {
    this.service.seconds = 0;
    this.startTimer();
  }
  startTimer() {
    this.service.timer = setInterval(() => {
      this.service.seconds++;
      localStorage.setItem('seconds', this.service.seconds.toString());
    }, 1000);
  }
  onSubmitTest(){

    this.service.caseresult = {
      User_Id :  "uwi",//this.service.userDetail.User_id,
      Case_Id :  1,//this.service.casestudy.Case_Id,
      start_time : new Date() ,
      end_time : new Date(),
      total_marks : this.service.totalmark
    }
    console.log("ssss");
    this.service.postResult(this.service.caseresult).subscribe(
      (data : any)=>{

      }
    );
  }
}
