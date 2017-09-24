
import { User } from './user';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Injectable()
export class StudentService {
    constructor(
        private http: Http) { }


    addStudent(model: User): Observable<User> {
        return null
    }


}