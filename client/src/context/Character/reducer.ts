import { CharacterInterface, Attack, BackpackObj } from "../../ts/interfaces";
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
  REORDER_ARRAY = "REORDER_ARRAY",
  SET_ITEM_QTY = "SET_ITEM_QTY",
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
    property: string;
    newValue: Attack | BackpackObj;
  };
  [Types.TAG_PROP]: {
    newArray: [string | null, string | null];
  };
  [Types.DELETE_IN_ARRAY]: {
    property: "Equipment" | "Attacks";
    id: string;
  };
  [Types.SET_CHARACTER]: {
    newCharacter: CharacterInterface;
  };
  [Types.REORDER_ARRAY]: {
    property: "Equipment" | "Attacks";
    newArr: BackpackObj[] | Attack[];
  };
  [Types.SET_ITEM_QTY]: {
    id: string;
    newValue: number;
  };
};

export type ScheetActions = ActionMap<SettingsPayload>[keyof ActionMap<
  SettingsPayload
>];

export const initialCharacter: CharacterInterface = {
  TemporaryHitPoints: 1,
  MainStats: {
    Level: 0,
    HitPoints: 1,
    ArmorClass: 1,
    Initiative: 1,
    Speed: 1,
    PassivePercepion: 1,
    Inspiration: 0,
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
    Persuasion: 0,
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
    GP: 0,
  },
};

export const reducer = (
  character: CharacterInterface,
  action: ScheetActions
): CharacterInterface => {
  switch (action.type) {
    case Types.INCREMENT_STAT:
      return immutable.update(
        character,
        action.payload.property,
        (v) => v + 1
      ) as any;
    case Types.DECREMENT_STAT:
      return immutable.update(
        character,
        action.payload.property,
        (v) => v - 1
      ) as any;
    case Types.CHANGE_STAT:
      return immutable.set(
        character,
        action.payload.property,
        +action.payload.newValue
      ); //+"" = 0
    case Types.ADD_TO_ARRAY:
      return immutable.push(
        character,
        action.payload.property,
        action.payload.newValue
      );
    case Types.DELETE_IN_ARRAY:
      return immutable.set(
        character,
        action.payload.property,
        (character[action.payload.property] as Array<
          CharacterInterface["Equipment" | "Attacks"][0]
        >).filter((element) => element.id !== action.payload.id)
      );
    case Types.REORDER_ARRAY:
      return immutable.set(
        character,
        action.payload.property,
        action.payload.newArr
      );
    case Types.SET_CHARACTER:
      return {
        ...action.payload.newCharacter,
      };
    case Types.EDIT_TEXT:
      return {
        ...character,
        Story: {
          ...character.Story,
          [action.payload.property]: action.payload.newValue,
        },
      };
    case Types.TAG_PROP:
      return {
        ...character,
        Other: {
          ...character.Other,
          TaggedThrows: action.payload.newArray,
        },
      };
    case Types.SET_ITEM_QTY:
      const itemIndex = character.Equipment.findIndex(
        (item) => item.id === action.payload.id
      );
      const newItemArray = character.Equipment.slice(0);
      newItemArray[itemIndex].quantity = action.payload.newValue;
      return {
        ...character,
        Equipment: newItemArray,
      };
    default:
      return character;
  }
};
