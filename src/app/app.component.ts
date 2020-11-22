import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './person.model';
import * as faker from 'faker';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import {
  PersonAll,
  PersonDelete,
  PersonNew,
  PersonUpdate,
} from './store/person.actions';

import * as fromPersonSelectors from './store/person.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  people$: Observable<Person[]>;

  ngOnInit() {
    this.store.dispatch(new PersonAll());
    this.people$ = this.store.select(fromPersonSelectors.selectAll);
  }

  addNew(): void {
    const person: Person = {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
      age: Math.round(Math.random() * 100),
      _id: new Date().getMilliseconds().toString(),
    };

    this.store.dispatch(new PersonNew({ person }));
  }

  update(p: Person) {
    console.log(p);

    // p.name = faker.name.findName();
    // p.address = faker.address.streetAddress();
    // p.city = faker.address.city();
    // p.country = faker.address.country();
    // p.age = Math.round(Math.random() * 100);

    const updatePerson = {
      name: faker.name.findName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
      age: Math.round(Math.random() * 100),
      _id: p._id,
    };

    this.store.dispatch(new PersonUpdate({ id: p._id, changes: updatePerson }));
  }

  delete(p: Person): void {
    this.store.dispatch(new PersonDelete({ id: p._id }));
  }
}
