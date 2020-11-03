import {Background, BackgroundActions, CHANGE_BACKGROUND_ELEMENT} from "../types";
import produce from "immer";

const initialState = null as unknown as Background;

export function background(background = initialState, action: BackgroundActions): Background {
  switch (action.type) {
    case CHANGE_BACKGROUND_ELEMENT:
      return produce(background, draftState => {
        draftState[action.element] = action.newValue;
      })
    default:
      return background;
  }
}