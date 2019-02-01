import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from "@angular/common/http";
import { CaseStudy } from './CaseStudy.model';
import { question } from './question.model';
import { mcqs } from './mcqs.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDetail : User;
  casestudy : CaseStudy;
  currentqid : number;
  questions : question[] = [];
  mcqs : mcqs[] = [];
  qnNo : number;
  readonly rootURL ="http://localhost:53737/api"
  
  constructor(private http : HttpClient) { }

  

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

  getMcq(questionid : number){
    console.log(questionid);
    return this.http.post(this.rootURL+'/Mcq' , questionid);
    
  }
}
