export interface CalendarProps {
  selectedPlayer: string | null;
}

export interface SelectedDay {
  day: string;
  name: string;
}

export interface SelectedDays extends Array<SelectedDay> {}

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

//Character Sheet
export type Tabs =
  | "stats"
  | "skills"
  | "savingThrows"
  | "allActions"
  | "equipment"
  | "story"
  | "quickAccess";

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

export type Cantrip = {
  id: string;
  name: string;
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

export type Action = {
  id: string;
  name: string;
};

export interface CharacterInterface {
  TemporaryHitPoints: number;
  MainStats: {
    ArmorClass: number;
    HitPoints: number;
    Level: number;
    Initiative: number;
    Speed: number;
    PassivePercepion: number;
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
    Invesigation: number;
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
  Cantrips: Cantrip[];
  Spells: Spell[];
  Actions: Action[];
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
}
