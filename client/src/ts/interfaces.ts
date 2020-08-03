export interface CalendarProps {
    selectedName: string | null;
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

type attack = {
    name: string;
    diceType: string;
    actionCost: number;
};

type backpackObj = {
    name: string;
    description: string;
}

export interface CharacterInterface {
    PlayerName: string;
    Level: number;
    HitPoints: number;
    MainStats: {
        ArmorClass: number;
        Initiative: number;
        Speed: number;
        PassivePercepion: number;
        ProficiencyBonus: number;
        Inspiration: number;
    },
    Stats: {
        Strength: number;
        Dexterity: number;
        Constitution: number;
        Intelligence: number;
        Wisdom: number;
        Charisma: number;
    },
    Skills: {
        Athletics: number;
        Acrobatics: number;
        SleightOfHand: number;
        Stealth: number;
        Arcana: number;
        History: number;
        Invesigation: number;
        Nature: number;
        Religion: number;
        AnimalHandling: number;
        Insight: number;
        Medicine: number;
        Perception: number;
        Survival: number;
        Deception: number;
        Initimidation: number;
        Performance: number;
        Persuasion: number;
    },
    Attacks?: attack[];
    Equipment?: backpackObj[];
    Story: {
        Class: string;
        Background: string;
        ExperiencePoints: string;
        Alignment: string;
        ProficienciesAndLanguage: string;
        FeaturesAndTraits: string;
        Story: string;
    }
}