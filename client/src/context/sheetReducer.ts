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
  PlayerName: "Grug",
  TemporaryHitPoints: 15,
  MainStats: {
    Level: 2,
    HitPoints: 15,
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
    Intimidation: 1,
    Performance: 1,
    Persuasion: 1
  },
  Story: {
    Alignment: "",
    Background: "",
    Class: "",
    FeaturesAndTraits: "",
    ExperiencePoints: "",
    ProficienciesAndLanguage: "",
    Race: "Orc",
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