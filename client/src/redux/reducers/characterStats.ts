import {CHANGE_CHARACTER_STAT, CHANGE_HP, CharacterStats, CharacterStatsActions, DECREMENT_STAT, INCREMENT_STAT} from "../types";
import produce from "immer";

const initialState = null as unknown as CharacterStats;

export function characterStats(characterStats = initialState, action: CharacterStatsActions): CharacterStats {
  switch (action.type) {
    case CHANGE_CHARACTER_STAT:
      return produce(characterStats, draftState => {
        draftState[action.statName] = action.newVal;
      })
    case INCREMENT_STAT:
      return produce(characterStats, draftState => {
        draftState[action.statName] = ++draftState[action.statName];
      })
    case DECREMENT_STAT:
      if (characterStats[action.statName] === 0) return characterStats;
      return produce(characterStats, draftState => {
        draftState[action.statName] = --draftState[action.statName];
      })
    case CHANGE_HP:
      let newHpValue = characterStats.temporaryHitPoints + action.valeToSum;
      if (newHpValue < 0) newHpValue = 0;
      else if (newHpValue > characterStats.hitPoints) newHpValue = characterStats.hitPoints;
      return produce(characterStats, draftState => {
        draftState.temporaryHitPoints = newHpValue;
      })
    default:
      return characterStats;
  }
}