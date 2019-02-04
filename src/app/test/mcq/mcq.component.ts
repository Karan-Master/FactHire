import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { QuestionComponent } from '../question/question.component';
import { NgForm } from '@angular/forms';
import { mcq } from 'src/app/shared/mcq.model';

@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.css']
})
export class McqComponent implements OnInit {

  constructor(private service : UserService,private route : Router) { 
    
  }
  isA : boolean = false;
  selectedOption : string;
  mark : number;
  ngOnInit() {
      
    }
    
    loadMcq(id : number,qid : number){
      var i :number ;
      var j :number ;
      this.service.getMcq(qid).subscribe(
        (data : any) =>{
          this.service.mcqs[id]  = data;
        }
      );
      console.log(this.service.mcqs.length)
    }
    func(){
      //console.log("attempts filled");
      var qid,mcqid;
      //console.log(this.service.mcqs.length);
      for(qid =0 ;qid<this.service.questions.length;qid++){
        
        for(mcqid = 0; mcqid < this.service.mcqs[qid].length ; mcqid++){
          this.service.attempts[qid][mcqid] = 0; 
         
        }
      }

      console.log("attempts filled");
    } 
    onNext(){
      this.service.mcqNo++;
    }
    onPrevious(){
      this.service.mcqNo--;
    }
    onSubmit(){
      if(this.service.mcqs[this.service.qnNo][this.service.mcqNo].Answer == this.selectedOption){
        console.log("inside");
        this.service.totalmark += this.service.mcqs[this.service.qnNo][this.service.mcqNo].marks ;
        this.service.mcqs[this.service.qnNo][this.service.mcqNo].marks = 0;
      }
      else{
        console.log("else");
       // this.service.mcqs[this.service.qnNo][this.service.mcqNo].marks =this.service.mcqs[this.service.qnNo][this.service.mcqNo].marks / 2;
       console.log(this.service.qnNo+" "+this.service.mcqNo);
       
       if(this.service.attempts[this.service.qnNo][this.service.mcqNo] == 3){
          console.log("1else");
          this.service.mcqs[this.service.qnNo][this.service.mcqNo].marks = 0;
        }
        else{
          console.log("else11");
        this.service.mcqs[this.service.qnNo][this.service.mcqNo].marks =this.service.mcqs[this.service.qnNo][this.service.mcqNo].marks / 2;
        this.service.attempts[this.service.qnNo][this.service.mcqNo] +=1;
        }
      }
    }
    radioChangeHandler(event :any){
      this.selectedOption = event.target.value;
      console.log(this.selectedOption);
    }
}
