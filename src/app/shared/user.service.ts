import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from "@angular/common/http";
import { CaseStudy } from './CaseStudy.model';
import { question } from './question.model';
import { mcq } from './mcq.model';
import { caseresult } from './caseresult.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDetail : User;
  casestudy : CaseStudy;
  currentqid : number;
  mcqNo : number = 0;
  questions : question[] = [];
  mcqs : mcq[][] = [];
  //mcqs : mcqs[][] = [];
  qids : number[] = [];
  qnNo : number = 0;
  totalmark : number = 0 ;
  casestudyMark : number = 29;
  seconds: number;
  timer;
  leaderboard : caseresult[] = [];
  qnProgress: number;
  correctAnswerCount: number = 0;
  caseresult : caseresult;
  attempts : number[][] = [];
  readonly rootURL ="http://localhost:53737/api"
  badges : number[] = []//[0,8,8,8,6];
  levels : string[] = ["newbie" ,"bronze" , "silver","gold","perfect score"];
  currentLevel : number = 0 ;
  //nextBadge : number = 0;
  currentProgress : number = 0;
  constructor(private http : HttpClient) { }

  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  getLeaderBoard(caseid : number){
    return this.http.post(this.rootURL+'/Leaderboard',caseid);
  }
  postResult(result : caseresult){
    return this.http.post(this.rootURL+'/CaseResult',result);
  }

  postEmployee(userDetail : User){
    return this.http.post(this.rootURL+'/User',userDetail);
  }
  
  getCaseStudy(userDetail : User){
    //var id = userDetail.User_id;
    
    return this.http.post(this.rootURL+'/CaseStudy' , userDetail);
  } 

  getQuestion(caseid : number){
    console.log(caseid);
    return this.http.post(this.rootURL+'/Question' , caseid);
    
  }
  
  getMcq(qid : number){
    //console.log(qid);
    return this.http.post(this.rootURL+'/Mcq' , qid);
    
  }
  /*
  loadMcq(qids : number[]){
    this.http.post(this.rootURL+'/LoadMcq' ,qids);
  }*/
}
