import {useState} from 'react';
import {FilteredAllNames, FilteredByName, SelectedDays} from "../../types";

const useCalendar = () => {
  const currentTime = new Date();
  const [userDate, setUserDate] = useState({
    selectedDay: currentTime.getDate(),
    selectedMonth: currentTime.getMonth(),
    selectedYear: currentTime.getFullYear()
  });

  const daysInMonth = 32 - new Date(userDate.selectedYear, userDate.selectedMonth, 32).getDate();
  const firstMonthDay = new Date(userDate.selectedMonth + 1 + "/1/" + userDate.selectedYear).getDay();

  const isCurrentDay = (day: number): boolean => currentTime.getDate() === day && currentTime.getMonth() === userDate.selectedMonth && currentTime.getFullYear() === userDate.selectedYear;
  const nextMonth = () => {
    if (userDate.selectedMonth === 11) return setUserDate(prev => ({...prev, selectedMonth: 0, selectedYear: prev.selectedYear + 1}));
    setUserDate(prev => ({...prev, selectedMonth: prev.selectedMonth + 1}));
  };
  const prevMonth = () => {
    if (userDate.selectedMonth) return setUserDate(prev => ({...prev, selectedMonth: prev.selectedMonth - 1}));
    setUserDate(prev => ({...prev, selectedMonth: 11, selectedYear: prev.selectedYear - 1}));
  };

  const filterDaysByAmount = (selectedDays: SelectedDays) => {
    return selectedDays.reduce((obj: FilteredAllNames, item) => {
      if (obj[item.day]) {
        obj[item.day].push(item.user);
      } else {
        obj[item.day] = [item.user];
      }
      return obj;
    }, {});
  };

  const filterDayByUser = (selectedDays: SelectedDays, selectedName: string) => {
    return selectedDays
      .filter((item) => item.user === selectedName)
      .reduce((obj: FilteredByName, item) => {
        obj[item.day] = item.user;
        return obj;
      }, {});
  };

  const daysOfMonth: number[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysOfMonth.push(i);
  }

  return {
    userDate,
    daysInMonth,
    firstMonthDay,
    daysOfMonth,
    isCurrentDay,
    filterDayByUser,
    filterDaysByAmount,
    nextMonth,
    prevMonth
  };
}

export default useCalendar;