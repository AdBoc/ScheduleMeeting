export interface CalendarProps {
    selectedColor: string | null;
}

export interface SelectedDay {
    day: string;
    color: string;
}

export interface SelectedDays extends Array<SelectedDay> { }

// interface LooseObject {
//   [key: string]: any
// }