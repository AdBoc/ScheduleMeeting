import {
  CharacterInterface,
  Attack,
  BackpackObj,
  Effect,
  Cantrip,
  Spell,
  Action,
} from "../../ts/interfaces";
import * as immutable from "object-path-immutable";

export enum Types {
  INCREMENT_STAT = "INCREMENT_STAT",
  DECREMENT_STAT = "DECREMENT_STAT",
  CHANGE_STAT = "CHANGE_STAT",
  EDIT_TEXT = "EDIT_TEXT",
  ADD_TO_ARRAY = "ADD_TO_ARRAY",
  TAG_PROP = "TAG_PROP",
  DELETE_IN_ARRAY = "DELETE_IN_ARRAY",
  SET_CHARACTER = "SET_CHARACTER",
  SET_ARRAY = "SET_ARRAY",
  SET_ITEM_QTY = "SET_ITEM_QTY",
  CHANGE_EFFECT_STATUS = "CHANGE_EFFECT_STATUS",
  CHANGE_INSPIRATION = "CHANGE_INSPIRATION",
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
      };
};

type SettingsPayload = {
  [Types.INCREMENT_STAT]: {
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
    property:
      | "Attacks"
      | "Equipment"
      | "Effects"
      | "Cantrips"
      | "Spells"
      | "Actions"
      | "Other.TaggedSkills";
    newValue: Attack | BackpackObj | Effect | Cantrip | Spell | Action | string;
  };
  [Types.TAG_PROP]: {
    newArray: [string | null, string | null];
  };
  [Types.DELETE_IN_ARRAY]: {
    property:
      | "Attacks"
      | "Equipment"
      | "Effects"
      | "Cantrips"
      | "Spells"
      | "Actions"
      | "Other.TaggedSkills";
    id: string;
  };
  [Types.SET_CHARACTER]: {
    newCharacter: CharacterInterface;
  };
  [Types.SET_ARRAY]: {
    property: string;
    newArr: BackpackObj[] | Attack[] | string[] | number[];
  };
  [Types.SET_ITEM_QTY]: {
    id: string;
    newValue: number;
  };
  [Types.CHANGE_EFFECT_STATUS]: {
    newobj: any[];
  };
  [Types.CHANGE_INSPIRATION]: {
    newValue: boolean;
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
  },
  Stats: {
    Strength: 0,
    Dexterity: 0,
    Constitution: 0,
    Intelligence: 0,
    Wisdom: 0,
    Charisma: 0,
  },
  Skills: {
    Athletics: -5,
    Acrobatics: -5,
    SleightOfHand: -5,
    Stealth: -5,
    Arcana: -5,
    History: -5,
    Invesigation: -5,
    Nature: -5,
    Religion: -5,
    AnimalHandling: -5,
    Insight: -5,
    Medicine: -5,
    Perception: -5,
    Survival: -5,
    Deception: -5,
    Intimidation: -5,
    Performance: -5,
    Persuasion: -5,
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
    Story: "",
  },
  Attacks: [],
  Equipment: [],
  Effects: [],
  Cantrips: [],
  Spells: [],
  Actions: [],
  Other: {
    TaggedThrows: [null, null],
    TaggedSkills: [],
    Currency: {
      PP: 0,
      GP: 0,
      EP: 0,
      SP: 0,
      CP: 0,
    },
    Inspiration: false,
    SpellSlots: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ShortRestSlots: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    CurrentSlots: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    SpellProficiency: null,
  },
  DiceSim: {
    status: false,
    dices: [],
  },
};

export const reducer = (
  character: CharacterInterface,
  action: ScheetActions
): CharacterInterface => {
  switch (action.type) {
    case Types.INCREMENT_STAT:
      return immutable.update(character, action.payload.property, (v) => v + 1) as any;
    case Types.DECREMENT_STAT:
      return immutable.update(character, action.payload.property, (v) => v - 1) as any;
    case Types.CHANGE_STAT:
      return immutable.set(character, action.payload.property, +action.payload.newValue); //+"" = 0
    case Types.EDIT_TEXT:
      return immutable.set(character, action.payload.property, action.payload.newValue);
    case Types.ADD_TO_ARRAY:
      return immutable.push(character, action.payload.property, action.payload.newValue);
    case Types.DELETE_IN_ARRAY:
      return immutable.set(
        character,
        action.payload.property,
        ((character as any)[action.payload.property] as Array<any>).filter(
          (element) => element.id !== action.payload.id
        )
      );
    case Types.SET_ARRAY:
      return immutable.set(character, action.payload.property, action.payload.newArr);
    case Types.SET_CHARACTER:
      return action.payload.newCharacter;
    case Types.TAG_PROP:
      return {
        ...character,
        Other: {
          ...character.Other,
          TaggedThrows: action.payload.newArray,
        },
      };
    case Types.SET_ITEM_QTY:
      const itemIndex = character.Equipment.findIndex((item) => item.id === action.payload.id);
      const newItemsArray = character.Equipment.slice(0);
      newItemsArray[itemIndex].quantity = action.payload.newValue;
      return {
        ...character,
        Equipment: newItemsArray,
      };
    case Types.CHANGE_EFFECT_STATUS:
      return {
        ...character,
        Effects: action.payload.newobj,
      };
    case Types.CHANGE_INSPIRATION:
      return {
        ...character,
        Other: {
          ...character.Other,
          Inspiration: action.payload.newValue,
        },
      };
    default:
      return character;
  }
};
//czy te nested w spread syntax nie sa kopiowane przez referencje??
