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
  displayedColumns = ['#', 'avatar_url', 'login', 'id', 'type', 'site_admin'];
  // tableSource = new MatTableDataSource(this.dataSource);

  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.userService.getUsers().subscribe(results => {
      if(!results){
        return;
      }
      this.dataSource = new MatTableDataSource(results);
      this.dataSource.sort = this.sort;
      console.log(this.dataSource)
    });
    //
  }

}
