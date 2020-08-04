import { CharacterInterface } from "../../../ts/interfaces";
import immutable from 'object-path-immutable';

export enum Types {
  CHANGE_STAT = "CHANGE_STAT",
  INCREMENT_STAT = "INCREMENT_STAT",
  DECREMENT_STAT = "DECREMENT_STAT"
}

export type ContextProps = {
  children: React.ReactNode;
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  }
};

type SettingsPayload = {
  [Types.CHANGE_STAT]: {
    property: string;
    newValue: number;
  };
  [Types.INCREMENT_STAT]: {
    property: string;
  };
  [Types.DECREMENT_STAT]: undefined;
};

export type ScheetActions = ActionMap<SettingsPayload>[keyof ActionMap<SettingsPayload>];

export const initialCharacter: CharacterInterface = {
  PlayerName: "Grug",
  Level: 2,
  HitPoints: 15,
  MainStats: {
    ArmorClass: 15,
    Initiative: 2,
    Speed: 30,
    PassivePercepion: 12,
    ProficiencyBonus: 2,
    Inspiration: 1
  },
  Stats: {
    Strength: 18,
    Dexterity: 14,
    Constitution: 16,
    Intelligence: 7,
    Wisdom: 11,
    Charisma: 10
  },
  Skills: {
    Athletics: 1,
    Acrobatics: 1,
    SleightOfHand: 1,
    Stealth: 1,
    Arcana: 1,
    History: 1,
    Invesigation: 1,
    Nature: 1,
    Religion: 1,
    AnimalHandling: 1,
    Insight: 1,
    Medicine: 1,
    Perception: 1,
    Survival: 1,
    Deception: 1,
    Initimidation: 1,
    Performance: 1,
    Persuasion: 1
  },
  Story: {
    Class: "",
    Background: "",
    ExperiencePoints: "",
    Alignment: "",
    ProficienciesAndLanguage: "",
    FeaturesAndTraits: "",
    Story: ""
  }
}

export const sheetReducer = (character: CharacterInterface, action: ScheetActions): CharacterInterface => {
  switch (action.type) {
    case Types.CHANGE_STAT:
      return {
        ...character,
        MainStats: {
          ...character.MainStats,
          [action.payload.property]: action.payload.newValue
        }
      };
    case Types.INCREMENT_STAT:  // immutable.set(initialCharacter, action.payload.property, initialCharacter[action.payload.property] + 1);
      return {
        ...character,
        [action.payload.property]: character.Level + 1
      }
    case Types.DECREMENT_STAT:
      return character;
    default:
      return character;
  }
}