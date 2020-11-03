export type Stats = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export const CHANGE_STAT_VALUE = "CHANGE_STAT_VALUE";

type ChangeStatValue = {
  type: typeof CHANGE_STAT_VALUE;
  newValue: number;
  statName: keyof Stats;
}

export type StatsActions = ChangeStatValue;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Skill = {
  value: number;
  isTagged: boolean;
}

export type Skills = {
  acrobatics: Skill;
  athletics: Skill;
  animalHandling: Skill;
  arcana: Skill;
  deception: Skill;
  intimidation: Skill;
  insight: Skill;
  history: Skill;
  investigation: Skill;
  nature: Skill;
  religion: Skill;
  medicine: Skill;
  perception: Skill;
  performance: Skill;
  persuasion: Skill;
  survival: Skill;
  sleightOfHand: Skill;
  stealth: Skill;
}

export const INCREMENT_SKILL = "INCREMENT_SKILL";
export const DECREMENT_SKILL = "DECREMENT_SKILL";
export const TAG_SKILL = "TAG_SKILL";

type IncrementSkill = {
  type: typeof INCREMENT_SKILL;
  skillName: keyof Skills;
}

type DecrementSkill = {
  type: typeof DECREMENT_SKILL;
  skillName: keyof Skills;
}

type TagSkill = {
  type: typeof TAG_SKILL;
  skillName: keyof Skills;
}

export type SkillActions = IncrementSkill
  | DecrementSkill
  | TagSkill;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type CharacterStats = {
  armorClass: number;
  hitPoints: number;
  level: number;
  initiative: number;
  speed: number;
  passivePerception: number;
  temporaryHitPoints: number;
}

export const CHANGE_CHARACTER_STAT = "CHANGE_CHARACTER_STAT";
export const INCREMENT_STAT = "INCREMENT_STAT";
export const DECREMENT_STAT = "DECREMENT_STAT";
export const CHANGE_HP = "CHANGE_HP";

type ChangeStat = {
  type: typeof CHANGE_CHARACTER_STAT;
  statName: keyof CharacterStats;
  newVal: number;
}

type IncrementStat = {
  type: typeof INCREMENT_STAT;
  statName: keyof CharacterStats;
}

type DecrementStat = {
  type: typeof DECREMENT_STAT;
  statName: keyof CharacterStats;
}

type ChangeHp = {
  type: typeof CHANGE_HP;
  valeToSum: number;
}

export type CharacterStatsActions = ChangeStat
  | IncrementStat
  | DecrementStat
  | ChangeHp;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type Other = {
  taggedThrows: (string | null)[];
  taggedSkills: string[];
  currency: {
    pP: number;
    gP: number;
    eP: number;
    sP: number;
    cP: number;
  };
  inspiration: boolean;
  spellSlots: [number, number, number, number, number, number, number, number, number];
  currentSlots: [number, number, number, number, number, number, number, number, number];
  shortRestSlots: [number, number, number, number, number, number, number, number, number];
  spellProficiency: null | string;
}

export const CHANGE_STATUS = "CHANGE_STATUS";
export const TAG_ELEMENT = "TAG_ELEMENT";
export const CHANGE_CURRENCY_AMOUNT = "CHANGE_CURRENCY_AMOUNT";
export const CHANGE_SPELL_PROFICIENCY = "CHANGE_SPELL_PROFICIENCY";

type ChangeStatus = {
  type: typeof CHANGE_STATUS;
  statName: "inspiration";
}

type TagElement = {
  type: typeof TAG_ELEMENT;
  element: keyof Stats;
}

type ChangeSpellProficiency = {
  type: typeof CHANGE_SPELL_PROFICIENCY,
  proficiency: string;
}

type ChangeCurrencyAmount = {
  type: typeof CHANGE_CURRENCY_AMOUNT;
  currency: keyof Other["currency"];
  newAmount: number;
}

export type OtherActions = ChangeStatus
  | TagElement
  | ChangeCurrencyAmount
  | ChangeSpellProficiency;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type Background = {
  alignment: string;
  background: string;
  class: string;
  experiencePoints: string;
  featuresAndTraits: string;
  name: string;
  proficienciesAndLanguage: string;
  race: string;
  story: string;
}

export const CHANGE_BACKGROUND_ELEMENT = "CHANGE_BACKGROUND_ELEMENT";

