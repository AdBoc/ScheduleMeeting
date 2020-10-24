import {RootState} from "./reducers";
import {EquipmentItem, Spell} from "./types";

export const filteredEquipment = (sortingCriteria: { label: string, value: string }[]) => (state: RootState) => {
  if (sortingCriteria.length === 0) {
    return [...state.characterReducer.Equipment].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    return state.characterReducer.Equipment.reduce((accumulator, item) => {
      sortingCriteria.forEach(selected => {
        if(item.type === selected.value) accumulator.push(item);
      });
      return accumulator;
    }, [] as Array<EquipmentItem>).sort((a, b) => a.name.localeCompare(b.name));
  }
};
export const sortedAttacks = (state: RootState) => {
  return [...state.characterReducer.Attacks].sort((a, b) => a.name.localeCompare(b.name));
};
export const sortedSpells = (sortingCriteria: { criteria: string; inverted: boolean }) => (state: RootState) => {
  const spells = [...state.characterReducer.Spells].sort((a, b) => a[sortingCriteria.criteria as keyof Spell].localeCompare(b[sortingCriteria.criteria as keyof Spell]))
  if (sortingCriteria.inverted) spells.reverse();
  return spells;
};