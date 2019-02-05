import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { caseresult } from '../shared/caseresult.model';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(private service : UserService) { }
  displayedColumns: string[] = ['name', 'mark'];
  //ELEMENT_DATA: caseresult[];
  dataSource; 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngOnInit() {
   
    this.service.getLeaderBoard(1).subscribe(
      (data : any) =>{
        this.service.leaderboard = data;
        //this.ELEMENT_DATA = data;
        this.dataSource = new MatTableDataSource<caseresult>(this.service.leaderboard);
         this.dataSource.paginator = this.paginator;
      }
    );
  }
  
}


