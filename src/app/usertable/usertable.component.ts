import { Component, OnInit } from '@angular/core';
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
  ngOnInit() {
    this.userService.getUsers().subscribe(results => {
      if(!results){
        return;
      }
      this.dataSource = results;
      console.log(this.dataSource)
    })
  }

}
