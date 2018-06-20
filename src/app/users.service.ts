import { Injectable } from '@angular/core';
import  { HttpClient } from "@angular/common/http";
import { User } from "./models/user.module";
import { Observable } from "rxjs/index";

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }
    getUsers(counter): Observable<User[]>{

    return this.http.get<User[]>(`https://api.github.com/users?since=${counter}`)
    }

}
