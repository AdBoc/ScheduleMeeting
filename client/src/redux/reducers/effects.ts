import {Effect} from "../types";

const initialState = null as unknown as Effect[];

export function effects(state = initialState, action:any) {
  switch (action.type) {
    default:
      return state;
  }
}