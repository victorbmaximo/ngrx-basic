import * as fromPersonActions from './person.actions';
import { Person } from '../person.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface PeopleState extends EntityState<Person> {}

export const peopleAdapter: EntityAdapter<Person> = createEntityAdapter<Person>(
  {
    selectId: (p: Person) => p._id,
  }
);

export const initialState: PeopleState = peopleAdapter.getInitialState({});

export function reducer(
  state = initialState,
  action: fromPersonActions.PersonActions
) {
  switch (action.type) {
    case fromPersonActions.PersonActionTypes.PERSON_DELETE:
      return peopleAdapter.removeOne(action.payload.id, state);

    case fromPersonActions.PersonActionTypes.PERSON_NEW:
      return peopleAdapter.addOne(action.payload.person, state);

    case fromPersonActions.PersonActionTypes.PERSON_UPDATE:
      return peopleAdapter.updateOne(
        { id: action.payload.id, changes: action.payload.changes },
        state
      );

    default:
      return state;
  }
}

// export const initialState: Person[] = [];

// export function reducer(
//   state = initialState,
//   action: fromPersonActions.PersonActions
// ) {
//   switch (action.type) {
//     case fromPersonActions.PersonActionTypes.PERSON_ALL:
//       return state;

//     case fromPersonActions.PersonActionTypes.PERSON_DELETE:
//       return state.filter((p) => p._id !== action.payload.id);

//     case fromPersonActions.PersonActionTypes.PERSON_NEW:
//       return state.concat([action.payload.person]);

//     case fromPersonActions.PersonActionTypes.PERSON_UPDATE:
//       let people = state.slice();
//       let i = people.findIndex((p) => p._id === action.payload.person._id);

//       if (i >= 0) {
//         people[i] = action.payload.person;
//       }

//       return people;

//     default:
//       return state;
//   }
// }
