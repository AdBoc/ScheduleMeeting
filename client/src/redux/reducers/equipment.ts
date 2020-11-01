import {EquipmentItem} from "../types";

const initialState = null as unknown as EquipmentItem[];

export function equipment(state = initialState, action:any) {
  switch (action.type) {
    default:
      return state;
  }
}