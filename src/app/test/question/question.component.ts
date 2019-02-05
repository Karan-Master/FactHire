import { Component, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { question } from 'src/app/shared/question.model';
import { EventEmitter } from 'events';
import { McqComponent } from '../mcq/mcq.component';

@Component({
  providers : [McqComponent],
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private service : UserService,private mcq : McqComponent) { }
  
  isAvailable : boolean = false;
  ngOnInit() {

    console.log("ngoninit")
    this.service.getQuestion(1).subscribe(
      (data : any) =>{
        console.log("calling http post for question");
        this.service.questions = data;

        
        this.isAvailable = true;
        this.service.qnNo = 0;
        this.service.mcqNo = 0;
        this.service.currentqid = this.service.questions[this.service.qnNo].Question_Id;
        console.log("question fetch completed");
        //this.dummy();
        console.log("mcq fetch completed");
      }
    );
    
  }
  
  dummy(){
    console.log("inside dummy");
    var i:number;
    for( i =0;i<this.service.questions.length;i++){
     // console.log(i);
      this.mcq.loadMcq(i,this.service.questions[i].Question_Id);
      console.log("thread " +i);
      console.log("mcq length "+this.service.mcqs.length);
      
    }
      console.log("final length "+ this.service.mcqs.length);
      this.mcq.isA = true;
    
  }
  onNext(){
    this.service.qnNo++;
    this.service.mcqNo = 0;
    
  }
  onPrevious(){
    this.service.qnNo--;
    this.service.mcqNo = 0;
    
  }
}
