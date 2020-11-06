import {CHANGE_STAT_VALUE, Stats, StatsActions} from "../types";

const initialState = null as unknown as Stats;

export function stats(state = initialState, action: StatsActions): Stats {
  switch (action.type) {
    case CHANGE_STAT_VALUE:
      const {statName, newValue} = action;
      return {
        ...state,
        [statName]: newValue
      };
    default:
      return state;
  }
}