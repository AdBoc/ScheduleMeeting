import {ADD_ITEM, DELETE_ITEM, EquipmentActions, EquipmentItem} from "../types";
import produce from "immer";

const initialState = null as unknown as EquipmentItem[];

export function equipment(equipment = initialState, action: EquipmentActions): EquipmentItem[] {
  switch (action.type) {
    case ADD_ITEM:
      return produce(equipment, draftState => {
        draftState.push(action.item);
      })
    case DELETE_ITEM:
      const removeIndex = equipment.map(item => item.id).indexOf(action.itemId);
      return produce(equipment, draftState => {
        draftState.splice(removeIndex, 1);
      });
    default:
      return equipment;
  }
}