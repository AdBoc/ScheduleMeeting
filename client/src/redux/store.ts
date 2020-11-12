import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from './reducers';
import {loadStateFromStorage, saveStateToStorage} from "../utils/localStorage";
import {composeWithDevTools} from "redux-devtools-extension";
import api from "../utils/api";
import throttle from 'lodash/throttle';
import thunk from "redux-thunk";

const composeEnhancers = composeWithDevTools({});

const store = createStore(rootReducer, loadStateFromStorage(), composeEnhancers(
  applyMiddleware(thunk)
));

store.subscribe(() => saveStateToStorage({
  stats: store.getState().stats,
  spells: store.getState().spells,
  skills: store.getState().skills,
  other: store.getState().other,
  equipment: store.getState().equipment,
  effects: store.getState().effects,
  characterStats: store.getState().characterStats,
  background: store.getState().background,
  attacks: store.getState().attacks
}));

store.subscribe(throttle(() => {
  api.sendCharacter();
}, 2000));

export default store;