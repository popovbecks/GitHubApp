import { Injectable } from '@angular/core';
import  { HttpClient } from "@angular/common/http";
import { User } from "./models/user.module";
import { Observable } from "rxjs/index";

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }
  private serviceUrl = "https://api.github.com/users"
    getUsers():Observable<User[]>{

    return this.http.get<User[]>(this.serviceUrl)
    }

}
