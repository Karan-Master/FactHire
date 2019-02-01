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

  ngOnInit() {

   // this.resetForm();
    
    this.service.getQuestion(1).subscribe(
      (data : any) =>{
        console.log("calling http post for question");
        this.service.questions = data;
        
        this.service.qnNo = 0;
        this.service.currentqid = this.service.questions[this.service.qnNo].Question_Id;
        this.mcq.getMcqs();
        console.log(this.service.questions[this.service.qnNo].Instructions);
      }
    );
  }
  //@Output() myEvent = new EventEmitter();


  /*resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    
  }*/
  OnNext(){
    this.service.qnNo++;
    this.service.currentqid = this.service.questions[this.service.qnNo].Question_Id;
    this.mcq.getMcqs();
  }
}
