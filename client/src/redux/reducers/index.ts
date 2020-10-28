import {combineReducers} from 'redux';
import {characterReducer} from './character';

export const rootReducer = combineReducers({character: characterReducer});
export type RootState = ReturnType<typeof rootReducer>