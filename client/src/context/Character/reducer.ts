import { CharacterInterface, Attack, BackpackObj } from "../../ts/interfaces";
import * as immutable from 'object-path-immutable';

export enum Types {
  INCREMENT_STAT = "INCREMENT_STAT",
  DECREMENT_STAT = "DECREMENT_STAT",
  CHANGE_STAT = "CHANGE_STAT",
  EDIT_TEXT = "EDIT_TEXT",
  ADD_TO_ARRAY = "ADD_TO_ARRAY",
  TAG_PROP = "TAG_PROP"
};

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
  [Types.INCREMENT_STAT]: { //undefined if property does not exist
    property: string;
  };
  [Types.DECREMENT_STAT]: {
    property: string;
  };
  [Types.CHANGE_STAT]: {
    property: string;
    newValue: number;
  };
  [Types.EDIT_TEXT]: {
    property: string;
    newValue: string;
  };
  [Types.ADD_TO_ARRAY]: {
    property: string;
    newValue: Attack[] | BackpackObj[];
  }
  [Types.TAG_PROP]: {
    newArray: [string | null, string | null];
  };
};

export type ScheetActions = ActionMap<SettingsPayload>[keyof ActionMap<SettingsPayload>];

export const initialCharacter: CharacterInterface = {
  TemporaryHitPoints: 1,
  MainStats: {
    Level: 0,
    HitPoints: 1,
    ArmorClass: 1,
    Initiative: 1,
    Speed: 1,
    PassivePercepion: 1,
    Inspiration: 0
  },
  Stats: {
    Strength: 0,
    Dexterity: 0,
    Constitution: 0,
    Intelligence: 0,
    Wisdom: 0,
    Charisma: 0
  },
  Skills: {
    Athletics: 0,
    Acrobatics: 0,
    SleightOfHand: 0,
    Stealth: 0,
    Arcana: 0,
    History: 0,
    Invesigation: 0,
    Nature: 0,
    Religion: 0,
    AnimalHandling: 0,
    Insight: 0,
    Medicine: 0,
    Perception: 0,
    Survival: 0,
    Deception: 0,
    Intimidation: 0,
    Performance: 0,
    Persuasion: 0
  },
  Story: {
    Name: "",
    Alignment: "",
    Background: "",
    Class: "",
    FeaturesAndTraits: "",
    ExperiencePoints: "",
    ProficienciesAndLanguage: "",
    Race: "",
    Story: ""
  },
  Attacks: [],
  Equipment: [],
  Other: {
    TaggedThrows: [null, null]
  }
};

export const reducer = (character: CharacterInterface, action: ScheetActions): CharacterInterface => {
  switch (action.type) {
    case Types.INCREMENT_STAT:
      return immutable.update(character, action.payload.property, v => v + 1) as any;
    case Types.DECREMENT_STAT:
      return immutable.update(character, action.payload.property, v => v - 1) as any;
    case Types.CHANGE_STAT:
      return immutable.set(character, action.payload.property, +action.payload.newValue); //+"" = 0
    case Types.ADD_TO_ARRAY:
      return immutable.push(character, action.payload.property, action.payload.newValue);
      case Types.TAG_PROP:
      return {
        ...character,
        Other: {
          ...character.Other,
          TaggedThrows: action.payload.newArray
        }
      };
    case Types.EDIT_TEXT:
      return {
        ...character,
        Story: {
          ...character.Story,
          [action.payload.property]: action.payload.newValue
        }
      };
    default:
      return character;
  };
};