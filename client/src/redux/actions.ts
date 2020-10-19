import {CHANGE_STAT, CharacterActions, DECREMENT_STAT, INCREMENT_STAT} from "./types";

export const incrementStat = (path: string): CharacterActions => ({
  type: INCREMENT_STAT,
  path
});

export const decrementStat = (path: string): CharacterActions => ({
  type: DECREMENT_STAT,
  path
});

export const changeStatValue = (path: string, newVal: number): CharacterActions => ({
  type: CHANGE_STAT,
  path,
  newVal
})