import {ADD_ITEM, CHANGE_QUANTITY, DELETE_ITEM, EquipmentActions, EquipmentItem} from "../types";
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
    case CHANGE_QUANTITY:
      if(!action.newValue) return equipment;
      const editIndex = equipment.map(item => item.id).indexOf(action.itemId);
      return produce(equipment, draftState => {
        draftState[editIndex].quantity = action.newValue;
      })
    default:
      return equipment;
  }
}