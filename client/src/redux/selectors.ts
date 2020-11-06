import {RootState} from "./reducers";
import {EquipmentItem, Spell} from "./types";
import {createSelector} from "reselect";

export const activeEffects = (state: RootState) => {
  return state.effects.filter(effect => effect.active);
};

const getAttacks = (state: RootState) => state.attacks;

export const selectSortedAttacks = createSelector(
  [getAttacks],
  attacks => [...attacks].sort((a, b) => a.name.localeCompare(b.name))
)

const getSpells = (state: RootState) => state.spells;
const getSpellsSortingCriteria = (_: any, sortingCriteria: { criteria: string; inverted: boolean }) => sortingCriteria;

export const selectSortedSpells = createSelector(
  [getSpells, getSpellsSortingCriteria],
  (spells, sortingCriteria) => {
    const sortedSpells = [...spells].sort((a, b) => a[sortingCriteria.criteria as keyof Spell].localeCompare(b[sortingCriteria.criteria as keyof Spell]))
    if (sortingCriteria.inverted) sortedSpells.reverse();
    return sortedSpells;
  }
)

const getEquipment = (state: RootState) => state.equipment;
const getEquipmentSortingCriteria = (_: any, sortingCriteria: { label: string, value: string }[]) => sortingCriteria;

export const selectSortedEquipment = createSelector(
  [getEquipment, getEquipmentSortingCriteria],
  (equipment, sortingCriteria) => {
    if (sortingCriteria.length === 0) {
      return [...equipment].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return equipment.reduce((accumulator, item) => {
        sortingCriteria.forEach(selected => {
          if (item.type === selected.value) accumulator.push(item);
        });
        return accumulator;
      }, [] as Array<EquipmentItem>).sort((a, b) => a.name.localeCompare(b.name));
    }
  }
)

const getCurrency = (state: RootState) => state.other.currency;

export const selectConvertedGoldValue = createSelector(
  [getCurrency],
  currency => {
    return Math.floor([currency.pP * 10, currency.gP, currency.eP / 2, currency.sP / 10, currency.cP / 100].reduce((sum, val) => sum + val));
  }
)