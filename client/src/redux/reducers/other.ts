import {CHANGE_CURRENCY_AMOUNT, CHANGE_SPELL_PROFICIENCY, CHANGE_STATUS, Other, OtherActions, TAG_ELEMENT} from "../types";
import produce from "immer";

const initialState = null as unknown as Other;

export function other(other = initialState, action: OtherActions): Other {
  switch (action.type) {
    case CHANGE_STATUS:
      return produce(other, draftState => {
        draftState[action.statName] = !draftState[action.statName];
      })
    case TAG_ELEMENT:
      return produce(other, draftState => {
        const findIndex = draftState.taggedThrows.findIndex((taggedThrow) => action.element === taggedThrow);
        if (findIndex === -1) {
          draftState.taggedThrows.shift();
          draftState.taggedThrows.push(action.element);
        } else {
          draftState.taggedThrows[findIndex] = null;
        }
      })
    case CHANGE_CURRENCY_AMOUNT:
      return produce(other, draftState => {
        draftState.currency[action.currency] = action.newAmount;
      })
    case CHANGE_SPELL_PROFICIENCY:
      return produce(other, draftState => {
        draftState.spellProficiency = action.proficiency;
      })
    default:
      return other;
  }
}