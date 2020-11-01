import {CHANGE_CHARACTER_STAT, CharacterStats, CharacterStatsActions} from "../types";
import produce from "immer";

const initialState = null as unknown as CharacterStats;

export function characterStats(characterStats = initialState, action: CharacterStatsActions): CharacterStats {
  switch (action.type) {
    case CHANGE_CHARACTER_STAT:
      // if (/^[1-9][0-9]*$/.test(action.newVal.toString())) return characterStats;
      return produce(characterStats,draftState => {
        draftState[action.statName] = action.newVal;
      })
    default:
      return characterStats;
  }
}