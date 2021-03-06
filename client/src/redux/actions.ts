import {
  ADD_ATTACK,
  ADD_EFFECT,
  ADD_ITEM,
  ADD_SPELL,
  Attack,
  AttacksActions,
  Background,
  BackgroundActions,
  CHANGE_BACKGROUND_ELEMENT,
  CHANGE_CHARACTER_STAT,
  CHANGE_CURRENCY_AMOUNT,
  CHANGE_EFFECT_STATUS,
  CHANGE_HP,
  CHANGE_MAX_SLOT_VALUE,
  CHANGE_QUANTITY,
  CHANGE_SKILL_FROM_STAT,
  CHANGE_SPELL_PROFICIENCY,
  CHANGE_STAT_VALUE,
  CHANGE_STATUS,
  CharacterStats,
  CharacterStatsActions,
  DECREMENT_CURRENT_SPELL_SLOT,
  DECREMENT_SKILL,
  DECREMENT_STAT,
  DELETE_ATTACK,
  DELETE_EFFECT,
  DELETE_ITEM,
  DELETE_SPELL,
  Effect,
  EffectsActions,
  EquipmentActions,
  EquipmentItem,
  INCREMENT_SKILL,
  INCREMENT_STAT,
  Other,
  OtherActions,
  REST_SLOTS,
  SkillActions,
  Skills,
  Spell,
  SpellsActions,
  Stats,
  StatsActions,
  TAG_ELEMENT,
  TAG_SKILL
} from "./types";
import {dndMath} from "../utils/dndMath";
import {Dispatch} from "redux";

const changeStatValue = (statName: keyof Stats, newValue: number): StatsActions => ({
  type: CHANGE_STAT_VALUE,
  statName,
  newValue
});

export const incrementSkill = (skillName: keyof Skills): SkillActions => ({
  type: INCREMENT_SKILL,
  skillName
})
export const decrementSkill = (skillName: keyof Skills): SkillActions => ({
  type: DECREMENT_SKILL,
  skillName
})

export const tagSkill = (skillName: keyof Skills): SkillActions => ({
  type: TAG_SKILL,
  skillName
})

const changeSkillFromStat = (statName: keyof Stats, newValue: number): SkillActions => ({
  type: CHANGE_SKILL_FROM_STAT,
  statName,
  newValue
})

export const changeCharacterStat = (statName: keyof CharacterStats, newVal: number): CharacterStatsActions => ({
  type: CHANGE_CHARACTER_STAT,
  statName,
  newVal
})

export const incrementStat = (statName: keyof CharacterStats): CharacterStatsActions => ({
  type: INCREMENT_STAT,
  statName
})

export const decrementStat = (statName: keyof CharacterStats): CharacterStatsActions => ({
  type: DECREMENT_STAT,
  statName
})

export const changeHp = (valeToSum: number): CharacterStatsActions => ({
  type: CHANGE_HP,
  valeToSum
})

export const changeStatus = (statName: "inspiration"): OtherActions => ({
  type: CHANGE_STATUS,
  statName
})

export const tagElement = (element: keyof Stats): OtherActions => ({
  type: TAG_ELEMENT,
  element
})

export const changeCurrencyAmount = (currency: keyof Other["currency"], newAmount: number): OtherActions => ({
  type: CHANGE_CURRENCY_AMOUNT,
  currency,
  newAmount
})

export const changeSpellProficiency = (proficiency: string): OtherActions => ({
  type: CHANGE_SPELL_PROFICIENCY,
  proficiency
})

export const decrementCurrentSpellSlot = (slotLevel: number): OtherActions => ({
  type: DECREMENT_CURRENT_SPELL_SLOT,
  slotLevel
})

export const restSlots = (): OtherActions => ({
  type: REST_SLOTS
})

export const changeMaxSlotValue = (slotLevel: number, newValue: number): OtherActions => ({
  type: CHANGE_MAX_SLOT_VALUE,
  slotLevel,
  newValue
})

export const changeBackground = (element: keyof Background, newValue: string): BackgroundActions => ({
  type: CHANGE_BACKGROUND_ELEMENT,
  element,
  newValue
})

export const addItem = (item: EquipmentItem): EquipmentActions => ({
  type: ADD_ITEM,
  item
})

export const deleteItem = (itemId: string): EquipmentActions => ({
  type: DELETE_ITEM,
  itemId
})

export const changeEqQuantity = (itemId: string, newValue: number): EquipmentActions => ({
  type: CHANGE_QUANTITY,
  itemId,
  newValue
})

export const addAttack = (element: Attack): AttacksActions => ({
  type: ADD_ATTACK,
  element
})

export const deleteAttack = (itemId: string): AttacksActions => ({
  type: DELETE_ATTACK,
  itemId
})

export const addEffect = (element: Effect): EffectsActions => ({
  type: ADD_EFFECT,
  element
})

export const deleteEffect = (effectId: string): EffectsActions => ({
  type: DELETE_EFFECT,
  effectId
})

export const changeEffectStatus = (effectId: string): EffectsActions => ({
  type: CHANGE_EFFECT_STATUS,
  effectId
})

export const addSpell = (element: Spell): SpellsActions => ({
  type: ADD_SPELL,
  element
})

export const deleteSpell = (itemId: string): SpellsActions => ({
  type: DELETE_SPELL,
  itemId
})

export const changeStatAndSkill = (statName: keyof Stats, newValue: number) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(changeStatValue(statName, newValue));
    const skillValue = dndMath.statModifier(newValue);
    return dispatch(changeSkillFromStat(statName, skillValue));
  }
}
