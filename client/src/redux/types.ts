export type Stats = {
  charisma: number;
  constitution: number;
  dexterity: number;
  intelligence: number;
  strength: number;
  wisdom: number;
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

type ChangeStat = {
  type: typeof CHANGE_CHARACTER_STAT;
  statName: keyof CharacterStats;
  newVal: number;
}

export type CharacterStatsActions = ChangeStat;

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

// {"characterStats":{"level":1,"temporaryHitPoints":1,"hitPoints":1,"armorClass":1,"initiative":1,"speed":1,"passivePerception":1},
//   "stats":{"strength":1,"dexterity":1,"constitution":1,"intelligence":1,"wisdom":1,"charisma":1},
//   "skills":{"athletics": {"value": -5, "isTagged": false},"acrobatics": {"value": -5, "isTagged": false},"sleightOfHand": {"value": -5, "isTagged": false},"stealth": {"value": -5, "isTagged": false},"arcana": {"value": -5, "isTagged": false},"history": {"value": -5, "isTagged": false},"investigation": {"value": -5, "isTagged": false},"nature": {"value": -5, "isTagged": false},"religion": {"value": -5, "isTagged": false},"animalHandling": {"value": -5, "isTagged": false},"insight": {"value": -5, "isTagged": false},"medicine": {"value": -5, "isTagged": false},"perception": {"value": -5, "isTagged": false},"survival": {"value": -5, "isTagged": false},"deception": {"value": -5, "isTagged": false},"intimidation": {"value": -5, "isTagged": false},"performance": {"value": -5, "isTagged": false},"persuasion": {"value": -5, "isTagged": false}},
//   "background":{"Name":"","Alignment":"","Background":"","Class":"","FeaturesAndTraits":"","ExperiencePoints":"","ProficienciesAndLanguage":"","Race":"","Story":""},
//   "attacks":[{"name":"Fist","diceType":"1d6","range":5,"bonusDamage":0,"bonusHit":0,"proficient":true,"profMod":"Strength","type":"Bludgeoning","id":"cd712c29-6419-4563-93ae-47b0c91463f5"}],
//   "equipment":[{"name":"item1","quantity":"5","type":"other","description":"dwadwadwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww","id":"a70b4333-5884-4625-8c60-2303424f1aee"},{"name":"item2","quantity":"10","type":"other","description":"","id":"9456ac7a-9af9-483a-b94e-1ef8d4900796"}],
//   "effects":[],
//   "spells":[],
//   "other":{"TaggedThrows":["Dexterity","Strength"],"TaggedSkills":[],"Currency":{"PP":0,"GP":0,"EP":0,"SP":0,"CP":0},"Inspiration":false,"SpellSlots":[0,0,0,0,0,0,0,0,0],"ShortRestSlots":[0,0,0,0,0,0,0,0,0],"CurrentSlots":[0,0,0,0,0,0,0,0,0],"SpellProficiency":"Constitution"}}
