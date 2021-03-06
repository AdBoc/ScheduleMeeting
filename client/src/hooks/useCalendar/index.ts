import {useEffect, useRef, useState} from 'react';
import {FilteredAllNames, FilteredByName, SelectedDays, SelectedDaysState} from "../../types";
import api from "../../utils/api";

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
  const isMounted = useRef(false);
  const [userDate, setUserDate] = useState({
    selectedDay: currentTime.getDate(),
    selectedMonth: currentTime.getMonth(),
    selectedYear: currentTime.getFullYear()
  });
  const [selectedApiDays, setSelectedApiDays] = useState<SelectedDaysState>({days: [], isFetching: false});

  useEffect(() => {
    isMounted.current = true;
    return () => void (isMounted.current = false);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    setSelectedApiDays(prev => ({...prev, isFetching: true}));

    api.getSelectedMonthData(userDate.selectedMonth, userDate.selectedYear, abortController)
      .then(response => isMounted.current && setSelectedApiDays({days: response.daysData, isFetching: false}));

    return () => {
      abortController.abort();
    }
  }, [userDate]);

  const filteredDays = user ? filterDayByUser(selectedApiDays.days, user) : filterDaysByAmount(selectedApiDays.days);

  const daysInMonth = 32 - new Date(userDate.selectedYear, userDate.selectedMonth, 32).getDate();
  const firstMonthDay = new Date(userDate.selectedMonth + 1 + "/1/" + userDate.selectedYear).getDay();

  const daysOfMonth: number[] = [];
  const emptyDaysCount = firstMonthDay ? firstMonthDay - 1 : 6;

  for (let i = 1; i <= daysInMonth; i++) {
    daysOfMonth.push(i);
  }

  const handleSelectAll = async () => {
    if (!user) return;
    await api.selectAllDays(userDate.selectedMonth, userDate.selectedYear, user);
    setUserDate(prev => ({...prev}));
  };

  const handleUnselectAll = async () => {
    if (!user) return;
    await api.unselectAllDays(userDate.selectedMonth, userDate.selectedYear, user);
    setUserDate(prev => ({...prev}));
  };

  const handleSelectDay = ({target}: any) => {
    if (!user) return;
    const {value, className} = target;
    let newDays = [...selectedApiDays.days];
    if (className.includes("selected")) {
      newDays = newDays.filter(date => (date.user !== user || (date.day !== +value && date.user === user)));
    } else {
      newDays.push({day: +value, user: user});
    }
    setSelectedApiDays(prev => ({...prev, days: newDays}));
    api.selectDay(userDate.selectedMonth, userDate.selectedYear, parseInt(target.value), user);
  };

  const isCurrentDay = (day: number): boolean => currentTime.getDate() === day && currentTime.getMonth() === userDate.selectedMonth && currentTime.getFullYear() === userDate.selectedYear;
  const nextMonth = () => {
    if (userDate.selectedMonth === 11) return setUserDate(prev => ({...prev, selectedMonth: 0, selectedYear: prev.selectedYear + 1}));
    setUserDate(prev => ({...prev, selectedMonth: prev.selectedMonth + 1}));
  };
  const prevMonth = () => {
    if (userDate.selectedMonth) return setUserDate(prev => ({...prev, selectedMonth: prev.selectedMonth - 1}));
    setUserDate(prev => ({...prev, selectedMonth: 11, selectedYear: prev.selectedYear - 1}));
  };

  const selectedMonth = {
    prevMonth,
    userDate,
    nextMonth
  }

  const monthData = {
    daysOfMonth,
    filteredDays,
    emptyDaysCount,
    isFetching: selectedApiDays.isFetching,
    isCurrentDay,
    handleSelectAll,
    handleSelectDay,
    handleUnselectAll,
  }

  return {
    selectedMonth,
    monthData
  };
}

export default useCalendar;