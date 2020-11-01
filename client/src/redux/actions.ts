import {
  CHANGE_CHARACTER_STAT,
  CHANGE_STAT_VALUE,
  CharacterStats,
  CharacterStatsActions,
  DECREMENT_SKILL,
  INCREMENT_SKILL,
  SkillActions,
  Skills,
  Stats,
  StatsActions,
  TAG_SKILL
} from "./types";

export const changeStatValue = (statName: keyof Stats, newValue: number): StatsActions => ({
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

export const changeCharacterStat = (statName: keyof CharacterStats, newVal: number): CharacterStatsActions => ({
  type: CHANGE_CHARACTER_STAT,
  statName,
  newVal
})