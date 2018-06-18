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
   dataSource: any;
  private temporary: any;
   tableSource: any;
  data = this.userService.getUsers();
  public n = 4;

  public displayedColumns = ['#', 'avatar_url', 'login', 'id', 'type', 'site_admin'];
  redirectTo(url){
    let a = url.html_url;
    window.open(a);
  }
  loadMore  () {
    this.data.subscribe(results => {
      if(!results){
        return;
      }
      this.tableSource = results.slice(0, this.n);
      this.dataSource = new MatTableDataSource(this.tableSource);
      this.dataSource.sort = this.sort;
      this.n += 4;
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource)
  }

  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.loadMore();
  }

}
