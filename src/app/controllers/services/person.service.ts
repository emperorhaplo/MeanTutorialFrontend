import Person from '../../models/person';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PersonService {
    serverUrl = 'http://localhost:3000';
    personUrl = 'http://localhost:3000/api/person';

    constructor(
        private http: HttpClient
    ) { }

    getPeople(): Observable<Person[]> {
        return this.http.get(this.personUrl)
        .pipe(map(res => {
            return res["names"].docs as [Person];
        }))
    }
}
