import { CharacterInterface, Attack, BackpackObj } from "../ts/interfaces";
import * as immutable from 'object-path-immutable';

export enum Types {
  INCREMENT_STAT = "INCREMENT_STAT",
  DECREMENT_STAT = "DECREMENT_STAT",
  SWITCH_STAT = "SWITCH_STAT",
  EDIT_TEXT = "EDIT_TEXT",
  ADD_ATTACK = "ADD_ATTACK",
  ADD_EQUIPMENT = "ADD_EQUIPMENT"
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
  [Types.SWITCH_STAT]: {
    property: string;
    newValue: number;
  };
  [Types.EDIT_TEXT]: {
    property: string;
    newValue: string;
  };
  [Types.ADD_ATTACK]: {
    attackData: Attack;
  }
  [Types.ADD_EQUIPMENT]: {
    newItem: BackpackObj;
  }
};

export type ScheetActions = ActionMap<SettingsPayload>[keyof ActionMap<SettingsPayload>];

export const initialCharacter: CharacterInterface = {
  PlayerName: "Name",
  TemporaryHitPoints: 1,
  MainStats: {
    Level: 0,
    HitPoints: 1,
    ArmorClass: 1,
    Initiative: 1,
    Speed: 1,
    PassivePercepion: 1,
    ProficiencyBonus: 1,
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
  Equipment: []
};

export const sheetReducer = (character: CharacterInterface, action: ScheetActions): CharacterInterface => {
  switch (action.type) {
    case Types.INCREMENT_STAT:
      return immutable.update(character, action.payload.property, v => v + 1) as any;
    case Types.DECREMENT_STAT:
      return immutable.update(character, action.payload.property, v => v - 1) as any;
    case Types.SWITCH_STAT:
      return immutable.set(character, action.payload.property, +action.payload.newValue);
    case Types.ADD_ATTACK:
      const copyAttack = character.Attacks.concat(action.payload.attackData);
      return {
        ...character,
        Attacks: copyAttack
      }
    case Types.ADD_EQUIPMENT:
      const copyEquipment = character.Equipment.concat(action.payload.newItem);
      return {
        ...character,
        Equipment: copyEquipment
      }
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