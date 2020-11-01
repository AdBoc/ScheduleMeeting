import {Attack} from "../types";

const initialState = null as unknown as Attack[];

export function attacks(state = initialState, action:any) {
  switch (action.type) {
    default:
      return state;
  }
}