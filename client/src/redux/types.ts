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
export const CHANGE_SKILL_FROM_STAT = "CHANGE_SKILL_FROM_STAT";

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

type ChangeSkillFromStat = {
  type: typeof CHANGE_SKILL_FROM_STAT;
  statName: keyof Stats;
  newValue: number;
}

export type SkillActions = IncrementSkill
  | DecrementSkill
  | TagSkill
  | ChangeSkillFromStat;

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
  spellProficiency: null | string;
}

export const CHANGE_STATUS = "CHANGE_STATUS";
export const TAG_ELEMENT = "TAG_ELEMENT";
export const CHANGE_CURRENCY_AMOUNT = "CHANGE_CURRENCY_AMOUNT";
export const CHANGE_SPELL_PROFICIENCY = "CHANGE_SPELL_PROFICIENCY";
export const DECREMENT_CURRENT_SPELL_SLOT = "DECREMENT_CURRENT_SPELL_SLOT";
export const CHANGE_MAX_SLOT_VALUE = "CHANGE_MAX_SLOT_VALUE";
export const REST_SLOTS = "REST_SLOTS";

type ChangeStatus = {
  type: typeof CHANGE_STATUS;
  statName: "inspiration";
}

type TagElement = {
  type: typeof TAG_ELEMENT;
  element: keyof Stats;
}

type ChangeSpellProficiency = {
  type: typeof CHANGE_SPELL_PROFICIENCY;
  proficiency: string;
}

type ChangeCurrencyAmount = {
  type: typeof CHANGE_CURRENCY_AMOUNT;
  currency: keyof Other["currency"];
  newAmount: number;
}

type DecrementCurrentSpellSlot = {
  type: typeof DECREMENT_CURRENT_SPELL_SLOT;
  slotLevel: number;
}

type ChangeMaxSlotValue = {
  type: typeof CHANGE_MAX_SLOT_VALUE;
  slotLevel: number;
  newValue: number;
}

type RestSlots = {
  type: typeof REST_SLOTS;
}

export type OtherActions = ChangeStatus
  | TagElement
  | ChangeCurrencyAmount
  | ChangeSpellProficiency
  | DecrementCurrentSpellSlot
  | ChangeMaxSlotValue
  | RestSlots;

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
export const CHANGE_QUANTITY = "CHANGE_QUANTITY";

type AddItem = {
  type: typeof ADD_ITEM;
  item: EquipmentItem;
}

type DeleteItem = {
  type: typeof DELETE_ITEM;
  itemId: string;
}

type ChangeEqQuantity = {
  type: typeof CHANGE_QUANTITY;
  itemId: string;
  newValue: number;
}

export type EquipmentActions = AddItem
  | DeleteItem
  | ChangeEqQuantity;

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


// /*
// *Count new skills object based on changed Stat
//  */
// public generateNewSkills(skills: RootState["skills"], newValue: number, name: string): RootState["skills"] {
//   const newSkills = {...skills};
//   const newMod = this.statModifier(newValue);
//   switch (name) {
//     case "Strength":
//       newSkills.athletics.value = newMod;
//       break;
//     case "Dexterity":
//       newSkills.acrobatics.value = newMod;
//       newSkills.sleightOfHand.value = newMod;
//       newSkills.stealth.value = newMod;
//       break;
//     case "Intelligence":
//       newSkills.arcana.value = newMod;
//       newSkills.history.value = newMod;
//       newSkills.investigation.value = newMod;
//       newSkills.nature.value = newMod;
//       newSkills.religion.value = newMod;
//       break;
//     case "Wisdom":
//       newSkills.animalHandling.value = newMod;
//       newSkills.insight.value = newMod;
//       newSkills.medicine.value = newMod;
//       newSkills.perception.value = newMod;
//       newSkills.survival.value = newMod;
//       break;
//     case "Charisma":
//       newSkills.deception.value = newMod;
//       newSkills.intimidation.value = newMod;
//       newSkills.performance.value = newMod;
//       newSkills.persuasion.value = newMod;
//       break;
//   }
//   return newSkills;
// }
