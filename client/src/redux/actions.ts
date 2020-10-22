import {
  ADD_TO_ARRAY,
  CHANGE_STAT,
  CharacterActions,
  DECREMENT_STAT,
  DELETE_IN_ARRAY,
  EDIT_TEXT,
  FLIP_BOOL,
  INCREMENT_STAT,
  SET_ARRAY,
  TAG_ELEMENT
} from "./types";

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

export const setArray = (path: string, newArr: any[]): CharacterActions => ({
  type: SET_ARRAY,
  path,
  newArr
})

export const tagElement = (newVal: string): CharacterActions => ({
  type: TAG_ELEMENT,
  newVal
})

export const deleteInArray = (path: string, itemId: string): CharacterActions => ({
  type: DELETE_IN_ARRAY,
  path,
  itemId
})

export const addToArray = (path: string, newElement: object): CharacterActions => ({
  type: ADD_TO_ARRAY,
  path,
  newElement
})

export const editText = (path: string, newText: string | number): CharacterActions => ({
  type: EDIT_TEXT,
  path,
  newText
})

export const flipBool = (path: string): CharacterActions => ({
  type: FLIP_BOOL,
  path
})