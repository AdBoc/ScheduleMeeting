import {createStore} from 'redux';
import {rootReducer} from './reducers';
import {loadStateFromStorage} from "../utils/localStorage";
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(rootReducer, loadStateFromStorage(), composeWithDevTools())

// store.subscribe(() => saveStateToStorage({
//   stats: store.getState().stats,
//   spells: store.getState().spells,
//   skills: store.getState().skills,
//   other: store.getState().other,
//   equipment: store.getState().equipment,
//   effects: store.getState().effects,
//   characterStats: store.getState().characterStats,
//   background: store.getState().background,
//   attacks: store.getState().attacks
// }));

// store.subscribe(throttle(() => {
//   api.sendCharacter();
// }, 2000));

export default store;
