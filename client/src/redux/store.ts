import {createStore} from 'redux';
import {rootReducer} from './reducers';
import {loadStateFromStorage, saveStateToStorage} from "../utils/localStorage";
import {composeWithDevTools} from "redux-devtools-extension";
import api from "../utils/api";
import throttle from "lodash/throttle"

const store = createStore(rootReducer, loadStateFromStorage(), composeWithDevTools())

store.subscribe(() => saveStateToStorage({
  character: store.getState().character
}));

store.subscribe(throttle(() => {
  api.sendCharacter();
}, 2000));

export default store;
