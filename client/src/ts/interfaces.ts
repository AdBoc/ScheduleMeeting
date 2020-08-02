export interface CalendarProps {
    selectedName: string | null;
}

export interface SelectedDay {
    day: string;
    name: string;
}

export interface SelectedDays extends Array<SelectedDay> { }

// export interface LooseObject {
//     [key: string]: any
// }

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