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

    createPerson(person: Person): Observable<any> {
        return this.http.post(this.personUrl, {name: person.name, age: person.age});
    }

    updatePerson(person: Person): Observable<any> {
        return this.http.put(this.personUrl, {id: person._id, name: person.name, age: person.age});
    }

    deletePerson(id: string): Observable<any> {
        return this.http.delete(this.personUrl + '/?id=' + id)
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred: ' +  error);
        return Promise.reject(error.message);
    }
}
