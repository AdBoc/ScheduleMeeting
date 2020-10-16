import React, {useContext, useEffect, useState} from 'react';

import useCalendar from "../../../hooks/useCalendar";
import {userContext} from "../../../context/users";
import {toast} from 'react-toastify'

import {SelectedDays} from "../../../types";
import {getSelectedMonthData, selectAllDays, selectDay, unselectAllDays} from "../../../utils/api";

import './calendar.scss';

const monthsInYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];

const Calendar = () => {
  const {user} = useContext(userContext);
  const {userDate, daysOfMonth, isCurrentDay, nextMonth, prevMonth, filterDayByUser, filterDaysByAmount} = useCalendar();
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
    const {value, className} = target;
    if (!user) return;
    let newDays = [...daysFromApi]
    if (className.includes("selected")) {
      newDays = newDays.filter(date => (date.user !== user || (date.day !== +value && date.user === user)))
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

  return (
    <>
      <div>
        <button onClick={prevMonth}>{"<"}</button>
        <h2>{monthsInYear[userDate.selectedMonth]}</h2>
        <h2>{userDate.selectedYear}</h2>
        <button onClick={nextMonth}>{">"}</button>
      </div>
      <div>
        <div>
          {daysOfWeek.map(day => <p key={day}>{day}</p>)}
        </div>
        <div>
          {user ?
            <>
              {daysOfMonth.map(day =>
                <button
                  key={day}
                  className={`day${(filteredDays[day] && " selected") || ""}`}
                  value={day}
                  onClick={handleSelectDay}>
                  {day}
                </button>)}
            </>
            :
            <>
              {daysOfMonth.map(day =>
                <button
                  key={day}
                  className={`day${(filteredDays[day] && " count" + filteredDays[day].length) || ""}${(isCurrentDay(day) && " today") || ""}`}
                  value={day}
                  onClick={handleSelectDay}>
                  {day}
                </button>)}
            </>
          }
        </div>
        <div>
          <button onClick={handleSelectAll}>Select All</button>
          <button onClick={handleUnselectAll}>Unselect</button>
        </div>
      </div>
    </>
  );
}

export default Calendar;