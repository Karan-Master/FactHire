import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private service : UserService,private route : Router) { }

  ngOnInit() {
    this.service.seconds = 0;
    this.startTimer();
  }
  startTimer() {
    this.service.timer = setInterval(() => {
      this.service.seconds++;
      if(this.service.casestudy.Duration == this.service.seconds){
        this.onSubmitTest();
      }
      localStorage.setItem('seconds', this.service.seconds.toString());
    }, 1000);
  }
  onSubmitTest(){
    console.log(this.service.totalmark);
    this.service.caseresult = {
      User_Id :  this.service.userDetail.User_id,
      Case_Id :  this.service.casestudy.Case_Id,
      start_time : new Date() ,
      end_time : new Date(),
      total_score : this.service.totalmark
    }
    console.log("ssss");
    this.service.postResult(this.service.caseresult).subscribe(
      (data : any)=>{
        this.route.navigate(['/leaderboard']);
      }
    );
  }
}
