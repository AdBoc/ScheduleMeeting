export const INCREMENT_STAT = "INCREMENT_STAT";
export const DECREMENT_STAT = "DECREMENT_STAT";
export const CHANGE_STAT = "CHANGE_STAT";
export const CHANGE_BOOL = "CHANGE_BOOL";
export const EDIT_TEXT = "EDIT_TEXT";
export const ADD_TO_ARRAY = "ADD_TO_ARRAY";
export const TAG_PROP = "TAG_PROP";
export const DELETE_IN_ARRAY = "DELETE_IN_ARRAY";
export const SET_CHARACTER = "SET_CHARACTER";
export const SET_ARRAY = "SET_ARRAY";
export const SET_ITEM_QTY = "SET_ITEM_QTY";
export const CHANGE_EFFECT_STATUS = "CHANGE_EFFECT_STATUS";
export const DELETE_DICE = "DELETE_DICE";
export const TAG_ELEMENT = "TAG_ELEMENT";

interface IncrementStat {
  type: typeof INCREMENT_STAT;
  path: string;
}

interface DecrementStat {
  type: typeof DECREMENT_STAT;
  path: string;
}

interface ChangeStat {
  type: typeof CHANGE_STAT;
  path: string;
  newVal: number;
}

interface SetArray {
  type: typeof SET_ARRAY;
  path: string;
  newArr: EquipmentItem[] | Attack[] | string[] | number[];
}

interface TagElement {
  type: typeof TAG_ELEMENT;
  newVal: string;
}

interface DeleteInArray {
  type: typeof DELETE_IN_ARRAY;
  path: string;
  itemId: string;
}

export type CharacterActions = IncrementStat
  | DecrementStat
  | ChangeStat
  | SetArray
  | TagElement
  | DeleteInArray;

export type Attack = {
  id: string;
  name: string;
  diceType: string;
  bonusDamage: number;
  bonusHit: number;
  range: number;
  type: string;
  profMod: string;
  proficient: boolean;
};

export type EquipmentItem = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  type: string;
};

export type Effect = {
  id: string;
  name: string;
  active: boolean;
  description: string;
};

export type Dice = {
  number: number;
  value: number;
};

export type Spell = {
  id: string;
  name: string;
  level: string;
  school: string;
  castingTime: string;
  range: string;
  components: string;
  description: string;
};

export interface Character {
  TemporaryHitPoints: number;
  MainStats: {
    ArmorClass: number;
    HitPoints: number;
    Level: number;
    Initiative: number;
    Speed: number;
    PassivePerception: number;
  };
  Stats: {
    Charisma: number;
    Constitution: number;
    Dexterity: number;
    Intelligence: number;
    Strength: number;
    Wisdom: number;
  };
  Skills: {
    Acrobatics: number;
    Athletics: number;
    AnimalHandling: number;
    Arcana: number;
    Deception: number;
    Intimidation: number;
    Insight: number;
    History: number;
    Investigation: number;
    Nature: number;
    Religion: number;
    Medicine: number;
    Perception: number;
    Performance: number;
    Persuasion: number;
    Survival: number;
    SleightOfHand: number;
    Stealth: number;
  };
  Attacks: Attack[];
  Equipment: EquipmentItem[];
  Effects: Effect[];
  Spells: Spell[];
  Story: {
    Alignment: string;
    Background: string;
    Class: string;
    ExperiencePoints: string;
    FeaturesAndTraits: string;
    Name: string;
    ProficienciesAndLanguage: string;
    Race: string;
    Story: string;
  };
  Other: {
    TaggedThrows: (string | null)[];
    TaggedSkills: string[];
    Currency: {
      PP: number;
      GP: number;
      EP: number;
      SP: number;
      CP: number;
    };
    Inspiration: boolean;
    SpellSlots: [number, number, number, number, number, number, number, number, number];
    CurrentSlots: [number, number, number, number, number, number, number, number, number];
    ShortRestSlots: [number, number, number, number, number, number, number, number, number];
    SpellProficiency: null | string;
  };
  DiceSim: {
    status: boolean;
    dices: Dice[];
  };
}