type changeBackground = {
  type: typeof CHANGE_BACKGROUND_ELEMENT;
  element: keyof Background;
  newValue: string;
}

export type BackgroundActions = changeBackground;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type EquipmentItem = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  type: string;
};

export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";

type AddItem = {
  type: typeof ADD_ITEM;
  item: EquipmentItem;
}

type DeleteItem = {
  type: typeof DELETE_ITEM;
  itemId: string;
}

export type EquipmentActions = AddItem
  | DeleteItem;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

export const ADD_ATTACK = "ADD_ATTACK";
export const DELETE_ATTACK = "DELETE_ATTACK";

type AddAttack = {
  type: typeof ADD_ATTACK;
  element: Attack;
}

type DeleteAttack = {
  type: typeof DELETE_ATTACK;
  itemId: string;
}

export type AttacksActions = AddAttack
  | DeleteAttack;

export type Effect = {
  id: string;
  name: string;
  active: boolean;
  description: string;
};

export const ADD_EFFECT = "ADD_EFFECT";
export const DELETE_EFFECT = "DELETE_EFFECT";
export const CHANGE_EFFECT_STATUS = "CHANGE_EFFECT_STATUS";

type AddEffect = {
  type: typeof ADD_EFFECT;
  element: Effect;
}

type DeleteEffect = {
  type: typeof DELETE_EFFECT;
  effectId: string;
}

type ChangeEffectStatus = {
  type: typeof CHANGE_EFFECT_STATUS;
  effectId: string;
}

export type EffectsActions = AddEffect
  | DeleteEffect
  | ChangeEffectStatus;

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

export const ADD_SPELL = "ADD_SPELL";
export const DELETE_SPELL = "DELETE_SPELL";

type AddSpell = {
  type: typeof ADD_SPELL;
  element: Spell;
}

type DeleteSpell = {
  type: typeof DELETE_SPELL;
  itemId: string;
}

export type SpellsActions = AddSpell
  | DeleteSpell;

// {"characterStats":{"level":1,"temporaryHitPoints":1,"hitPoints":1,"armorClass":1,"initiative":1,"speed":1,"passivePerception":1},
//   "stats":{"strength":1,"dexterity":1,"constitution":1,"intelligence":1,"wisdom":1,"charisma":1},
//   "skills":{"athletics": {"value": -5, "isTagged": false},"acrobatics": {"value": -5, "isTagged": false},"sleightOfHand": {"value": -5, "isTagged": false},"stealth": {"value": -5, "isTagged": false},"arcana": {"value": -5, "isTagged": false},"history": {"value": -5, "isTagged": false},"investigation": {"value": -5, "isTagged": false},"nature": {"value": -5, "isTagged": false},"religion": {"value": -5, "isTagged": false},"animalHandling": {"value": -5, "isTagged": false},"insight": {"value": -5, "isTagged": false},"medicine": {"value": -5, "isTagged": false},"perception": {"value": -5, "isTagged": false},"survival": {"value": -5, "isTagged": false},"deception": {"value": -5, "isTagged": false},"intimidation": {"value": -5, "isTagged": false},"performance": {"value": -5, "isTagged": false},"persuasion": {"value": -5, "isTagged": false}},
//   "background":{"name":"","alignment":"","background":"","class":"","featuresAndTraits":"","experiencePoints":"","proficienciesAndLanguage":"","race":"","story":""},
//   "attacks":[{"name":"Fist","diceType":"1d6","range":5,"bonusDamage":0,"bonusHit":0,"proficient":true,"profMod":"Strength","type":"Bludgeoning","id":"cd712c29-6419-4563-93ae-47b0c91463f5"}],
//   "equipment":[{"name":"item1","quantity":"5","type":"other","description":"dwadwadwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","id":"a70b4333-5884-4625-8c60-2303424f1aee"},{"name":"item2","quantity":"10","type":"other","description":"","id":"9456ac7a-9af9-483a-b94e-1ef8d4900796"}],
//   "effects":[],
//   "spells":[],
//   "other":{"taggedThrows":["dexterity","strength"],"taggedSkills":[],"currency":{"pP":0,"gP":0,"eP":0,"sP":0,"cP":0},"inspiration":false,"spellSlots":[0,0,0,0,0,0,0,0,0],"shortRestSlots":[0,0,0,0,0,0,0,0,0],"currentSlots":[0,0,0,0,0,0,0,0,0],"spellProficiency":"constitution"}}
