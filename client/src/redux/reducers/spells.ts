import {Spell} from "../types";

const initialState = null as unknown as Spell[];

export function spells(state = initialState, action:any) {
  switch (action.type) {
    default:
      return state;
  }
}