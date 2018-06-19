import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { UsersService } from "../users.service";

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {

  constructor(private userService: UsersService) { }
   public dataSource: any;
  private temporaryArray: any = [];
   public tableSource: any;
  public cutArrayNumber = 30;
  public counter;

  public displayedColumns = ['#', 'avatar_url', 'login', 'id', 'type', 'site_admin'];
  redirectTo(url){
    let a = url.html_url;
    window.open(a);
  }
  loadMore  () {
    this.counter = this.tableSource[this.tableSource.length - 1].id;
    this.userService.getUsers(this.counter).subscribe(results => {
      if(!results){
        return;
      }
      this.temporaryArray = results.slice(0, this.cutArrayNumber);
      this.tableSource = this.temporaryArray.reduce((coll, item)=> {
        coll.push( item );
        return coll;
      }, this.tableSource );
      console.log(this.temporaryArray)
      this.dataSource = new MatTableDataSource(this.tableSource);
      this.dataSource.sort = this.sort;
      this.temporaryArray = [];
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.userService.getUsers(0).subscribe(results => {
      if(!results){
        return;
      }
      this.tableSource = results.slice(0, this.cutArrayNumber);
      this.dataSource = new MatTableDataSource(this.tableSource);
      this.dataSource.sort = this.sort;
  });
}
}
