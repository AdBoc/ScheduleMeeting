import {ADD_SPELL, DELETE_SPELL, Spell, SpellsActions} from "../types";
import produce from "immer";

const initialState = null as unknown as Spell[];

export function spells(spells = initialState, action: SpellsActions): Spell[] {
  switch (action.type) {
    case ADD_SPELL:
      return produce(spells, draftState => {
        draftState.push(action.element);
      });
    case DELETE_SPELL:
      const removeIndex = spells.map(attack => attack.id).indexOf(action.itemId);
      return produce(spells, draftState => {
        draftState.splice(removeIndex, 1);
      });
    default:
      return spells;
  }
}