import {CHANGE_STAT, Character, CharacterActions, DECREMENT_STAT, INCREMENT_STAT, SET_ARRAY} from "../types";
import * as immutable from "object-path-immutable";


const initialState = JSON.parse(localStorage.getItem("character")!) as Character;
//najwyzej najczesciej wystepujace
export const characterReducer = (character = initialState, action: CharacterActions): Character => {
  switch (action.type) {
    case SET_ARRAY:
      return immutable.set(character, action.path, action.newArr)
    case CHANGE_STAT:
      return immutable.set(character, action.path, action.newVal);
    case "DELETE_IN_ARRAY":
      return immutable.set(
        character,
        action.path,
        (character[action.path as keyof Character] as Array<any>).filter(element => element.id !== action.itemId)
      );
    case INCREMENT_STAT:
      return immutable.update(character, action.path, (v) => v + 1) as any;
    case DECREMENT_STAT:
      return immutable.update(character, action.path, (v) => v - 1) as any;
    case "TAG_ELEMENT":
      const newArr = [...character.Other.TaggedThrows];
      if (action.newVal === newArr[0]) {
        newArr[0] = null;
      } else if (action.newVal === newArr[1]) {
        newArr[1] = null;
      } else {
        newArr.pop();
        newArr.unshift(action.newVal);
      }
      return {
        ...character,
        Other: {
          ...character.Other,
          TaggedThrows: newArr
        }
      };
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