export interface CalendarProps {
  selectedPlayer: string | null;
}

export interface SelectedDay {
  day: string;
  name: string;
}

export interface SelectedDays extends Array<SelectedDay> {
}

export interface FilteredByName {
  [day: string]: string;
}

export interface FilteredAllNames {
  [day: string]: string[];
}

export interface DateProps {
  currentDay: number;
  currentMonth: number;
  currentYear: number;
  firstDayOfMonth: number;
  daysOfMonth: string[];
}

export type Attack = {
  id: string;
  name: string;
  diceType: string;
  bonusDamage: string;
  bonusHit: string;
  range: string;
  type: string;
  profMod: string;
  proficient: boolean;
};

export type BackpackObj = {
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

export interface CharacterInterface {
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
  Equipment: BackpackObj[];
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
    TaggedThrows: [string | null, string | null];
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
