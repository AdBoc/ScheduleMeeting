import {
  CHANGE_CURRENCY_AMOUNT,
  CHANGE_MAX_SLOT_VALUE,
  CHANGE_SPELL_PROFICIENCY,
  CHANGE_STATUS,
  DECREMENT_CURRENT_SPELL_SLOT,
  Other,
  OtherActions,
  REST_SLOTS,
  TAG_ELEMENT
} from "../types";
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
    case CHANGE_MAX_SLOT_VALUE:
      return produce(other, draftState => {
        draftState.spellSlots[action.slotLevel] = action.newValue;
      });
    case DECREMENT_CURRENT_SPELL_SLOT:
      if (!other.currentSlots[action.slotLevel]) return other;
      return produce(other, draftState => {
        draftState.currentSlots[action.slotLevel] = --draftState.currentSlots[action.slotLevel];
      });
    case REST_SLOTS:
      return produce(other, draftState => {
        draftState.currentSlots = draftState.spellSlots;
      })
    default:
      return other;
  }
}