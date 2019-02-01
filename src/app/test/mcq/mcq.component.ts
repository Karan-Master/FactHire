import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.css']
})
export class McqComponent implements OnInit {

  constructor(private service : UserService,private route : Router) { }
  mcqNo : number = 0;
  ngOnInit() {
      this.getMcqs();
    }

    getMcqs(){
      console.log("quesstion id " + this.service.currentqid);
      this.service.getMcq(this.service.currentqid).subscribe(
        (data : any) => {
          this.service.mcqs = data;
        }
      );
    }
    onNext(){
      this.mcqNo++;
    }

}
