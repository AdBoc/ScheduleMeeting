import {ADD_EFFECT, CHANGE_EFFECT_STATUS, DELETE_EFFECT, Effect, EffectsActions} from "../types";
import produce from "immer";

const initialState = null as unknown as Effect[];

export function effects(effects = initialState, action: EffectsActions): Effect[] {
  switch (action.type) {
    case ADD_EFFECT:
      return produce(effects, draftState => {
        draftState.push(action.element);
      });
    case DELETE_EFFECT:
      const removeIndex = effects.map(effect => effect.id).indexOf(action.effectId);
      return produce(effects, draftState => {
        draftState.splice(removeIndex, 1);
      });
    case CHANGE_EFFECT_STATUS:
      const changeIndex = effects.findIndex((effect) => effect.id === action.effectId);
      return produce(effects, draftState => {
        draftState[changeIndex].active = !draftState[changeIndex].active;
      })
    default:
      return effects;
  }
}
