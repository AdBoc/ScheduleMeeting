import {combineReducers} from 'redux';
import {attacks} from "./attacks";
import {background} from "./background";
import {characterStats} from "./characterStats";
import {effects} from "./effects";
import {equipment} from "./equipment";
import {other} from "./other";
import {skills} from "./skills";
import {stats} from "./stats";
import {spells} from "./spells";

const appReducer = combineReducers({stats, spells, skills, other, equipment, effects, characterStats, background, attacks});

const SET_CHARACTER = "SET_CHARACTER";
type SetCharacter = {
  type: typeof SET_CHARACTER;
  characterFromApi: RootState;
}
type RootReducerActions = SetCharacter;
export const setCharacter = (characterFromApi: RootState): RootReducerActions => ({
  type: SET_CHARACTER,
  characterFromApi
})

export const rootReducer = (state: any, action: any) => {
  if (action.type === SET_CHARACTER) {
    state = action.characterFromApi;
  }
  return appReducer(state, action);
}

export type RootState = ReturnType<typeof appReducer>;
