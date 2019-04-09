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
  editMode: Boolean;
  errorMessage: String

  updatePeople(): void {
    this.personService.getPeople()
    .subscribe(people => {
      this.personArray = people;
      console.log(people)
    })
  }

  ngOnInit(): void {
    this.updatePeople();
    this.editMode = false;
  }

  onDelete(person: Person) {
    console.log("deleting: " + person._id);
    this.personService.deletePerson(person._id)
    .subscribe(result => {
      this.updatePeople()
    });
  }

  onEdit() {
    this.editMode = !this.editMode
  }

  onAdd() {
    this.editMode = true
    this.personArray.push(new Person())
  }

  onSave(person: Person) {
    if(person._id) {
      console.log("saving: " + person._id)
      this.personService.updatePerson(person)
      .subscribe(result => {
        this.editMode = !this.editMode;
      })
    } else {
      this.personService.createPerson(person)
      .subscribe(result => {
        this.updatePeople()
        this.errorMessage = null
        this.editMode = false
      }, error => {
        console.log(error)
        this.errorMessage = error.error.message
      })
    }
  }
}
