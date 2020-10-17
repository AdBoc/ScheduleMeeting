import React, {useContext} from 'react';

import useCalendar from "../../../hooks/useCalendar";
import {userContext} from "../../../context/users";

import MonthLabel from "./MonthLabel";
import SelectedMonth from "./SelectedMonth";

import './calendar.scss';

const Calendar = () => {
  const {user} = useContext(userContext);
  const {monthData, selectedMonth} = useCalendar(user);

  return (
    <>
      <MonthLabel selectedMonth={selectedMonth}/>
      <SelectedMonth monthData={monthData}/>
    </>
  );
}

export default Calendar;