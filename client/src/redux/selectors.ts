import {RootState} from "./reducers";
import {EquipmentItem, Spell} from "./types";

export const filteredEquipment = (sortingCriteria: { label: string, value: string }[]) => (state: RootState) => {
  if (sortingCriteria.length === 0) {
    return [...state.equipment].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    return state.equipment.reduce((accumulator, item) => {
      sortingCriteria.forEach(selected => {
        if(item.type === selected.value) accumulator.push(item);
      });
      return accumulator;
    }, [] as Array<EquipmentItem>).sort((a, b) => a.name.localeCompare(b.name));
  }
};

export const sortedAttacks = (state: RootState) => {
  return [...state.attacks].sort((a, b) => a.name.localeCompare(b.name));
};

export const sortedSpells = (sortingCriteria: { criteria: string; inverted: boolean }) => (state: RootState) => {
  const spells = [...state.spells].sort((a, b) => a[sortingCriteria.criteria as keyof Spell].localeCompare(b[sortingCriteria.criteria as keyof Spell]))
  if (sortingCriteria.inverted) spells.reverse();
  return spells;
};

export const activeEffects = (state: RootState) => {
  return state.effects.filter(effect => effect.active);
}