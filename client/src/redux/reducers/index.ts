import {combineReducers} from 'redux';
import {attacks} from "./attacks";
import {background} from "./background";
import {characterStats} from "./characterStats";
import {effects} from "./effects";
import {equipment} from "./equipment";
import {other} from "./other";
import {skills} from "./skills";
import {stats} from "./stats";
import {spells} from "./spells";

export const rootReducer = combineReducers({stats, spells, skills, other, equipment, effects, characterStats, background, attacks});
export type RootState = ReturnType<typeof rootReducer>