import {ADD_ATTACK, Attack, AttacksActions, DELETE_ATTACK} from "../types";
import produce from "immer";

const initialState = null as unknown as Attack[];

export function attacks(attacks = initialState, action: AttacksActions): Attack[] {
  switch (action.type) {
    case ADD_ATTACK:
      return produce(attacks, draftState => {
        draftState.push(action.element);
      });
    case DELETE_ATTACK:
      const removeIndex = attacks.map(attack => attack.id).indexOf(action.itemId);
      return produce(attacks, draftState => {
        draftState.splice(removeIndex, 1);
      });
    default:
      return attacks;
  }
}