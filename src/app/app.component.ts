import { Component } from '@angular/core';
import Person from './models/person';
import { PersonService } from './controllers/services/person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Person Tutorial';

  constructor(private personService: PersonService) {
  }

  public person: Person = new Person();
  personArray: Person[];

  updatePeople(): void {
    this.personService.getPeople()
    .subscribe(people => {
      this.personArray = people;
      console.log(people)
    })
  }

  ngOnInit(): void {
    this.updatePeople()
  }

  onDelete(person: Person) {
    console.log("deleting: " + person._id);
    this.personService.deletePerson(person._id)
    .subscribe(result => {
      this.updatePeople()
    });
  }
}
