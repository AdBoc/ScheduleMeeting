import { useState } from 'react';
import { SelectedDays, LooseObject, DateProps } from '../ts/interfaces';

export const useCalendar = (today: Date) => {
  const [currentDay] = useState(today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate(); // const currentLocalDate = '' // const firstDayOfMonthDate =
  const firstDayOfMonth = new Date(currentMonth + "/1/" + currentYear).getDay(); //ktora pozycja w gridzie moge dorenderowac puste elementy forem 
  const daysOfMonth: string[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysOfMonth.push(i.toString());
  }

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const parseWithColor = (selectedDays: SelectedDays, selectedColor: string) => {
    return selectedDays.filter(item => item.color === selectedColor).reduce((obj: LooseObject, item) => {
      obj[item.day] = item.color;
      return obj;
    }, {})
  };

  const parseNoColor = (selectedDays: SelectedDays) => {
    return selectedDays.reduce((obj: LooseObject, item) => {
      if (obj[item.day]) {
        obj[item.day].push(item.color);
      } else {
        obj[item.day] = [item.color];
      }
      return obj;
    }, {})
  };

  const dateProps: DateProps = {
    currentDay,
    currentMonth,
    currentYear,
    firstDayOfMonth,
    daysOfMonth
  };

  return {
    dateProps,
    nextMonth,
    prevMonth,
    parseNoColor,
    parseWithColor
  };
}
