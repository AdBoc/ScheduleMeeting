import {DECREMENT_SKILL, INCREMENT_SKILL, SkillActions, Skills, TAG_SKILL} from "../types";
import produce from "immer";

const initialState = null as unknown as Skills;

export function skills(skills = initialState, action: SkillActions): Skills {
  switch (action.type) {
    case INCREMENT_SKILL:
      if(skills[action.skillName].value === 5) return skills;
      return produce(skills, draftState => {
        draftState[action.skillName].value = ++draftState[action.skillName].value;
      })
    case DECREMENT_SKILL:
      if(skills[action.skillName].value === -5) return skills;
      return produce(skills, draftState => {
        draftState[action.skillName].value = --draftState[action.skillName].value;
      })
    case TAG_SKILL:
      return produce(skills, draftState => {
        draftState[action.skillName].isTagged = !draftState[action.skillName].isTagged;
      })
    default:
      return skills;
  }
}

//INCREMENT
//     case INCREMENT_SKILL:
//       return {
//         ...skills,
//         [action.skillName]: {
//           ...skills[action.skillName],
//           value: ++skills[action.skillName].value,
//         }
//      };