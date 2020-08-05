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
    TemporaryHitPoints: number;
    MainStats: {
        ArmorClass: number;
        HitPoints: number;
        Level: number;
        Initiative: number;
        Inspiration: number;
        Speed: number;
        PassivePercepion: number;
        ProficiencyBonus: number;
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
        SleightOfHand: number;
        Stealth: number;
        History: number;
        Invesigation: number;
        Nature: number;
        Religion: number;
        Medicine: number;
        Survival: number;
        Perception: number;
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