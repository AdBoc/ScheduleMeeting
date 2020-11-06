import {RootState} from "../redux/reducers";

export const loadStateFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('character');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveStateToStorage = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('character', serializedState);
  } catch (err) {
    console.warn(err);
  }
};