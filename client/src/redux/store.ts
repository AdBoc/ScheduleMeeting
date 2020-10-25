import {createStore} from 'redux';
import {rootReducer} from './reducers';
import {loadStateFromStorage, saveStateToStorage} from "../utils/localStorage";

//@ts-ignore
const store = createStore(rootReducer, loadStateFromStorage(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => saveStateToStorage({
  characterReducer: store.getState().characterReducer
}));

export default store;
