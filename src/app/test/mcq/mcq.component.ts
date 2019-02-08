import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { QuestionComponent } from '../question/question.component';
import { NgForm } from '@angular/forms';
import { mcq } from 'src/app/shared/mcq.model';
import sha256, { Hash, HMAC } from "fast-sha256";
import { ShaService } from 'src/app/shared/sha.service';

@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.css']
})
export class McqComponent implements OnInit {

  constructor(private service : UserService,private route : Router , private hash : ShaService) { 
    
  }
  isA : boolean = false;
  selectedOption : string;
  mark : number;
  ngOnInit() {
      
    }
    
    async loadMcq(id : number,qid : number){
      var i :number ;
      var j :number ;
      this.service.getMcq(qid).subscribe(
        (data : any) =>{
           this.service.mcqs[id] = data;
          console.log("mcq fetched for " + qid)
          console.log("question "+id);
          var mcqid;
          this.service.attempts[id] = [];
          for(mcqid = 0; mcqid < this.service.mcqs[id].length ; mcqid++){
            this.service.attempts[id][mcqid] = 0;
          }
          /*if(id == this.service.questions.length -1 ){
            console.log("calling for func");
            this.func();
          }*/
          //this.func();
        }
      );
      console.log("call finished")
    }
    
    func(){
     console.log("inside func");
      var qid,mcqid;
      console.log("mcq length in func " +this.service.mcqs.length);
      for(qid =0 ;qid<this.service.questions.length;qid++){
        this.service.attempts = [];
        for(mcqid = 0; mcqid < this.service.mcqs[qid].length ; mcqid++){
          console.log("* ");
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
    strToBuffer (string) {
      let arrayBuffer = new ArrayBuffer(string.length * 1);
      let newUint = new Uint8Array(arrayBuffer);
      newUint.forEach((_, i) => {
        newUint[i] = string.charCodeAt(i);
      });
      return newUint;
    }
    onSubmit(){
      //let arrayBuffer = new ArrayBuffer(this.selectedOption.length * 1);
      console.log("inside submit");
     // console.log(nacl.util.encodeUTF8(sha256(this.strToBuffer(this.selectedOption)));
     // console.log(this.selectedOption)
      //shajs('sha256').update(this.selectedOption).digest('hex');
     // console.log(this.service.mcqs[this.service.qnNo][this.service.mcqNo].Answer)
      //console.log(this.selectedOption)

      this.selectedOption = this.hash.SHA256(this.selectedOption).toLocaleUpperCase();
      //console.log(this.service.mcqs[this.service.qnNo][this.service.mcqNo].Answer);
      if(this.service.mcqs[this.service.qnNo][this.service.mcqNo].Answer == this.selectedOption){
        console.log("inside");
        this.service.totalmark += this.service.mcqs[this.service.qnNo][this.service.mcqNo].marks ;
        this.service.currentProgress += this.service.mcqs[this.service.qnNo][this.service.mcqNo].marks;
        if(this.service.currentProgress >= this.service.badges[this.service.currentLevel + 1]){
          this.service.currentProgress = this.service.currentProgress - this.service.badges[this.service.currentLevel+1];
          this.service.currentLevel++;
          
          
          console.log(this.service.currentLevel);
          console.log(this.service.currentProgress);
          console.log(this.service.badges[this.service.currentLevel + 1]);
        }
        
        this.service.mcqs[this.service.qnNo][this.service.mcqNo].marks = 0;
      }
      else{
        //console.log("else");
       // this.service.mcqs[this.service.qnNo][this.service.mcqNo].marks =this.service.mcqs[this.service.qnNo][this.service.mcqNo].marks / 2;
       console.log(this.service.qnNo+" "+this.service.mcqNo);
       
       if(this.service.attempts[this.service.qnNo][this.service.mcqNo] == 2){
          //console.log("1else");
          this.service.mcqs[this.service.qnNo][this.service.mcqNo].marks = 0;
        }
        else{
        
          //console.log("else11");
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
