export interface UserDate {
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
}

export interface MonthData {
  daysOfMonth: number[];
  filteredDays: FilteredByName | FilteredAllNames;
  handleSelectDay: ({ target }: any) => void;
  isCurrentDay: (day: number) => boolean;
  handleSelectAll: () => void;
  handleUnselectAll: () => void;
}

export interface SelectedDay {
  day: number;
  user: string;
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
