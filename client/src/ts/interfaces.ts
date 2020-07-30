export interface CalendarProps {
    selectedColor: string | null;
}

export interface SelectedDay {
    day: string;
    color: string;
}

export interface SelectedDays extends Array<SelectedDay> { }

export interface LooseObject {
    [key: string]: any
}

export interface FilteredByColor {
    day?: string;
}

export interface FilteredAllColors {
    day?: string[]
}

export interface DateProps {
    currentDay: number;
    currentMonth: number;
    currentYear: number;
    firstDayOfMonth: number;
    daysOfMonth: string[];
}