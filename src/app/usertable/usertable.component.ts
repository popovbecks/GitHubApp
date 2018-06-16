import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from "rxjs/index";
import {MatSort, MatTableDataSource} from '@angular/material';
import { UsersService } from "../users.service";

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {

  constructor(private userService: UsersService) { }
  dataSource;
  time;
  tableSource;
  data = this.userService.getUsers();
  n = 6;

  displayedColumns = ['#', 'avatar_url', 'login', 'id', 'type', 'site_admin'];
  redirectTo(url){
    let a = url.html_url;
    window.open(a);
  }
  loadMore() {
    this.time = this.tableSource;
    this.time = this.tableSource.slice(0, this.n);
    this.dataSource = new MatTableDataSource(this.time);
    this.n += 2;
    console.log(this.tableSource.slice(0, this.n))
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.data.subscribe(results => {
      if(!results){
        return;
      }
      this.tableSource = results;
      this.dataSource = new MatTableDataSource(this.tableSource.slice(0,4));
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
    });
  }

}
