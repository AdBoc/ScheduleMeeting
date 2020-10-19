import {CHANGE_STAT, Character, CharacterActions, DECREMENT_STAT, INCREMENT_STAT} from "../types";
import * as immutable from "object-path-immutable";


const initialState = JSON.parse(localStorage.getItem("character")!) as Character;

export const characterReducer = (character = initialState, action: CharacterActions): Character => {
  switch (action.type) {
    case INCREMENT_STAT:
      console.log(action.path)
      return immutable.update(character, action.path, (v) => v + 1) as any;
    case DECREMENT_STAT:
      return immutable.update(character, action.path, (v) => v + 1) as any;
    case CHANGE_STAT:
      return immutable.set(character, action.path, action.newVal);
    default:
      return character;
  }
}

// function setValue(obj: any, keys: any, val: any){
//   keys.split(".").forEach(function(itm: any, i: any, arr: any){
//     if (i == arr.length - 1) obj[itm] = val;
//     else obj = obj[itm];
//   });
// }