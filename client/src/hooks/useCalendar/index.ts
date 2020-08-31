import { useState } from "react";
import { SelectedDays, DateProps, FilteredByName, FilteredAllNames } from "../../ts/interfaces";

export const useCalendar = () => {
  const today = new Date();
  const [currentDay] = useState(today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
  const firstDayOfMonth = new Date(currentMonth + 1 + "/1/" + currentYear).getDay();

  const daysOfMonth: string[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysOfMonth.push(i.toString());
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const parseUser = (selectedDays: SelectedDays, selectedName: string) => {
    return selectedDays
      .filter((item) => item.name === selectedName)
      .reduce((obj: FilteredByName, item) => {
        obj[item.day] = item.name;
        return obj;
      }, {});
  };

  const parseNoUser = (selectedDays: SelectedDays) => {
    return selectedDays.reduce((obj: FilteredAllNames, item) => {
      if (obj[item.day]) {
        obj[item.day].push(item.name);
      } else {
        obj[item.day] = [item.name];
      }
      return obj;
    }, {});
  };

  const dateProps: DateProps = {
    currentDay,
    currentMonth,
    currentYear,
    firstDayOfMonth,
    daysOfMonth,
  };

  return {
    dateProps,
    nextMonth,
    prevMonth,
    parseNoUser,
    parseUser,
  };
};
