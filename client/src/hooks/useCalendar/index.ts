import {useEffect, useState} from 'react';
import {FilteredAllNames, FilteredByName, SelectedDays} from "../../types";
import {getSelectedMonthData, selectAllDays, selectDay, unselectAllDays} from "../../utils/api";
import {toast} from "react-toastify";

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const useCalendar = (user: string | null) => {
  const currentTime = new Date();
  const [userDate, setUserDate] = useState({
    selectedDay: currentTime.getDate(),
    selectedMonth: currentTime.getMonth(),
    selectedYear: currentTime.getFullYear()
  });
  const [daysFromApi, setDaysFromApi] = useState<SelectedDays>([]);
  const filteredDays = user ? filterDayByUser(daysFromApi, user) : filterDaysByAmount(daysFromApi);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchMonth = async () => {
      const {daysData, error} = await getSelectedMonthData(userDate.selectedMonth, userDate.selectedYear, abortController);
      if (daysData) setDaysFromApi(daysData);
      if (error) toast.error("Connection error");
    }

    fetchMonth();

    return () => abortController.abort();
  }, [userDate.selectedMonth, userDate.selectedYear]);

  const daysInMonth = 32 - new Date(userDate.selectedYear, userDate.selectedMonth, 32).getDate();
  // const firstMonthDay = new Date(userDate.selectedMonth + 1 + "/1/" + userDate.selectedYear).getDay();

  const isCurrentDay = (day: number): boolean => currentTime.getDate() === day && currentTime.getMonth() === userDate.selectedMonth && currentTime.getFullYear() === userDate.selectedYear;
  const nextMonth = () => {
    if (userDate.selectedMonth === 11) return setUserDate(prev => ({...prev, selectedMonth: 0, selectedYear: prev.selectedYear + 1}));
    setUserDate(prev => ({...prev, selectedMonth: prev.selectedMonth + 1}));
  };
  const prevMonth = () => {
    if (userDate.selectedMonth) return setUserDate(prev => ({...prev, selectedMonth: prev.selectedMonth - 1}));
    setUserDate(prev => ({...prev, selectedMonth: 11, selectedYear: prev.selectedYear - 1}));
  };

  const daysOfMonth: number[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysOfMonth.push(i);
  }

  const handleSelectAll = async () => {
    if (!user) return;
    const status = await selectAllDays(userDate.selectedMonth, userDate.selectedYear, user);
    if (status === "error") toast.error("Connection error");
    if (status !== 200) toast.error("Out of bounds");
  };

  const handleUnselectAll = async () => {
    if (!user) return;
    const status = await unselectAllDays(userDate.selectedMonth, userDate.selectedYear, user);
    if (status === "error") toast.error("Connection error");
    if (status !== 200) toast.error("Out of bounds");
  };

  const handleSelectDay = async ({target}: any) => {
    if (!user) return;
    const {value, className} = target;
    let newDays = [...daysFromApi];
    if (className.includes("selected")) {
      newDays = newDays.filter(date => (date.user !== user || (date.day !== +value && date.user === user)));
    } else {
      newDays.push({day: +value, user: user});
    }
    setDaysFromApi(newDays);

    const response = await selectDay(userDate.selectedMonth, userDate.selectedYear, parseInt(target.value), user);
    if (response === 403)
      toast.error("Month out of bounds");
    else if (response !== 200)
      toast.error("Connection error");
  };

  return {
    daysOfMonth,
    filteredDays,
    userDate,
    isCurrentDay,
    handleSelectAll,
    handleSelectDay,
    handleUnselectAll,
    nextMonth,
    prevMonth
  };
}

export default useCalendar;