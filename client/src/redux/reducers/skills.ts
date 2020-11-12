import {CHANGE_SKILL_FROM_STAT, DECREMENT_SKILL, INCREMENT_SKILL, SkillActions, Skills, TAG_SKILL} from "../types";
import produce from "immer";

const initialState = null as unknown as Skills;

export function skills(skills = initialState, action: SkillActions): Skills {
  switch (action.type) {
    case INCREMENT_SKILL:
      if (skills[action.skillName].value === 10) return skills;
      return produce(skills, draftState => {
        draftState[action.skillName].value = ++draftState[action.skillName].value;
      })
    case DECREMENT_SKILL:
      if (skills[action.skillName].value === -5) return skills;
      return produce(skills, draftState => {
        draftState[action.skillName].value = --draftState[action.skillName].value;
      })
    case TAG_SKILL:
      return produce(skills, draftState => {
        draftState[action.skillName].isTagged = !draftState[action.skillName].isTagged;
      })
    case CHANGE_SKILL_FROM_STAT:
      switch (action.statName) {
        case "strength":
          return produce(skills, draftState => {
            draftState.athletics.value = action.newValue;
          })
        case "dexterity":
          return produce(skills, draftState => {
            draftState.acrobatics.value = action.newValue;
            draftState.sleightOfHand.value = action.newValue;
            draftState.stealth.value = action.newValue;
          })
        case "intelligence":
          return produce(skills, draftState => {
            draftState.arcana.value = action.newValue;
            draftState.history.value = action.newValue;
            draftState.investigation.value = action.newValue;
            draftState.nature.value = action.newValue;
            draftState.religion.value = action.newValue;
          })
        case "wisdom":
          return produce(skills, draftState => {
            draftState.animalHandling.value = action.newValue;
            draftState.insight.value = action.newValue;
            draftState.medicine.value = action.newValue;
            draftState.perception.value = action.newValue;
            draftState.survival.value = action.newValue;
          })
        case "charisma":
          return produce(skills, draftState => {
            draftState.deception.value = action.newValue;
            draftState.intimidation.value = action.newValue;
            draftState.performance.value = action.newValue;
            draftState.persuasion.value = action.newValue;
          })
        default:
          return skills;
      }
    default:
      return skills;
  }
}