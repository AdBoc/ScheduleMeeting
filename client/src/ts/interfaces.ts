export interface CalendarProps {
    selectedPlayer: string | null;
}

export interface SelectedDay {
    day: string;
    name: string;
}

export interface SelectedDays extends Array<SelectedDay> { }

export interface FilteredByName {
    [day: string]: string
}

export interface FilteredAllNames {
    [day: string]: string[]
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
    | "attacks"
    | "equipment"
    | "story"
    | "quickAccess";

export type Attack = {
    id: string;
    name: string;
    diceType: string;
    hitDc: string;
    range: string;
    type: string;
};

export type BackpackObj = {
    id: string;
    name: string;
    description: string;
}

export interface CharacterInterface {
    TemporaryHitPoints: number;
    MainStats: {
        ArmorClass: number;
        HitPoints: number;
        Level: number;
        Initiative: number;
        Inspiration: number;
        Speed: number;
        PassivePercepion: number;
    },
    Stats: {
        Charisma: number;
        Constitution: number;
        Dexterity: number;
        Intelligence: number;
        Strength: number;
        Wisdom: number;
    },
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
    },
    Attacks: Attack[] | never;
    Equipment: BackpackObj[] | never;
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
    }
    Other: {
        TaggedThrows: [string | null, string | null];
    }
}